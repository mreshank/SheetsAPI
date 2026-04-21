# 01 — Overview

## What is SheetsAPI

SheetsAPI turns any Google Sheet into a production-grade JSON REST API. Sign in with Google, register a spreadsheet, and get immediate CRUD endpoints:

```
GET    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}
GET    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
POST   https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}
PUT    https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
DELETE https://sheets.mreshank.com/api/spreadsheets/{userKey}/{sheetName}/{row}
```

The first row of every tab is treated as the JSON schema. Values are returned as an array of objects.

## Who is it for

| Persona              | Use case                                                  |
| -------------------- | --------------------------------------------------------- |
| No-code / low-code   | CMS for a static site, form backend, lead capture         |
| Marketing teams      | Landing page data without standing up a backend           |
| Startup founders     | Prototype APIs before committing to a database            |
| Mobile developers    | Lightweight backend for content, configs, leaderboards    |
| Agencies & freelancers | Let non-technical clients edit production content in Sheets |
| Internal tooling     | Admin dashboards, feature flags, A/B config, pricing pages |
| Educators & students | Teach REST APIs without server infrastructure             |

## What it replaces

SheetsAPI is designed as a **drop-in superset** of these tools:

- [SheetDB.io](https://sheetdb.io) — paid, closed source
- [Sheety.co](https://sheety.co) — paid, monthly limits
- [Sheetson.com](https://sheetson.com) — paid, rate limits
- [Sheetsu / APISpreadsheets](https://www.apispreadsheets.com) — paid, quotas

SheetsAPI: **free tier generous, open architecture, self-host-friendly, OAuth-based (no service-account sharing dance).**

See [12 — Competitors](./12-competitors.md) for feature matrix and migration guides.

## Core principles

1. **Your data stays in your Google account.** We store only encrypted refresh tokens + metadata.
2. **Free-tier friendly infrastructure.** Cloudflare Workers + D1 + Pages covers almost all real-world usage at $0.
3. **No vendor lock-in.** Open architecture; you can self-host the Worker on your own Cloudflare account against your own Google OAuth client.
4. **Progressive auth.** Endpoints are public by default; require API keys only when you want to.
5. **Works everywhere Google Sheets works.** International keyboards, shared drives, Workspace accounts all supported.

## Three-piece product

| Piece      | Tech                    | URL                    | Purpose                                    |
| ---------- | ----------------------- | ---------------------- | ------------------------------------------ |
| Worker     | Cloudflare Workers + D1 | sheets.mreshank.com    | REST API + OAuth backend                   |
| Dashboard  | SvelteKit + Tailwind v4 | sheets.mreshank.com       | Marketing site + user control plane        |
| Add-on     | Google Apps Script      | Marketplace listing    | `Extensions → SheetsAPI` inside any Sheet  |

See [02 — Architecture](./02-architecture.md).
