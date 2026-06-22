# 09 — Dashboard Internals

Source: [`dashboard/`](../dashboard/)

## Stack

- **SvelteKit 5** with `@sveltejs/adapter-static` (pure SPA, no SSR in production)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **TypeScript** strict mode
- No runtime server; all hosted on Cloudflare Pages

## Why static SPA

- Dashboard is a logged-in, highly dynamic experience — SSR gives no SEO benefit for `/app`.
- Marketing/docs pages are prerendered at build time (SvelteKit's static adapter).
- Eliminates origin costs (Pages bandwidth is free).
- Deploys in seconds, rollback is one click.

## File layout

```
dashboard/
├── src/
│   ├── app.html         HTML shell
│   ├── app.css          Tailwind entry + custom layer
│   ├── lib/
│   │   ├── config.ts    API_BASE from env
│   │   ├── session.ts   localStorage-backed session store
│   │   ├── api.ts       Typed client for Worker endpoints
│   │   └── seo.ts       <svelte:head> helper for meta tags
│   └── routes/
│       ├── +layout.svelte     global nav/footer
│       ├── +layout.ts         ssr:false
│       ├── +page.svelte       landing
│       ├── app/+page.svelte   authenticated dashboard
│       ├── connect/           one-click Add-on → register sheet
│       ├── features/          marketing
│       ├── pricing/
│       ├── use-cases/         + subpages
│       ├── compare/           + vs-* comparison pages
│       ├── templates/
│       ├── tools/
│       ├── docs/              public docs site
│       ├── blog/              content marketing
│       ├── faq/
│       ├── status/
│       ├── changelog/
│       └── legal/             privacy, terms, cookies, dpa, sla, aup
├── static/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml     (generated at build)
└── svelte.config.js
```

## Session model

- After OAuth callback, Worker redirects to `/app?userKey=...&email=...`
- `app/+page.svelte` reads URL params, writes to `localStorage["sheetsapi_session"]`, strips params with `history.replaceState`
- Every API call adds `x-user-key: <userKey>` header
- Logout → POST `/me/logout` (deletes user record server-side) → clear localStorage → redirect home

Caveats documented in [05 — Authentication](./05-authentication.md).

## Page catalogue

### Authenticated
- `/app` — spreadsheets, API keys, live endpoint URLs, curl examples
- `/connect?spreadsheet_id=...` — auto-register a sheet (from Add-on deep link)

### Marketing top-level
- `/` — landing
- `/features` — feature list with anchor sections
- `/pricing` — tiers (Free / Pro / Team / Self-hosted)
- `/use-cases` — index
- `/compare` — index vs major competitors
- `/templates` — ready-to-clone spreadsheet templates
- `/tools` — free utilities (JSON viewer, curl builder, OpenAPI generator)
- `/blog` — content marketing
- `/faq`
- `/status` — uptime
- `/changelog`

### Use-case subpages (individually SEO-optimized)
- `/use-cases/form-backend`
- `/use-cases/mobile-app-backend`
- `/use-cases/cms-headless`
- `/use-cases/prototyping`
- `/use-cases/no-code-backend`
- `/use-cases/crm-integration`
- `/use-cases/landing-pages`
- `/use-cases/internal-tools`
- `/use-cases/leaderboards`
- `/use-cases/configuration-store`

### Comparison subpages
- `/compare/sheetdb-alternative`
- `/compare/sheety-alternative`
- `/compare/sheetson-alternative`
- `/compare/sheetsu-alternative`
- `/compare/google-apps-script-alternative`
- `/compare/airtable-alternative`
- `/compare/nocodb-alternative`

### Docs (public)
- `/docs` — index
- `/docs/quickstart`
- `/docs/authentication`
- `/docs/rest-api`
- `/docs/search-and-filters`
- `/docs/errors`
- `/docs/rate-limits`
- `/docs/sdks`
- `/docs/webhooks`

### Legal
- `/legal/privacy`
- `/legal/terms`
- `/legal/cookies`
- `/legal/dpa`        — Data Processing Agreement (GDPR / DPDP)
- `/legal/sla`
- `/legal/aup`        — Acceptable Use Policy
- `/legal/security`   — security.txt / disclosure policy
- `/legal/subprocessors`

## SEO helpers

`$lib/seo.ts` exports a `<Seo>`-ish snippet used by every page:

```svelte
<script>
  import Seo from '$lib/Seo.svelte';
</script>
<Seo
  title="..."
  description="..."
  canonical="/page"
  og={{ image: '/og.png' }}
  schema={[/* JSON-LD blocks */]}
/>
```

Generated on every page:
- `<title>` — 50–60 chars
- `<meta description>` — 140–160 chars
- `<link rel=canonical>`
- Open Graph + Twitter Card meta
- JSON-LD `Organization`, `WebSite`, `Product`, `FAQPage`, `Article` as appropriate

A build hook generates `static/sitemap.xml` from the route tree.

## Dev

```bash
cd dashboard
npm install
cp .env.example .env
npm run dev   # http://localhost:5173
```

Point `VITE_API_BASE` at a remote or local worker.
