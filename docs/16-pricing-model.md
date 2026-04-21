# 16 — Pricing Model

> **Principle**: the free tier stays generous forever. Paid plans exist for teams that want SLAs, higher limits, and collaboration features.

## Tiers

### Free — $0
- Unlimited spreadsheets
- Unlimited tabs
- ~100k API requests/day (shared)
- Public docs + dashboard
- Community support
- OAuth, API keys, CRUD, search, pagination, formats
- All CRUD output formats (JSON/CSV/TSV/XML/JSONP)

### Pro — $9/mo (roadmap v0.8)
- 10× rate limit (per-user)
- Usage analytics (requests, latency, errors per endpoint)
- Custom domain aliasing (`api.yourco.com`)
- Webhook on changes
- Scoped API keys (read-only, per-tab, CIDR, expiry)
- Email support
- Priority Google quota

### Team — $29/mo (roadmap v0.8)
- Everything in Pro
- Up to 5 team members sharing workspace
- Shared spreadsheet bindings
- Shared API keys with role assignment
- Audit log (90-day retention)
- Slack/Discord alerts

### Enterprise — custom (roadmap v1.0)
- Everything in Team
- SLA: 99.9% uptime
- BAA (HIPAA eligibility)
- Dedicated GCP project / quota
- SSO (Google Workspace / Okta)
- Custom DPA / subprocessor review
- On-prem / private cloud self-host support
- Invoicing, PO billing

### Self-hosted — $0 (open source)
- All features (Pro + Team) unlocked
- Bring-your-own Cloudflare + GCP
- No support — community or paid optional
- GitHub stars appreciated

## What we'll **never** charge for

- Basic CRUD endpoints (GET/POST/PUT/DELETE)
- Your own data access
- OAuth login
- API keys
- CSV/JSON/XML export
- The dashboard
- The Add-on

## Comparison to competitors (at 100k req/mo)

| Plan                  | Monthly cost |
| --------------------- | ------------ |
| SheetDB Pro           | $29          |
| Sheety Starter        | $29          |
| Sheetson Pro          | $24          |
| APISpreadsheets Team  | $50          |
| **SheetsAPI Free**    | **$0**       |
| **SheetsAPI Pro**     | **$9**       |

## How we keep it sustainable

Cloudflare's free Workers + D1 tier covers tens of thousands of users at no cost. Per-user marginal cost on paid plans: <$0.10/mo — we capture a healthy margin even at low price points.

If bandwidth/usage scales beyond the free tier, the per-request cost on Workers ($0.30 per million) is 100× cheaper than any other serverless origin, so economics remain favorable.

Our moat is **product quality, openness, and workspace integration** — not rent-seeking pricing.
