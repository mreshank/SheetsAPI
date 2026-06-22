# 13 — Roadmap

## Status legend

- ✅ shipped
- 🚧 in progress
- 🕐 planned (next quarter)
- 🌱 ideation

## v0.1 — MVP (shipped)

- ✅ OAuth 2.0 flow (Google)
- ✅ D1 schema: users, spreadsheets, api_keys, oauth_states
- ✅ CRUD endpoints: GET list, GET one, POST, PUT, DELETE
- ✅ Progressive API-key enforcement
- ✅ SvelteKit + Tailwind v4 dashboard
- ✅ Apps Script Add-on
- ✅ Docs site (this folder)

## v0.2 — Query features

- 🚧 `?limit`, `?offset` pagination
- 🚧 `?search=field:value` substring search
- 🚧 `?search_exact=field:value`
- 🚧 `?sort=field`, `?sort=-field`
- 🚧 `?fields=a,b,c` field selection
- 🚧 `?format=csv|tsv|xml|jsonp`
- 🚧 `?callback=foo` for JSONP

## v0.3 — Discovery & meta

- 🕐 `GET /api/spreadsheets/:userKey/_meta` — tabs, headers per tab
- 🕐 `POST /api/spreadsheets/:userKey/:sheet/search` — rich search body
- 🕐 PATCH for partial updates (single-row)
- 🕐 Multi-spreadsheet addressing: `/api/spreadsheets/:userKey/:spreadsheetId/:sheetName`
- 🕐 Row creation returns the new row's index

## v0.4 — Integrations

- 🕐 Webhooks: POST to user-provided URL on any mutation
- 🕐 Zapier connector (public Zap template)
- 🕐 Make.com module
- 🕐 n8n community node
- 🕐 OpenAPI 3.1 spec generated per user
- 🕐 TypeScript SDK: `@sheetsapi/client`
- 🕐 Python SDK: `sheetsapi`

## v0.5 — Security hardening

- 🕐 Hash API keys at rest (SHA-256)
- 🕐 Scoped API keys: read-only, per-tab, CIDR-restricted, expiring
- 🕐 Per-endpoint CORS allowlist
- 🕐 Rate limiting per `userKey` via Cloudflare Durable Objects
- 🕐 HTTP-only cookie session for dashboard (replace localStorage)
- 🕐 `security.txt` + responsible disclosure policy page
- 🕐 Audit log (Durable Objects or Logpush → R2)

## v0.6 — Performance

- 🕐 Access token cache in Workers KV (5-minute TTL)
- 🕐 Header row cache per tab (60s)
- 🕐 Conditional requests (ETag/If-None-Match) on GET list
- 🕐 Edge cache-control for public endpoints

## v0.7 — Marketplace

- 🕐 Submit Workspace Marketplace listing (public)
- 🕐 Google OAuth verification
- 🕐 Template library: 20+ starter sheets (CRM, leads, events, guestbook, etc.)
- 🕐 One-click "Use this template" flow → creates sheet in user's Drive + connects

## v0.8 — Pro features

- 🕐 Usage analytics per userKey (requests, latency, errors)
- 🕐 Custom domains (`api.yourcompany.com` → proxied)
- 🕐 Team accounts: multiple users share spreadsheet access
- 🕐 Payment flow (Stripe) for paid tiers
- 🕐 SLA-backed uptime promise

## v0.9 — Self-hosted bundle

- 🕐 Published container image: `ghcr.io/mreshank/sheetsapi:latest`
- 🕐 Deploy guides: Vercel, Fly.io, Railway, Render, Kubernetes
- 🕐 BYOK OAuth client doc (create your own in GCP, plug into .env)
- 🕐 Terraform module

## v1.0 — Compliance & polish

- 🕐 SOC 2 Type II engagement started
- 🕐 DPIA published
- 🕐 HIPAA bundle (self-host with BAA-compliant defaults)
- 🕐 Verified OAuth consent screen
- 🕐 Status page at `status.mreshank.com`
- 🕐 Public changelog RSS feed

## v2.0 — Beyond Sheets

- 🌱 Excel Online support
- 🌱 Notion databases as a backend
- 🌱 Airtable read compatibility
- 🌱 CSV files on Google Drive
- 🌱 GraphQL endpoint
- 🌱 Server-sent events for live updates

## Anti-roadmap

Deliberately **not** doing:
- ❌ Storing spreadsheet row data in our DB (keep thin-proxy model)
- ❌ Offering "our own cells" — we don't replace Sheets
- ❌ Chat/AI on top of sheets (out of scope for this product)
- ❌ Complex permission matrices (keep flat `userKey` model for MVP)
