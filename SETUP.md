# SheetsAPI — Full Setup Guide

End-to-end instructions to take this repo from zero to production on a single subdomain (`sheets.mreshank.com`), on a $0/month budget for most workloads.

**Time budget**: ~45 minutes of active work + ~2–4 weeks waiting on Google OAuth verification (only needed for public launch; unverified apps work fine for personal/team use with a test-user allowlist).

---

## 1. Architecture — one subdomain, two services

```
              sheets.mreshank.com
                      │
        ┌─────────────┴─────────────┐
        │                           │
  path = /api/*                other paths
        │                           │
        ▼                           ▼
 ┌─────────────┐            ┌──────────────┐
 │  Worker     │            │  Pages       │
 │  (REST API  │            │  (SvelteKit  │
 │   + OAuth)  │            │   static)    │
 └─────────────┘            └──────────────┘
```

Cloudflare matches **Worker routes before Pages**, so any request to `/api/*` hits the Worker and everything else (landing page, docs, `/app`, `/connect`, deep links) falls through to the Pages deployment.

**Why this matters**: you only need `sheets.mreshank.com` — no separate `app.` or `api.` subdomains.

---

## 2. Prerequisites

| Tool                                 | Why                                             |
| ------------------------------------ | ----------------------------------------------- |
| Node 20+, npm 10+                    | Build Worker and Dashboard                      |
| `wrangler` CLI (`npm i -g wrangler`) | Deploy Worker + Pages; manage D1                |
| Cloudflare account (free)            | Workers + D1 + Pages hosting                    |
| Google Cloud account (free)          | OAuth client + Sheets API + Drive API           |
| `mreshank.com` on Cloudflare DNS     | Required for Worker route + Pages custom domain |
| `openssl`                            | Generate ENCRYPTION_KEY                         |

---

## 3. Repository layout

```
SheetsAPI/
├── worker/          Cloudflare Worker — REST API + OAuth backend (mounted at /api/*)
├── dashboard/       SvelteKit SPA — marketing + user dashboard (everything else)
├── addon/           Google Apps Script — Extensions → SheetsAPI
├── docs/            Engineering + product documentation
├── README.md
└── SETUP.md         (this file)
```

---

## 4. Google Cloud Console (one-time)

### 4.1 Create project & enable APIs

1. [console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate) → name `sheetsapi-prod`.
2. APIs & Services → Library → enable:
   - **Google Sheets API**
   - **Google Drive API**

### 4.2 OAuth consent screen

APIs & Services → OAuth consent screen → **External** → Create.

| Field              | Value                                       |
| ------------------ | ------------------------------------------- |
| App name           | SheetsAPI                                   |
| User support email | `your-email@mreshank.com`                   |
| App logo           | Upload a 120×120 PNG                        |
| App home page      | `https://sheets.mreshank.com`               |
| Privacy policy     | `https://sheets.mreshank.com/legal/privacy` |
| Terms of service   | `https://sheets.mreshank.com/legal/terms`   |
| Authorized domains | `mreshank.com`                              |
| Developer contact  | `your-email@mreshank.com`                   |

**Scopes**: `openid`, `email`, `https://www.googleapis.com/auth/spreadsheets`, `https://www.googleapis.com/auth/drive.file`.

**Test users**: add any email that'll use the app before you submit for verification.

### 4.3 Create OAuth Client ID

Credentials → Create Credentials → **OAuth client ID** → Web application.

| Field                         | Value                                                           |
| ----------------------------- | --------------------------------------------------------------- |
| Name                          | SheetsAPI Web                                                   |
| Authorized JavaScript origins | `https://sheets.mreshank.com`                                   |
| Authorized redirect URIs      | `https://sheets.mreshank.com/api/oauth/callback` ⚠️ note `/api` |

Copy **Client ID** and **Client Secret** — used in section 5.

---

## 5. Worker (`worker/`)

### 5.1 Install and create D1

```bash
cd worker
npm install
wrangler login
wrangler d1 create sheetsapi
```

Paste the returned `database_id` into `worker/wrangler.toml`.

### 5.2 Apply schema

```bash
wrangler d1 execute sheetsapi --file=./schema.sql --remote
```

### 5.3 `wrangler.toml` review

Already configured for the single-subdomain model. Verify these values:

```toml
routes = [
  { pattern = "sheets.mreshank.com/api/*", zone_name = "mreshank.com" }
]

[vars]
GOOGLE_CLIENT_ID    = "<paste-client-id>.apps.googleusercontent.com"
OAUTH_REDIRECT_URI  = "https://sheets.mreshank.com/api/oauth/callback"
DASHBOARD_URL       = "https://sheets.mreshank.com"
```

**Critical**: the route is pattern-based, not `custom_domain = true`. A custom-domain route owns the entire hostname and would block Pages.

### 5.4 Secrets

```bash
wrangler secret put GOOGLE_CLIENT_SECRET       # paste from 4.3
wrangler secret put ENCRYPTION_KEY             # openssl rand -hex 32
```

### 5.5 Deploy

```bash
wrangler deploy
```

Cloudflare creates the route `sheets.mreshank.com/api/*` automatically. No custom-domain setup on the Worker — Pages owns the hostname (next section).

### 5.6 Smoke test

```bash
curl https://sheets.mreshank.com/api/
# -> { "name": "SheetsAPI", "docs": "...", "endpoints": { ... } }
```

(You'll get a Pages 404 or "not found" on `/` until section 6 — that's fine, the Worker route is independent.)

---

## 6. Dashboard (`dashboard/`)

### 6.1 Install & build

```bash
cd ../dashboard
npm install
cp .env.example .env
# .env already points at https://sheets.mreshank.com
npm run build
```

### 6.2 First deploy

```bash
npm run deploy
# runs: vite build && wrangler pages deploy build --project-name=sheetsapi-app
```

Cloudflare prints a `*.pages.dev` URL — sanity check it loads.

### 6.3 Attach the custom domain

Cloudflare dashboard → **Workers & Pages → sheetsapi-app → Custom domains → Set up a custom domain** → `sheets.mreshank.com`.

Cloudflare provisions the cert and adds a CNAME automatically.

Because the Worker route (`/api/*`) is narrower and Workers take precedence, `sheets.mreshank.com/api/*` still hits the Worker while everything else now serves the Pages deployment.

### 6.4 Smoke test

- `https://sheets.mreshank.com/` → landing page
- `https://sheets.mreshank.com/docs` → docs site
- `https://sheets.mreshank.com/sitemap.xml` → lists 60+ URLs
- `https://sheets.mreshank.com/api/` → Worker JSON (still!)
- `https://sheets.mreshank.com/compare/sheetdb-alternative` → SPA-routed page

---

## 7. Google Apps Script Add-on (`addon/`)

### 7.1 Create Apps Script project

1. [script.google.com](https://script.google.com) → New project, name it **SheetsAPI**.
2. Project Settings → check **"Show `appsscript.json` manifest file in editor"**.
3. Replace default files with the three in `addon/`:
   - `appsscript.json`
   - `Code.gs` — `API_BASE` and `DASHBOARD_URL` already point at `https://sheets.mreshank.com`
   - `Sidebar.html`

### 7.2 Link to your GCP project

Project Settings → Google Cloud Platform (GCP) Project → **Change project** → paste your GCP Project ID from section 4.1.

In Google Cloud Console, enable the **Apps Script API**.

### 7.3 Test

Inside any Google Sheet → **Extensions → SheetsAPI → Open**. Sidebar appears. If `localStorage` is empty, it links back to `sheets.mreshank.com/connect` for first-time setup.

### 7.4 Publish to Workspace Marketplace (optional)

1. GCP → enable **Google Workspace Marketplace SDK** → fill listing.
2. Pay one-time $5 **Developer Registration Fee**.
3. Submit for review (1–3 weeks).

---

## 8. OAuth verification for public launch

Required only for distribution beyond your test-user list. Submit in OAuth consent screen:

- Privacy + terms URLs (live from section 6)
- Scope justifications (why `spreadsheets` + `drive.file`)
- ≤3-min YouTube demo showing the OAuth flow and scope usage

Turnaround: 2–4 weeks. Until verified, users outside your allowlist see a "this app is blocked" screen.

---

## 9. DNS summary

| Host                        | Type         | Managed by                         |
| --------------------------- | ------------ | ---------------------------------- |
| `mreshank.com`              | (your setup) | —                                  |
| `sheets.mreshank.com`       | CNAME        | Cloudflare Pages custom domain     |
| `sheets.mreshank.com/api/*` | Worker route | Cloudflare Workers (same hostname) |

One subdomain, one CNAME, one Worker route.

---

## 10. Local development

Two terminals:

```bash
# Terminal 1 — Worker
cd worker
wrangler dev
# Runs at http://127.0.0.1:8787; routes mounted at /api/*
# e.g. http://127.0.0.1:8787/api/
```

```bash
# Terminal 2 — Dashboard
cd dashboard
echo 'VITE_API_BASE=http://127.0.0.1:8787' > .env
npm run dev
# http://localhost:5173; API calls go to http://127.0.0.1:8787/api/*
```

**OAuth caveat**: Google requires a real HTTPS redirect URI — you can't test the end-to-end OAuth against localhost. Options:

- **Cloudflare Tunnel** (easiest): `cloudflared tunnel --url http://localhost:8787` → get a temporary `https://*.trycloudflare.com` URL → temporarily update `OAUTH_REDIRECT_URI` in `wrangler.toml` + the GCP redirect URI.
- **Staging**: deploy a `sheetsapi-staging` worker + Pages project on a staging subdomain.

---

## 11. Post-deploy checklist

- [ ] `https://sheets.mreshank.com/` landing page loads
- [ ] `https://sheets.mreshank.com/api/` returns the discovery JSON
- [ ] "Connect Google Sheets" → consent screen shows your app name + logo
- [ ] Callback lands you on `/app?userKey=…&email=…` → strips params to `/app`
- [ ] Dashboard shows your userKey, spreadsheets section, API keys section
- [ ] Add a test sheet → tabs appear with copyable endpoint URLs
- [ ] `curl` GET endpoint → array of row objects
- [ ] POST appends a row → verify in Google Sheets UI
- [ ] Create API key → unauthenticated curl returns 401
- [ ] Authenticated curl (`-H 'authorization: Bearer sk_…'`) returns 200
- [ ] Sign out → next curl returns 404 `"user not found"`
- [ ] Extensions menu in any Sheet shows **SheetsAPI → Open**
- [ ] `/sitemap.xml`, `/robots.txt`, `/.well-known/security.txt` all resolve

---

## 12. Cost ceiling

| Resource          | Free tier              | When you'd pay                  |
| ----------------- | ---------------------- | ------------------------------- |
| Workers           | 100k req/day           | $5/mo → 10M req                 |
| D1                | 5 GB, 5M reads/day     | $5/mo → 25B reads/mo            |
| Pages             | Unlimited bandwidth    | Never (static)                  |
| Apps Script       | Unlimited              | Never                           |
| Google Sheets API | Free (300/min/project) | Free quota increase via support |
| Domain            | You already own it     | —                               |

Realistically: **$0/month** until you're past 100k API requests/day.

---

## 13. Troubleshooting

**Pages serves up when I hit `/api/`** — your Worker route is `custom_domain = true` or too wide. Change to `pattern = "sheets.mreshank.com/api/*"` in `wrangler.toml` and `wrangler deploy`.

**Worker serves up when I hit `/docs`** — your Worker route is too wide. Narrow to `/api/*` only.

**"this app is blocked" on consent screen** — unverified OAuth. Add yourself as a test user until verified.

**`invalid_grant`** — user revoked our app in their Google account. They need to reconnect.

**CORS errors** — shouldn't happen; the Worker sets `Access-Control-Allow-Origin: *`. If you see them, check the request hits `/api/...` not a typo.

**404 on `/sitemap.xml`** — ensure `src/routes/sitemap.xml/+server.ts` is present. `export const prerender = true` is required.

**Deep links 404 after deploy** — `fallback: 'index.html'` in `svelte.config.js` handles this; Cloudflare Pages serves `index.html` for unmatched paths.

**Worker logs** — `wrangler tail --format=pretty` from `worker/`.

---

## 14. Where to go next

- [`docs/`](docs/) — 18 files of deeper documentation
- [`docs/13-roadmap.md`](docs/13-roadmap.md) — upcoming work
- [`docs/12-competitors.md`](docs/12-competitors.md) — migration guides from SheetDB/Sheety/etc.
- [`docs/14-contributing.md`](docs/14-contributing.md) — contributing
