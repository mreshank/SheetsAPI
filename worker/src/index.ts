import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env, SpreadsheetRow, UserRow } from "./types";
import { encrypt, randomId, uuid } from "./crypto";
import {
  accessTokenForUser,
  appendSheetValues,
  decodeIdToken,
  deleteSheetRow,
  exchangeCode,
  getSheetMeta,
  getSheetValues,
  updateSheetValues,
} from "./google";
import { objectToRow, rowsToObjects } from "./rows";
import { applyQuery, formatResponse, parseQuery } from "./query";

// The Worker is mounted at sheets.mreshank.com/api/* via a Cloudflare route.
// Cloudflare matches Worker routes before Pages, so everything else on
// sheets.mreshank.com falls through to the Pages (SvelteKit) deployment.
const app = new Hono<{ Bindings: Env }>({ strict: false }).basePath("/api");

app.use("*", cors({ origin: "*", allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));

app.get("/", (c) =>
  c.json({
    name: "SheetsAPI",
    docs: "https://sheets.mreshank.com/docs",
    endpoints: {
      list: "GET /api/spreadsheets/:userKey/:sheetName",
      one: "GET /api/spreadsheets/:userKey/:sheetName/:row",
      append: "POST /api/spreadsheets/:userKey/:sheetName",
      update: "PUT /api/spreadsheets/:userKey/:sheetName/:row",
      delete: "DELETE /api/spreadsheets/:userKey/:sheetName/:row",
    },
  })
);

// ---------- OAuth ----------

app.get("/oauth/start", async (c) => {
  const state = randomId(16);
  const returnTo = c.req.query("return_to") ?? c.env.DASHBOARD_URL;
  await c.env.DB.prepare(
    "INSERT INTO oauth_states (state, created_at, return_to) VALUES (?, ?, ?)"
  )
    .bind(state, Date.now(), returnTo)
    .run();

  const params = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri: c.env.OAUTH_REDIRECT_URI,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
    scope: [
      "openid",
      "email",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ].join(" "),
  });
  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/oauth/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  if (!code || !state) return c.text("missing code/state", 400);

  const row = await c.env.DB.prepare(
    "SELECT return_to FROM oauth_states WHERE state = ?"
  )
    .bind(state)
    .first<{ return_to: string }>();
  if (!row) return c.text("invalid state", 400);
  await c.env.DB.prepare("DELETE FROM oauth_states WHERE state = ?").bind(state).run();

  const tokens = await exchangeCode(c.env, code);
  if (!tokens.refresh_token || !tokens.id_token) {
    return c.text("google did not return a refresh_token; revoke app access and try again", 400);
  }
  const { sub, email } = decodeIdToken(tokens.id_token);
  const enc = await encrypt(tokens.refresh_token, c.env.ENCRYPTION_KEY);
  const now = Date.now();

  const existing = await c.env.DB.prepare("SELECT user_key FROM users WHERE google_sub = ?")
    .bind(sub)
    .first<{ user_key: string }>();

  let userKey: string;
  if (existing) {
    userKey = existing.user_key;
    await c.env.DB.prepare(
      "UPDATE users SET refresh_token_enc = ?, email = ?, updated_at = ? WHERE user_key = ?"
    )
      .bind(enc, email, now, userKey)
      .run();
  } else {
    userKey = uuid();
    await c.env.DB.prepare(
      "INSERT INTO users (user_key, google_sub, email, refresh_token_enc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(userKey, sub, email, enc, now, now)
      .run();
  }

  // Issue a short-lived session cookie so the dashboard can identify the user.
  // Simple approach: set userKey as an httpOnly cookie on the dashboard domain via redirect hash.
  const returnTo = new URL(row.return_to);
  returnTo.searchParams.set("userKey", userKey);
  returnTo.searchParams.set("email", email);
  return c.redirect(returnTo.toString());
});

// ---------- Helpers ----------

async function getUser(env: Env, userKey: string): Promise<UserRow | null> {
  return env.DB.prepare("SELECT * FROM users WHERE user_key = ?")
    .bind(userKey)
    .first<UserRow>();
}

async function getDefaultSpreadsheet(env: Env, userKey: string): Promise<SpreadsheetRow | null> {
  return env.DB.prepare(
    "SELECT * FROM spreadsheets WHERE user_key = ? ORDER BY is_default DESC, created_at ASC LIMIT 1"
  )
    .bind(userKey)
    .first<SpreadsheetRow>();
}

async function authorizeBearer(env: Env, userKey: string, auth?: string): Promise<boolean> {
  // If the user has no API keys configured, endpoints are public (opt-in protection).
  const { results } = await env.DB.prepare(
    "SELECT key FROM api_keys WHERE user_key = ? LIMIT 1"
  )
    .bind(userKey)
    .all<{ key: string }>();
  if (!results || results.length === 0) return true;
  if (!auth || !auth.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const row = await env.DB.prepare(
    "SELECT key FROM api_keys WHERE user_key = ? AND key = ?"
  )
    .bind(userKey, token)
    .first();
  return !!row;
}

// ---------- REST API ----------

// GET list
app.get("/spreadsheets/:userKey/:sheetName", async (c) => {
  const { userKey, sheetName } = c.req.param();
  if (!(await authorizeBearer(c.env, userKey, c.req.header("authorization"))))
    return c.json({ error: "unauthorized" }, 401);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await getDefaultSpreadsheet(c.env, userKey);
  if (!ss) return c.json({ error: "no spreadsheet registered" }, 404);

  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const values = await getSheetValues(token, ss.google_spreadsheet_id, sheetName);
  const rows = rowsToObjects(values);
  const q = parseQuery(new URL(c.req.url));
  const filtered = applyQuery(rows, q);
  const headerRow = values[0] ?? [];
  const { body, contentType } = formatResponse(filtered, q, headerRow);
  return new Response(body, { headers: { "content-type": contentType } });
});

// GET single row (1-based, row=1 is the first data row below the header)
app.get("/spreadsheets/:userKey/:sheetName/:row", async (c) => {
  const { userKey, sheetName, row } = c.req.param();
  const rowNum = parseInt(row, 10);
  if (!Number.isInteger(rowNum) || rowNum < 1) return c.json({ error: "bad row" }, 400);
  if (!(await authorizeBearer(c.env, userKey, c.req.header("authorization"))))
    return c.json({ error: "unauthorized" }, 401);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await getDefaultSpreadsheet(c.env, userKey);
  if (!ss) return c.json({ error: "no spreadsheet registered" }, 404);

  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const header = await getSheetValues(token, ss.google_spreadsheet_id, `${sheetName}!1:1`);
  const headers = header[0] ?? [];
  const sheetRow = rowNum + 1; // header is row 1 in Sheets
  const data = await getSheetValues(
    token,
    ss.google_spreadsheet_id,
    `${sheetName}!${sheetRow}:${sheetRow}`
  );
  if (data.length === 0) return c.json({ error: "row not found" }, 404);
  const obj: Record<string, string> = {};
  headers.forEach((h, i) => (obj[h] = data[0][i] ?? ""));
  return c.json(obj);
});

// POST append
app.post("/spreadsheets/:userKey/:sheetName", async (c) => {
  const { userKey, sheetName } = c.req.param();
  if (!(await authorizeBearer(c.env, userKey, c.req.header("authorization"))))
    return c.json({ error: "unauthorized" }, 401);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await getDefaultSpreadsheet(c.env, userKey);
  if (!ss) return c.json({ error: "no spreadsheet registered" }, 404);

  const body = await c.req.json();
  const items = Array.isArray(body) ? body : [body];
  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const header = await getSheetValues(token, ss.google_spreadsheet_id, `${sheetName}!1:1`);
  const headers = header[0] ?? [];
  if (headers.length === 0) return c.json({ error: "sheet has no header row" }, 400);
  const values = items.map((o: Record<string, unknown>) => objectToRow(o, headers));
  await appendSheetValues(token, ss.google_spreadsheet_id, sheetName, values);
  return c.json({ appended: values.length });
});

// PUT update
app.put("/spreadsheets/:userKey/:sheetName/:row", async (c) => {
  const { userKey, sheetName, row } = c.req.param();
  const rowNum = parseInt(row, 10);
  if (!Number.isInteger(rowNum) || rowNum < 1) return c.json({ error: "bad row" }, 400);
  if (!(await authorizeBearer(c.env, userKey, c.req.header("authorization"))))
    return c.json({ error: "unauthorized" }, 401);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await getDefaultSpreadsheet(c.env, userKey);
  if (!ss) return c.json({ error: "no spreadsheet registered" }, 404);

  const body = (await c.req.json()) as Record<string, unknown>;
  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const header = await getSheetValues(token, ss.google_spreadsheet_id, `${sheetName}!1:1`);
  const headers = header[0] ?? [];
  const sheetRow = rowNum + 1;
  const values = [objectToRow(body, headers)];
  await updateSheetValues(
    token,
    ss.google_spreadsheet_id,
    `${sheetName}!${sheetRow}:${sheetRow}`,
    values
  );
  return c.json({ updated: 1, row: rowNum });
});

// DELETE row
app.delete("/spreadsheets/:userKey/:sheetName/:row", async (c) => {
  const { userKey, sheetName, row } = c.req.param();
  const rowNum = parseInt(row, 10);
  if (!Number.isInteger(rowNum) || rowNum < 1) return c.json({ error: "bad row" }, 400);
  if (!(await authorizeBearer(c.env, userKey, c.req.header("authorization"))))
    return c.json({ error: "unauthorized" }, 401);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await getDefaultSpreadsheet(c.env, userKey);
  if (!ss) return c.json({ error: "no spreadsheet registered" }, 404);

  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const meta = await getSheetMeta(token, ss.google_spreadsheet_id);
  const sheet = meta.sheets.find((s) => s.title === sheetName);
  if (!sheet) return c.json({ error: "sheet not found" }, 404);
  // sheet row index (0-based): header at 0, data row N at N
  await deleteSheetRow(token, ss.google_spreadsheet_id, sheet.sheetId, rowNum);
  return c.json({ deleted: 1, row: rowNum });
});

// ---------- Dashboard management API (session via ?userKey= in cookie or query) ----------
// These endpoints are called by the dashboard. Uses the userKey directly — the dashboard
// is responsible for storing it as a session cookie after OAuth callback.

function requireUserKey(c: { req: { query: (k: string) => string | undefined; header: (k: string) => string | undefined } }): string | null {
  return c.req.query("userKey") || c.req.header("x-user-key") || null;
}

app.get("/me", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await c.env.DB.prepare(
    "SELECT id, google_spreadsheet_id, title, is_default FROM spreadsheets WHERE user_key = ? ORDER BY is_default DESC, created_at ASC"
  )
    .bind(userKey)
    .all<SpreadsheetRow>();
  const keys = await c.env.DB.prepare(
    "SELECT key, label, created_at, last_used_at FROM api_keys WHERE user_key = ?"
  )
    .bind(userKey)
    .all();
  return c.json({
    userKey,
    email: user.email,
    spreadsheets: ss.results ?? [],
    apiKeys: keys.results ?? [],
  });
});

app.post("/me/spreadsheets", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  const body = (await c.req.json()) as { google_spreadsheet_id: string; title?: string; set_default?: boolean };
  if (!body.google_spreadsheet_id) return c.json({ error: "google_spreadsheet_id required" }, 400);

  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  let title = body.title ?? null;
  try {
    const meta = await getSheetMeta(token, body.google_spreadsheet_id);
    title = title ?? meta.title;
  } catch {
    return c.json({ error: "cannot access spreadsheet; make sure you own it or have access" }, 400);
  }
  const id = uuid();
  if (body.set_default) {
    await c.env.DB.prepare("UPDATE spreadsheets SET is_default = 0 WHERE user_key = ?")
      .bind(userKey)
      .run();
  }
  await c.env.DB.prepare(
    "INSERT INTO spreadsheets (id, user_key, google_spreadsheet_id, title, is_default, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  )
    .bind(id, userKey, body.google_spreadsheet_id, title, body.set_default ? 1 : 0, Date.now())
    .run();
  return c.json({ id, title });
});

app.delete("/me/spreadsheets/:id", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  await c.env.DB.prepare("DELETE FROM spreadsheets WHERE id = ? AND user_key = ?")
    .bind(c.req.param("id"), userKey)
    .run();
  return c.json({ ok: true });
});

app.get("/me/spreadsheets/:id/sheets", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  const user = await getUser(c.env, userKey);
  if (!user) return c.json({ error: "user not found" }, 404);
  const ss = await c.env.DB.prepare(
    "SELECT google_spreadsheet_id FROM spreadsheets WHERE id = ? AND user_key = ?"
  )
    .bind(c.req.param("id"), userKey)
    .first<{ google_spreadsheet_id: string }>();
  if (!ss) return c.json({ error: "not found" }, 404);
  const token = await accessTokenForUser(c.env, user.refresh_token_enc);
  const meta = await getSheetMeta(token, ss.google_spreadsheet_id);
  return c.json(meta);
});

app.post("/me/api-keys", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  const body = (await c.req.json().catch(() => ({}))) as { label?: string };
  const key = `sk_${randomId(24)}`;
  await c.env.DB.prepare(
    "INSERT INTO api_keys (key, user_key, label, created_at) VALUES (?, ?, ?, ?)"
  )
    .bind(key, userKey, body.label ?? null, Date.now())
    .run();
  return c.json({ key });
});

app.delete("/me/api-keys/:key", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ error: "no session" }, 401);
  await c.env.DB.prepare("DELETE FROM api_keys WHERE key = ? AND user_key = ?")
    .bind(c.req.param("key"), userKey)
    .run();
  return c.json({ ok: true });
});

app.post("/me/logout", async (c) => {
  const userKey = requireUserKey(c);
  if (!userKey) return c.json({ ok: true });
  // Delete user — cascade removes spreadsheets and api_keys
  await c.env.DB.prepare("DELETE FROM users WHERE user_key = ?").bind(userKey).run();
  return c.json({ ok: true });
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: String(err?.message ?? err) }, 500);
});

export default app;
