# 08 — Worker Internals

Source: [`worker/`](../worker/)

## File layout

```
worker/
├── src/
│   ├── index.ts      Hono app, route handlers
│   ├── google.ts     OAuth + Sheets API v4 client
│   ├── crypto.ts     AES-GCM encrypt/decrypt, random IDs
│   ├── rows.ts       2D array ↔ JSON-object conversion
│   └── types.ts      Env + DB row shapes
├── schema.sql        D1 schema
├── wrangler.toml     CF config + vars
├── tsconfig.json
└── package.json
```

## Request lifecycle

```
Request
  ↓
Hono router
  ↓
cors() middleware  (Access-Control-Allow-Origin: *)
  ↓
Route handler
  ├─ /api/*             authorizeBearer(userKey, auth?) → 401 if required & missing
  ├─ /me/*              requireUserKey(c) → 401 if missing
  ├─ /oauth/*           state validation
  └─ /                  { name, docs, endpoints }
  ↓
D1 query (prepared statement)
  ↓ [optional]
Google API call
  ├─ accessTokenForUser → decrypt(refresh_token) → POST oauth2.googleapis.com/token
  └─ GET/POST/PUT to sheets.googleapis.com/v4/...
  ↓
rowsToObjects / objectToRow
  ↓
c.json(...)
```

## Error handling

A single `app.onError` at the bottom:

```ts
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: String(err?.message ?? err) }, 500);
});
```

- Google API failures throw with the response body in the message (truncated server-side, not logged beyond console).
- D1 failures bubble as-is.
- Unauthorized paths return `401` directly, not via onError.

**Never logged**: request bodies, refresh tokens, access tokens, OAuth codes.

## Route reference

Grouped by prefix:

### Public
- `GET /` — index JSON (discovery)

### OAuth
- `GET /oauth/start`
- `GET /oauth/callback`

### CRUD API
- `GET    /api/spreadsheets/:userKey/:sheetName`
- `GET    /api/spreadsheets/:userKey/:sheetName/:row`
- `POST   /api/spreadsheets/:userKey/:sheetName`
- `PUT    /api/spreadsheets/:userKey/:sheetName/:row`
- `DELETE /api/spreadsheets/:userKey/:sheetName/:row`

### Dashboard control plane (requires `x-user-key` header or `?userKey=` query)
- `GET    /me`
- `POST   /me/spreadsheets`
- `DELETE /me/spreadsheets/:id`
- `GET    /me/spreadsheets/:id/sheets`
- `POST   /me/api-keys`
- `DELETE /me/api-keys/:key`
- `POST   /me/logout`

## Helpers

### `accessTokenForUser(env, refresh_token_enc)`

```
decrypt(enc, ENCRYPTION_KEY)
  → POST oauth2.googleapis.com/token with grant_type=refresh_token
  → returns short-lived access_token (1h)
```

### `getDefaultSpreadsheet(env, userKey)`

`SELECT * FROM spreadsheets WHERE user_key=? ORDER BY is_default DESC, created_at ASC LIMIT 1`

Returns the user's default binding. If no spreadsheet is registered → 404.

### `authorizeBearer(env, userKey, authHeader?)`

Two-branch:
- No API keys in DB → `true` (public)
- ≥1 API key → require `Authorization: Bearer <key>` matching a row

## Dev loop

```bash
cd worker
npm install
wrangler d1 execute sheetsapi --file=./schema.sql --local
wrangler dev
```

Local URL: `http://127.0.0.1:8787`

OAuth won't work against localhost (Google requires a real HTTPS redirect URI). Two options:
1. Point a test hostname like `dev.sheets.mreshank.com` at the local Worker via Cloudflare Tunnel.
2. Use `wrangler dev --remote` for a cloud dev Worker.

## Testing (roadmap)

- Unit: Vitest with `@cloudflare/vitest-pool-workers`
- Integration: spin up ephemeral D1 per-test; mock Google with MSW
- Smoke: after deploy, run a curl script against prod that creates → reads → deletes a row

## Performance

- Average request: ~150ms (Google Sheets API latency dominates)
- Token refresh adds ~80ms on cold request
- D1 queries: 5–15ms
- CPU time per request: typically <10ms, within Workers free tier 50ms cap

Optimization ideas:
- Cache access tokens for their remaining lifetime in a shared KV namespace keyed by user_key
- Cache header rows for 60s per tab
- Batch multiple requests for the same spreadsheet in a single Google API call
