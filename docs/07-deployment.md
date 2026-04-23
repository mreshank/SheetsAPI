# 07 — Deployment

End-to-end production setup for `sheets.mreshank.com` (Worker) + `sheets.mreshank.com` (Dashboard) + Marketplace Add-on.

Budget: **$0/month** covers nearly all expected usage on free tiers.

## Prerequisites

- Cloudflare account (free)
- Google Cloud account (free)
- Domain managed on Cloudflare DNS (you have `mreshank.com`)
- Node 20+, npm, `wrangler` CLI (`npm i -g wrangler`)

## Step 1 — Google Cloud setup

1. [Create a GCP project](https://console.cloud.google.com/projectcreate): `sheetsapi-prod`
2. **Enable APIs**:
   - Google Sheets API
   - Google Drive API
3. **OAuth consent screen** → External:
   - App name: SheetsAPI
   - User support email: your-email@mreshank.com
   - App logo: upload a 120×120 PNG
   - App domain: `mreshank.com`
   - Authorized domains: `mreshank.com`
   - Developer contact: your email
   - Scopes: `openid`, `email`, `https://www.googleapis.com/auth/spreadsheets`, `https://www.googleapis.com/auth/drive.file`
   - Test users: add your email(s) while unverified
4. **Credentials → Create OAuth Client ID → Web application**:
   - Authorized JavaScript origins: `https://sheets.mreshank.com`
   - Authorized redirect URIs: `https://sheets.mreshank.com/api/oauth/callback`
5. Copy **Client ID** and **Client Secret**

## Step 2 — Worker setup

```bash
cd worker
npm install

# Create D1 database
wrangler d1 create sheetsapi
# Paste the returned database_id into wrangler.toml

# Apply schema
wrangler d1 execute sheetsapi --file=./schema.sql --remote

# Set vars in wrangler.toml
#   GOOGLE_CLIENT_ID   = "<from step 1.5>"
#   OAUTH_REDIRECT_URI = "https://sheets.mreshank.com/api/oauth/callback"
#   DASHBOARD_URL      = "https://sheets.mreshank.com"

# Set secrets
wrangler secret put GOOGLE_CLIENT_SECRET        # paste from step 1.5
wrangler secret put ENCRYPTION_KEY              # `openssl rand -hex 32`

# Deploy
wrangler deploy
```

### Attach custom domain

1. Cloudflare dashboard → Workers & Pages → your worker → **Settings → Triggers → Custom Domains**
2. Add `sheets.mreshank.com`
3. Cloudflare automatically provisions the cert and DNS

## Step 3 — Dashboard deploy

```bash
cd dashboard
npm install
echo "VITE_API_BASE=https://sheets.mreshank.com" > .env
npm run build

# First deploy
wrangler pages deploy build --project-name=sheetsapi-app

# Attach custom domain
# Cloudflare dashboard → Pages → sheetsapi-app → Custom domains → sheets.mreshank.com
```

## Step 4 — Add-on publish

1. [script.google.com](https://script.google.com) → New Project → rename **SheetsAPI**
2. Replace default files with [`addon/Code.gs`](../addon/Code.gs), [`addon/Sidebar.html`](../addon/Sidebar.html), [`addon/appsscript.json`](../addon/appsscript.json)
3. **Project Settings → "Show appsscript.json"** (checkbox) → paste manifest
4. **Project Settings → Google Cloud Platform (GCP) Project** → link the same GCP project from Step 1
5. **Deploy → Test deployments → Install** — verify the Add-on appears under `Extensions → SheetsAPI`

For public distribution:

1. Google Workspace Marketplace SDK (enable in GCP) → fill listing (screenshots, description, pricing=free)
2. Pay the one-time $5 Developer Registration fee
3. Submit for review (typical: 1–3 weeks)

## Step 5 — Verification checklist

Go through as an end-user:

- [ ] Visit `https://sheets.mreshank.com` — landing page loads
- [ ] Click **Connect Google Sheets** → consent screen shows "SheetsAPI" with your logo
- [ ] After consent, land on `/app` with your userKey displayed
- [ ] Paste a Google Sheet URL → "Add" succeeds
- [ ] Tabs appear with copyable endpoint URLs
- [ ] `curl` on the GET endpoint returns JSON
- [ ] POST appends a row (check in Sheets UI)
- [ ] Create an API key → subsequent unauthenticated GETs return 401
- [ ] Authenticated GETs with `Authorization: Bearer sk_...` succeed
- [ ] Sign out → GET returns 404 "user not found"

## DNS summary

| Record                | Type  | Target                                      |
| --------------------- | ----- | ------------------------------------------- |
| `mreshank.com`        | —     | (your existing setup)                       |
| `sheets.mreshank.com` | CNAME | managed by Cloudflare Workers custom domain |
| `sheets.mreshank.com` | CNAME | managed by Cloudflare Pages custom domain   |

Both get automatic Cloudflare-issued certs.

## Observability

Cloudflare provides:

- **Workers → Metrics**: request count, CPU time, error rate
- **D1 → Metrics**: query count, latency
- **Pages → Analytics**: pageviews, referrers

For deeper insight (roadmap):

- Cloudflare Logpush → R2 or external sink
- Sentry for Worker errors (use `@sentry/cloudflare`)
- Grafana Cloud free tier for dashboards

## Rollback

```bash
cd worker && wrangler rollback    # lists recent deployments; pick one
cd dashboard && wrangler pages deployment list --project-name=sheetsapi-app
# promote an earlier deployment from the dashboard UI
```

## Cost ceiling (as of 2026-01)

| Resource          | Free tier              | Cost past tier                      |
| ----------------- | ---------------------- | ----------------------------------- |
| Workers           | 100k req/day           | $5/month → 10M req                  |
| D1                | 5 GB, 5M reads/day     | $5/month → 25B reads/mo             |
| Pages             | Unlimited bandwidth    | —                                   |
| Workers Secrets   | Unlimited              | —                                   |
| Apps Script       | Unlimited free         | —                                   |
| Google Sheets API | Free (300/min/project) | Quota increase free via GCP support |
| Domain            | Already owned          | —                                   |

You'd need >100k API calls/day before paying anything.
