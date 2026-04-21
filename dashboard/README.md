# SheetsAPI Dashboard

SvelteKit 5 + Tailwind v4 static site. Hosts `sheets.mreshank.com` — marketing pages, docs, interactive tools, and the authenticated dashboard where users connect Google Sheets, copy endpoint URLs, and manage API keys.

## Stack

| Layer       | Tech                                                              |
| ----------- | ----------------------------------------------------------------- |
| Framework   | SvelteKit 5 with Svelte 5 runes                                   |
| Styling     | Tailwind CSS v4 via `@tailwindcss/vite`, `@tailwindcss/typography`, `@tailwindcss/forms` |
| Markdown    | `mdsvex` (`.md`, `.svx` render as Svelte components)              |
| Adapter     | `@sveltejs/adapter-static` → outputs to `build/`                  |
| Host        | Cloudflare Pages                                                  |

## Prerequisites

- Node 20+
- npm 10+
- A deployed SheetsAPI Worker (see [`../worker/README.md`](../worker/README.md))
- Cloudflare account with `wrangler` CLI for deploy

## Dev

```bash
cd dashboard
npm install
cp .env.example .env
npm run dev
# http://localhost:5173
```

Only env var read by the dashboard: `VITE_API_BASE`. Point it at your Worker.

## Build & deploy

```bash
npm run build              # generates ./build
npm run deploy             # wrangler pages deploy build --project-name=sheetsapi-dashboard
```

Attach the custom domain in Cloudflare dashboard → Pages → Custom domains → `sheets.mreshank.com`.

## Architecture

- **Pure SPA** in production — `adapter-static` with `fallback: index.html` so deep links like `/compare/sheetdb-alternative` serve the SPA shell and let the router handle routing.
- **Prerendered marketing pages** at build time for SEO. Enabled via `export const prerender = true` in `src/routes/+layout.ts`.
- **Authenticated routes** (`/app`, `/connect`) explicitly opt out with `prerender = false; ssr = false` in their `+layout.ts`.
- **Session** in `localStorage` as `{ userKey, email }`. Set after OAuth callback; read by every API call as an `x-user-key` header.
- **Sitemap** generated at build time by `src/routes/sitemap.xml/+server.ts`.

## Directory map

```
dashboard/
├── src/
│   ├── app.css          Tailwind entry + theme tokens + utility classes
│   ├── app.d.ts         App.Error typed; Session type exported
│   ├── app.html         HTML shell
│   ├── lib/
│   │   ├── Seo.svelte           Title, meta, OG, Twitter, JSON-LD injector
│   │   ├── UseCase.svelte       Template for /use-cases/* subpages
│   │   ├── Compare.svelte       Template for /compare/* subpages
│   │   ├── Template.svelte      Template for /templates/* subpages
│   │   ├── DocLayout.svelte     Layout for /docs/* subpages (sidebar)
│   │   ├── BlogPost.svelte      Layout for /blog/* subpages
│   │   ├── api.ts               Typed client for the Worker
│   │   ├── config.ts            VITE_API_BASE
│   │   ├── session.ts           localStorage-backed writable store
│   │   └── schema.ts            JSON-LD helpers (Organization/FAQ/Breadcrumb/Article)
│   └── routes/
│       ├── +layout.svelte       global nav/footer
│       ├── +layout.ts           prerender=true, ssr=true
│       ├── +page.svelte         landing
│       ├── app/                 authenticated dashboard (SPA)
│       ├── connect/             Add-on deep link handler (SPA)
│       ├── features/  pricing/  faq/  status/  changelog/  security/
│       ├── use-cases/           index + 10 subpages
│       ├── compare/             index + 7 competitor pages
│       ├── templates/           index + 6 schemas
│       ├── tools/               5 client-side utilities
│       ├── docs/                index + 8 reference pages
│       ├── blog/                index + 3 seed posts
│       ├── legal/               privacy, terms, cookies, dpa, sla, aup, security, subprocessors
│       ├── privacy/ | terms/    redirects to /legal/*
│       └── sitemap.xml/+server.ts
└── static/
    ├── robots.txt
    ├── favicon.svg
    ├── og-default.svg
    └── .well-known/security.txt
```

## SEO

- Unique `<title>`, `<meta description>`, `<link rel=canonical>` per page via `Seo.svelte`
- Open Graph + Twitter Card on every page
- JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage, Article, BreadcrumbList
- Sitemap at `/sitemap.xml`
- `robots.txt` allows marketing, blocks `/app` + `/connect`
- `security.txt` at `/.well-known/security.txt`
- Replace `og-default.svg` with a real 1200×630 PNG before public launch for best social previews

## Gotchas

- The project was initially scaffolded with `sv create --template library`. `package.json` and `svelte.config.js` were converted to application-mode. If you rerun `sv create`, expect to re-apply these changes.
- `moduleResolution` is `bundler` in `tsconfig.json` — required for SvelteKit's virtual `$app/*` and `$lib/*` resolution with Vite.
- Any code that touches `window`, `localStorage`, or `fetch` during render must run inside `onMount` or `$effect` — prerender has no browser globals.
- `mdsvex` is wired up. Create `src/routes/blog/my-post/+page.md` and it compiles like a Svelte page.
