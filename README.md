# SheetsAPI

> Turn any Google Sheet into a REST API. Free. OAuth-based. Open source. A drop-in replacement for SheetDB, Sheety, Sheetson, and Sheetsu.

![status](https://img.shields.io/badge/status-v0.2-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![cost](https://img.shields.io/badge/hosting-$0%2Fmo-brightgreen)

## What this is

Sign in with Google → paste a Google Sheet URL → get this:

```
GET    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}
GET    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
POST   https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}
PUT    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
DELETE https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
```

First row of every tab = JSON keys. CRUD just works. CORS enabled. Free tier covers ~3M requests/month.

## Architecture

```
SheetsAPI/
├── worker/          Cloudflare Worker — REST API + OAuth backend (sheets.mreshank.com)
├── dashboard/       SvelteKit 5 + Tailwind v4 — marketing + user dashboard (sheets.mreshank.com)
├── addon/           Google Apps Script — Extensions → SheetsAPI menu in every Sheet
├── docs/            18 files of product + engineering documentation
├── SETUP.md         End-to-end production setup
└── README.md        (this file)
```

Three independently deployable pieces, one unified product.

## Quick start (for users)

1. Visit [`sheets.mreshank.com`](https://sheets.mreshank.com)
2. Click **Connect Google Sheets**, sign in
3. Paste your sheet URL
4. Copy the endpoint URL, `curl` it, done

## Deploying your own

See [**SETUP.md**](./SETUP.md) for the full 12-step production runbook. TL;DR:

```bash
# 1. Worker
cd worker && npm install
wrangler d1 create sheetsapi                # paste ID into wrangler.toml
wrangler d1 execute sheetsapi --file=./schema.sql --remote
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put ENCRYPTION_KEY          # openssl rand -hex 32
wrangler deploy

# 2. Dashboard
cd ../dashboard && npm install
cp .env.example .env
npm run build
npm run deploy

# 3. Add-on
# Paste addon/{appsscript.json, Code.gs, Sidebar.html} into script.google.com
```

## Docs

| File                                                        | Purpose                                         |
| ----------------------------------------------------------- | ----------------------------------------------- |
| [`SETUP.md`](./SETUP.md)                                    | Production setup, DNS, DNS, smoke tests, cost   |
| [`docs/01-overview.md`](./docs/01-overview.md)              | What this is and who it's for                   |
| [`docs/02-architecture.md`](./docs/02-architecture.md)      | System diagram and data flow                    |
| [`docs/04-api-reference.md`](./docs/04-api-reference.md)    | Full REST API reference                         |
| [`docs/05-authentication.md`](./docs/05-authentication.md)  | OAuth flow + API keys                           |
| [`docs/06-security.md`](./docs/06-security.md)              | Encryption, threat model, incident response     |
| [`docs/07-deployment.md`](./docs/07-deployment.md)          | Deployment details (see also SETUP.md)          |
| [`docs/11-compliance.md`](./docs/11-compliance.md)          | DPDP, GDPR, SOC 2, HIPAA posture                |
| [`docs/12-competitors.md`](./docs/12-competitors.md)        | Feature matrix vs SheetDB/Sheety/Sheetson/Sheetsu + migration guides |
| [`docs/13-roadmap.md`](./docs/13-roadmap.md)                | v0.2 → v2.0                                     |
| [`docs/17-seo-strategy.md`](./docs/17-seo-strategy.md)      | Keyword targeting + content calendar            |

## Feature matrix vs competitors

|                            | SheetsAPI | SheetDB | Sheety | Sheetson | APISpreadsheets |
| -------------------------- | :-------: | :-----: | :----: | :------: | :-------------: |
| Free req/month             | 100k~1M       | 500     | 6k     | 500 rows | 7.5k            |
| 100k req/mo cost           | **$0**    | $29     | $29    | $24      | $50             |
| Open source                | ✅        | ❌       | ❌     | ❌        | ❌              |
| Self-hostable              | ✅        | ❌       | ❌     | ❌        | ❌              |
| Workspace Marketplace      | ✅        | ❌       | ❌     | ❌        | ❌              |
| OAuth + API keys           | ✅        | ✅       | ✅     | ✅        | ✅              |
| JSON/CSV/TSV/XML/JSONP     | ✅        | partial | JSON   | JSON     | partial         |
| Search + sort + pagination | ✅        | ✅       | ✅     | ✅        | ✅              |
| Encrypted tokens at rest   | Documented | ?     | ?      | ?        | ?               |

See [`docs/12-competitors.md`](./docs/12-competitors.md) for full breakdown + migration guides.

## Cost

Realistically **$0/month** until you're past 100k API requests/day. Workers + D1 + Pages free tiers carry most users forever.

## Contributing

See [`docs/14-contributing.md`](./docs/14-contributing.md). Short version: PRs welcome, conventional commits, TypeScript strict mode, no secrets in diffs.

## License

MIT

## Contact

- Issues: GitHub Issues
- Security: `security@mreshank.com`
- Anything else: `hello@mreshank.com`
