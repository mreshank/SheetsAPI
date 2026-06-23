# 12 — Competitors & Migration

SheetsAPI is positioned as a **free, open, full-featured replacement** for the paid "Google Sheets as REST API" category.

## Feature matrix

| Feature                            | **SheetsAPI** | SheetDB.io | Sheety.co | Sheetson | APISpreadsheets (Sheetsu) |
| ---------------------------------- | :-----------: | :--------: | :-------: | :------: | :-----------------------: |
| **Pricing**                        |               |            |           |          |                           |
| Free tier                          | ✅ 100k req/day (CF) | ⚠️ 500 req/mo | ⚠️ 200 req/mo | ⚠️ unmetered, 1k rows/sheet | ⚠️ 250 req/mo, 3 files |
| Open source option                 | ✅            | ❌         | ❌        | ❌       | ❌                        |
| Self-hostable                      | ✅            | ❌         | ❌        | ❌       | ❌                        |
| **Core CRUD**                      |               |            |           |          |                           |
| GET list                           | ✅            | ✅         | ✅        | ✅       | ✅                        |
| GET single row                     | ✅            | ✅         | ✅        | ✅       | ✅                        |
| POST append (single & batch)       | ✅            | ✅         | ✅        | ✅       | ✅                        |
| PUT update                         | ✅            | ✅         | ✅        | ✅       | ✅                        |
| DELETE                             | ✅            | ✅         | ✅        | ✅       | ✅                        |
| PATCH partial                      | 🕐 planned    | ✅         | ✅        | ✅       | ❌                        |
| **Query features**                 |               |            |           |          |                           |
| Pagination (limit/offset)          | ✅            | ✅         | ✅        | ✅       | ✅                        |
| Search / filter                    | ✅            | ✅         | ✅        | ✅       | ✅                        |
| Sort                               | ✅            | ✅         | ❌        | ✅       | ❌                        |
| Field selection                    | ✅            | ❌         | ❌        | ✅       | ❌                        |
| Advanced search (AND/OR)           | 🕐 planned    | ✅ paid    | ❌        | ❌       | ✅                        |
| **Output formats**                 |               |            |           |          |                           |
| JSON                               | ✅            | ✅         | ✅        | ✅       | ✅                        |
| CSV                                | ✅            | ✅         | ❌        | ❌       | ✅                        |
| TSV                                | ✅            | ❌         | ❌        | ❌       | ❌                        |
| XML                                | ✅            | ✅         | ❌        | ❌       | ❌                        |
| JSONP                              | ✅            | ✅         | ❌        | ❌       | ❌                        |
| **Security**                       |               |            |           |          |                           |
| OAuth-based (no sharing sheets)    | ✅            | ⚠️ mixed  | ✅        | ✅       | ✅                        |
| API key per user                   | ✅            | ✅         | ✅        | ✅       | ✅                        |
| Scoped API keys (read-only etc.)   | 🕐 planned    | ✅ paid    | ❌        | ❌       | ❌                        |
| Per-endpoint CORS rules            | 🕐 planned    | ✅ paid    | ❌        | ❌       | ❌                        |
| BYOK / self-hosted                 | ✅            | ❌         | ❌        | ❌       | ❌                        |
| Encrypted tokens at rest           | ✅            | ? undisclosed | ? | ? | ? |
| **Integrations**                   |               |            |           |          |                           |
| Workspace Marketplace Add-on       | ✅            | ❌         | ❌        | ❌       | ❌                        |
| Webhooks                           | 🕐 planned    | ✅ paid    | ❌        | ❌       | ❌                        |
| Zapier/Make connector              | 🕐 planned    | ✅         | ✅        | ❌       | ✅                        |
| OpenAPI spec                       | 🕐 planned    | ❌         | ❌        | ❌       | ❌                        |
| SDKs (JS/TS, Python)               | 🕐 planned    | ❌         | ❌        | ❌       | ❌                        |
| **Developer experience**           |               |            |           |          |                           |
| Dashboard                          | ✅ SvelteKit+Tailwind v4 | ✅ | ✅ | ✅ | ✅ |
| Live endpoint preview              | ✅            | ✅         | ✅        | ✅       | ✅                        |
| Docs site                          | ✅            | ✅         | ✅        | ✅       | ✅                        |
| Templates library                  | 🕐 planned    | ❌         | ❌        | ❌       | ❌                        |
| Public status page                 | 🕐 planned    | ❌         | ❌        | ❌       | ❌                        |

## Why switch?

### vs **SheetDB.io**
- SheetDB free tier is 500 requests/month — tight for anything real. Paid tier starts at $29.99/mo.
- SheetsAPI free tier covers 100k requests/day on Cloudflare.
- SheetsAPI is self-hostable; SheetDB is not.

### vs **Sheety.co**
- Sheety's free is 200 requests/month; paid starts at $9.99/mo.
- Sheety doesn't offer CSV/XML output.
- No self-host option.

### vs **Sheetson**
- Free tier is unmetered on requests but caps each sheet at 1,000 rows.
- No Workspace Marketplace presence.
- Paid is $99/year (~$8.25/mo).

### vs **APISpreadsheets / Sheetsu**
- Sheetsu sunsetted; APISpreadsheets picked up the mantle.
- APISpreadsheets has 250 req/day free.
- Neither is open source.

## Migration guides

### From SheetDB.io

1. Sign in to SheetsAPI with Google.
2. In the dashboard, paste your Google Sheet URL → **Add**.
3. Copy your new endpoint URL (shape matches SheetDB's pattern closely; you may need to swap `https://sheetdb.io/api/v1/<id>` → `https://sheetsapi.gkit.mreshank.com/api/spreadsheets/<userKey>/<sheetName>`).
4. Find-and-replace the base URL in your application code.
5. **Optional**: create an API key in SheetsAPI and switch from SheetDB's auth header to `Authorization: Bearer sk_...`.
6. Verify by running a sample GET. If returns shape matches, you're done.

**Response shape compatibility**: both return an array of objects keyed by header row. No transformation needed for most cases.

**Differences to watch for**:
- SheetDB's `/search` endpoint → SheetsAPI uses `?search=field:value` on the list endpoint (planned).
- SheetDB's `/keys` endpoint → SheetsAPI has `_meta` (roadmap).
- SheetDB error format is `{ error: "..." }` — same in SheetsAPI.

### From Sheety.co

1. Note Sheety's URL shape: `https://api.sheety.co/<userId>/<projectName>/<tabName>`. Response shape wraps rows in `{ <tabName>: [...] }`.
2. SheetsAPI returns unwrapped arrays: `[ { ... }, ... ]`. You'll need a small adapter:

```js
const r = await fetch(url).then(r => r.json());
const rows = Array.isArray(r) ? r : r[tabName];
```

3. Sheety uses `id` column for PUT/DELETE; SheetsAPI uses 1-based row index. If you have an `id` column, prefer PATCH-by-field search (roadmap) or migrate to indexed access.

### From Sheetson

1. Sheetson URL: `https://api.sheetson.com/v2/sheets/<sheetName>` with `X-Spreadsheet-Id` header. SheetsAPI encodes both in the path.
2. Sheetson uses `rowIndex` zero-based; SheetsAPI uses 1-based. Adjust by +1.

### From APISpreadsheets

1. Their URL: `https://api.apispreadsheets.com/data/<fileID>/`.
2. Default SheetsAPI maps cleanly since column names become JSON keys the same way.
3. Search query differs: `?query=select * where name='Ada'` → SheetsAPI uses `?search=name:Ada`.

## Pricing comparison

Free tiers verified June 2026 from each vendor's pricing page. Per-usage paid rows
are **estimates** for rough comparison — see each vendor for exact tier breakpoints.

| Usage                   | SheetDB  | Sheety   | Sheetson      | APISpreadsheets | **SheetsAPI** |
| ----------------------- | -------- | -------- | ------------- | --------------- | ------------- |
| Free tier               | 500 req/mo | 200 req/mo | unmetered, 1k rows | 250 req/mo | ~3M req/mo (CF) |
| Entry paid plan         | $29.99/mo | $9.99/mo | $99/yr (~$8/mo) | paid          | **$0 (beta)** |
| 100k req/mo (est.)      | ~$30      | ~$30     | ~$8           | ~$50            | **$0**        |
| 1M req/mo (est.)        | ~$99      | ~$80     | ~$8           | custom          | **$0–5**      |

Sources: [SheetDB](https://sheetdb.io/pricing), [Sheety](https://sheety.co/pricing), [Sheetson](https://sheetson.com/), [APISpreadsheets](https://www.apispreadsheets.com/pricing). Sheetson does not meter requests, so its price is flat regardless of volume.

## Why we win

1. **Free-tier economics.** Cloudflare's Workers + D1 free tier dwarfs competitors' paid limits.
2. **Open source.** Self-host for compliance, latency, or trust reasons.
3. **Workspace-native.** Only solution with a proper `Extensions → SheetsAPI` menu.
4. **OAuth-first.** No "share your sheet with this email" dance.
5. **Modern stack.** SvelteKit + Tailwind v4 dashboard, Hono worker — fast, maintainable.
6. **Compliance-ready.** DPDP/GDPR/SOC 2 posture documented; HIPAA path defined.
