# 02 — Architecture

## System diagram

```
                            ┌─────────────────────────────┐
                            │   User's browser            │
                            │                             │
                            │   ┌─────────────────────┐   │
                            │   │ sheets.mreshank.com    │   │
                            │   │ SvelteKit SPA       │   │
                            │   │ (Cloudflare Pages)  │   │
                            │   └──────────┬──────────┘   │
                            └──────────────┼──────────────┘
                                           │
                      ┌────────────────────┼─────────────────────┐
                      │ CORS + x-user-key  │                     │
                      ▼                    ▼                     │
          ┌─────────────────────────────────────────┐            │
          │   sheets.mreshank.com                   │            │
          │   Cloudflare Worker (Hono)              │            │
          │                                         │            │
          │   ┌─────────────────────────────────┐   │            │
          │   │ Routes                          │   │            │
          │   │  /oauth/start, /oauth/callback  │   │            │
          │   │  /api/spreadsheets/:u/:s/:r?    │   │            │
          │   │  /me, /me/spreadsheets, etc.    │   │            │
          │   └─────────────────────────────────┘   │            │
          │                                         │            │
          │   ┌──────────────┐     ┌─────────────┐  │            │
          │   │ D1 database  │     │ AES-GCM     │  │            │
          │   │ users,       │     │ refresh     │  │            │
          │   │ spreadsheets,│     │ token       │  │            │
          │   │ api_keys,    │     │ encryption  │  │            │
          │   │ oauth_states │     └─────────────┘  │            │
          │   └──────────────┘                      │            │
          └───────────────┬─────────────────────────┘            │
                          │                                      │
                          ▼ OAuth / Sheets v4                    │
          ┌─────────────────────────────────────────┐            │
          │   Google APIs                           │            │
          │    accounts.google.com/o/oauth2/...     │            │
          │    oauth2.googleapis.com/token          │            │
          │    sheets.googleapis.com/v4/...         │            │
          └─────────────────────────────────────────┘            │
                                                                 │
                                              Apps Script Add-on │
                                                  (in-sheet UI) ─┘
                                              read-only via
                                              spreadsheets.currentonly
```

## Components

### 1. Worker (`worker/`)

- **Runtime**: Cloudflare Workers with `nodejs_compat`.
- **Framework**: [Hono](https://hono.dev) — minimal, fast, typed.
- **DB**: Cloudflare D1 (SQLite at the edge).
- **Storage at rest**: AES-GCM encrypted refresh tokens (see [06 — Security](./06-security.md)).
- **Secrets**: `GOOGLE_CLIENT_SECRET`, `ENCRYPTION_KEY` (set via `wrangler secret put`).

Handles:
- Google OAuth 2.0 authorization code flow (with `prompt=consent` + `access_type=offline`).
- CRUD over Sheets API v4 (`values.get`, `values.append`, `values.update`, `batchUpdate` for deletes).
- Dashboard control-plane API (`/me/*`).
- Access token caching — refresh tokens exchange for 1-hour access tokens on-demand.

### 2. Dashboard (`dashboard/`)

- **Framework**: SvelteKit 5 with static adapter.
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`).
- **Hosting**: Cloudflare Pages (unlimited bandwidth free).
- **Session**: `userKey` stored in `localStorage` after OAuth callback. (Roadmap: migrate to HTTP-only cookies set by the Worker on the shared apex.)

### 3. Add-on (`addon/`)

- **Runtime**: Google Apps Script V8.
- **Scopes**: `spreadsheets.currentonly`, `script.container.ui`, `script.external_request`.
- **Surfaces**: Editor Add-on menu (`Extensions → SheetsAPI`) and Workspace Add-on homepage (CardService).
- Does **not** hold user tokens — defers OAuth to the dashboard. Purely a presentational surface.

## Data flow: first-time user

1. User clicks **"Connect Google Sheets"** on `sheets.mreshank.com`.
2. Dashboard opens `sheets.mreshank.com/api/oauth/start?return_to=...`.
3. Worker generates `state`, persists in `oauth_states`, redirects to `accounts.google.com/o/oauth2/v2/auth`.
4. User consents → Google redirects to `sheets.mreshank.com/api/oauth/callback?code=...&state=...`.
5. Worker exchanges code → receives `refresh_token` + `id_token`.
6. Worker decodes `id_token.sub` + email, AES-GCM encrypts refresh token, inserts/updates `users` row.
7. Worker redirects to `sheets.mreshank.com/app?userKey=...&email=...`.
8. Dashboard writes `{userKey, email}` to `localStorage`.

## Data flow: API request

```
client --GET /api/spreadsheets/{uk}/{sheet}--> Worker
                                                  │
                                                  │ 1. lookup users.user_key
                                                  │ 2. lookup default spreadsheet binding
                                                  │ 3. decrypt refresh_token_enc
                                                  │ 4. POST oauth2/token (refresh_token grant)
                                                  │ 5. GET sheets/v4/.../values/{sheet}
                                                  │ 6. header row → keys; data rows → objects
                                                  ▼
client <--JSON-----------------------------------  Worker
```

Every request re-refreshes the access token. This is simple and safe; access tokens are never stored. (Optimization on the roadmap: short-lived KV cache keyed by user.)

## Failure modes & fallback behavior

| Scenario                                  | Response                                             |
| ----------------------------------------- | ---------------------------------------------------- |
| User revoked app in Google permissions    | 401 on refresh; Worker returns 500 with error detail |
| Spreadsheet deleted                       | 404 from Sheets API → 500 with error detail         |
| Sheet tab renamed                         | Range not found → empty array or 400                 |
| Header row empty                          | POST returns 400 `"sheet has no header row"`         |
| D1 unavailable                            | Cloudflare edge retries; 500 if persistent           |
| Google Sheets quota hit (300/min)         | 429 passed through                                   |

See [06 — Security](./06-security.md) for threat model and [13 — Roadmap](./13-roadmap.md) for planned hardening.
