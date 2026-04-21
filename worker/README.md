# SheetsAPI Worker

Cloudflare Worker exposing `sheets.mreshank.com` with OAuth + CRUD endpoints.

## Setup

```bash
npm install

# Create D1 database
npx wrangler d1 create sheetsapi
# Paste the returned database_id into wrangler.toml

# Create schema
npm run db:remote        # production
npm run db:local         # local dev

# Secrets
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put ENCRYPTION_KEY        # 64 hex chars (32 random bytes)
# Generate with: openssl rand -hex 32

# Update wrangler.toml vars
#   GOOGLE_CLIENT_ID       — your OAuth client ID
#   OAUTH_REDIRECT_URI     — https://sheets.mreshank.com/api/oauth/callback
#   DASHBOARD_URL          — where to redirect after successful OAuth

# Deploy
npm run deploy
```

## Google Cloud Console

1. Create project → enable **Google Sheets API**, **Google Drive API**
2. OAuth consent screen → External → add scopes:
   - `openid`, `email`
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/drive.file`
3. Credentials → Create OAuth 2.0 Client ID → Web application
   - Authorized redirect URI: `https://sheets.mreshank.com/api/oauth/callback`
4. Copy Client ID to `wrangler.toml`, Client Secret into `wrangler secret`

Until you submit for verification, only test users you've added can authorize.

## Endpoints

### Public REST API

- `GET    /api/spreadsheets/:userKey/:sheetName` — list rows as JSON objects
- `GET    /api/spreadsheets/:userKey/:sheetName/:row` — single row (1-based)
- `POST   /api/spreadsheets/:userKey/:sheetName` — append row(s); body is object or array
- `PUT    /api/spreadsheets/:userKey/:sheetName/:row` — update row
- `DELETE /api/spreadsheets/:userKey/:sheetName/:row` — delete row

If the user has created any API keys, requests must include `Authorization: Bearer sk_...`. Otherwise endpoints are public.

### OAuth

- `GET /oauth/start?return_to=...` — kicks off Google OAuth
- `GET /oauth/callback` — Google redirects here; redirects back to `return_to` with `?userKey=...&email=...`

### Dashboard-only (session via `?userKey=` query or `x-user-key` header)

- `GET    /me` — profile, spreadsheets, API keys
- `POST   /me/spreadsheets` — register spreadsheet `{google_spreadsheet_id, title?, set_default?}`
- `DELETE /me/spreadsheets/:id`
- `GET    /me/spreadsheets/:id/sheets` — list tabs inside a registered spreadsheet
- `POST   /me/api-keys` — create API key `{label?}`
- `DELETE /me/api-keys/:key`
- `POST   /me/logout` — revokes by deleting the user record

## Data model

- `userKey` = opaque UUID. Exposed in URLs. Revocable by logging out.
- Refresh token encrypted with AES-GCM using `ENCRYPTION_KEY`.
- `spreadsheets` table lets one user register many Google sheets; the default is used when `userKey+sheetName` is looked up.
