import type { Env } from "./types";
import { decrypt } from "./crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

export type GoogleTokens = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  id_token?: string;
};

export async function exchangeCode(env: Env, code: string): Promise<GoogleTokens> {
  const body = new URLSearchParams({
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: env.OAUTH_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) throw new Error(`token exchange failed: ${r.status} ${await r.text()}`);
  return r.json();
}

export async function refreshAccessToken(env: Env, refreshToken: string): Promise<string> {
  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) throw new Error(`refresh failed: ${r.status} ${await r.text()}`);
  const j = (await r.json()) as GoogleTokens;
  return j.access_token;
}

export async function accessTokenForUser(env: Env, refreshTokenEnc: string): Promise<string> {
  const rt = await decrypt(refreshTokenEnc, env.ENCRYPTION_KEY);
  return refreshAccessToken(env, rt);
}

export function decodeIdToken(idToken: string): { sub: string; email: string } {
  const [, payload] = idToken.split(".");
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  const p = JSON.parse(json) as { sub: string; email: string };
  return { sub: p.sub, email: p.email };
}

// ---------- Sheets API ----------

export async function getSheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string
): Promise<string[][]> {
  const url = `${SHEETS_BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}`;
  const r = await fetch(url, { headers: { authorization: `Bearer ${accessToken}` } });
  if (!r.ok) throw new Error(`sheets get failed: ${r.status} ${await r.text()}`);
  const j = (await r.json()) as { values?: string[][] };
  return j.values ?? [];
}

export async function appendSheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<void> {
  const url = `${SHEETS_BASE}/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const r = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
    body: JSON.stringify({ values }),
  });
  if (!r.ok) throw new Error(`sheets append failed: ${r.status} ${await r.text()}`);
}

export async function updateSheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<void> {
  const url = `${SHEETS_BASE}/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}?valueInputOption=USER_ENTERED`;
  const r = await fetch(url, {
    method: "PUT",
    headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
    body: JSON.stringify({ values }),
  });
  if (!r.ok) throw new Error(`sheets update failed: ${r.status} ${await r.text()}`);
}

export async function getSheetMeta(
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheets: { title: string; sheetId: number }[] }> {
  const url = `${SHEETS_BASE}/${spreadsheetId}?fields=properties.title,sheets.properties(sheetId,title)`;
  const r = await fetch(url, { headers: { authorization: `Bearer ${accessToken}` } });
  if (!r.ok) throw new Error(`sheets meta failed: ${r.status} ${await r.text()}`);
  const j = (await r.json()) as {
    properties: { title: string };
    sheets: { properties: { sheetId: number; title: string } }[];
  };
  return {
    title: j.properties.title,
    sheets: j.sheets.map((s) => ({ title: s.properties.title, sheetId: s.properties.sheetId })),
  };
}

export async function deleteSheetRow(
  accessToken: string,
  spreadsheetId: string,
  sheetId: number,
  rowIndex: number // 0-based, where 0 is the header
): Promise<void> {
  const url = `${SHEETS_BASE}/${spreadsheetId}:batchUpdate`;
  const body = {
    requests: [
      {
        deleteDimension: {
          range: {
            sheetId,
            dimension: "ROWS",
            startIndex: rowIndex,
            endIndex: rowIndex + 1,
          },
        },
      },
    ],
  };
  const r = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`sheets delete failed: ${r.status} ${await r.text()}`);
}
