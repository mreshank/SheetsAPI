# SheetsAPI Documentation

Complete technical and product documentation for SheetsAPI — a free, open, OAuth-based REST API layer over Google Sheets, designed to replace SheetDB, Sheety, Sheetson, and Sheetsu.

## Index

### Product & overview
- [01 — Overview](./01-overview.md) — what it is, who it's for, what problems it solves
- [02 — Architecture](./02-architecture.md) — system diagram, components, data flow
- [03 — Data Model](./03-data-model.md) — D1 schema, row format, conventions
- [13 — Roadmap](./13-roadmap.md)
- [15 — FAQ](./15-faq.md)
- [16 — Pricing Model](./16-pricing-model.md)

### Developer reference
- [04 — REST API Reference](./04-api-reference.md) — all endpoints, query params, responses
- [05 — Authentication & Authorization](./05-authentication.md) — OAuth flow, API keys
- [08 — Worker Internals](./08-worker.md)
- [09 — Dashboard Internals](./09-dashboard.md)
- [10 — Add-on Internals](./10-addon.md)
- [14 — Contributing](./14-contributing.md)

### Operations & compliance
- [06 — Security](./06-security.md) — threat model, encryption, token handling
- [07 — Deployment](./07-deployment.md) — step-by-step production setup
- [11 — Compliance](./11-compliance.md) — DPDP, GDPR, SOC 2, HIPAA posture
- [17 — SEO & Marketing Strategy](./17-seo-strategy.md)

### Competitive
- [12 — Competitors & Migration](./12-competitors.md) — SheetDB, Sheety, Sheetson, Sheetsu feature matrix + migration guides

---

## Three-component mental model

```
┌──────────────────────┐     ┌─────────────────────┐     ┌────────────────────┐
│  Google Sheets       │◀───▶│  Cloudflare Worker  │◀───▶│  SvelteKit         │
│  (user's data)       │     │  sheets.mreshank    │     │  Dashboard + Site  │
│                      │     │  .com               │     │  sheets.mreshank.com  │
└──────────────────────┘     └─────────────────────┘     └────────────────────┘
          ▲                           ▲
          │                           │
          │                   ┌───────┴───────┐
          └───────────────────│  Apps Script  │
                              │  Add-on       │
                              │  (Extensions  │
                              │   menu)       │
                              └───────────────┘
```

- **Worker** holds the user's encrypted refresh token; mediates every Google Sheets API call.
- **Dashboard** is a static SPA — the only user-facing control plane.
- **Add-on** is a thin sidebar that displays URLs; does not hold tokens.

See [02 — Architecture](./02-architecture.md) for full detail.
