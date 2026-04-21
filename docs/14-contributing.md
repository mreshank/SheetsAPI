# 14 — Contributing

## Repo layout

Monorepo with three deployable units:

```
SheetsAPI/
├── worker/         Cloudflare Worker (Hono + D1)
├── dashboard/      SvelteKit 5 + Tailwind v4
├── addon/          Google Apps Script
└── docs/           This documentation
```

## Prerequisites

- Node 20+
- npm 10+
- Cloudflare account (free tier OK)
- Google Cloud account with OAuth client for dev
- `wrangler` CLI (`npm i -g wrangler`)

## Local setup

```bash
git clone https://github.com/mreshank/sheetsapi
cd sheetsapi

# Worker
cd worker
npm install
wrangler d1 create sheetsapi-dev       # one-time
wrangler d1 execute sheetsapi-dev --file=./schema.sql --local
# Edit wrangler.toml with dev D1 ID
# Create .dev.vars with your dev GOOGLE_CLIENT_SECRET and ENCRYPTION_KEY
wrangler dev

# Dashboard (separate terminal)
cd ../dashboard
npm install
cp .env.example .env
# Set VITE_API_BASE to your wrangler dev URL
npm run dev
```

## Code standards

- **TypeScript strict mode** everywhere
- **No `any`** — use `unknown` + type guards
- **Prepared statements only** for D1 (`db.prepare(...).bind(...)`)
- **No console.log in production paths** — use `console.error` only for unexpected errors
- **Comments only when the why is non-obvious** — function/variable names should carry the what

## Commit style

Conventional commits:

```
feat: add search query parameter to GET list
fix: off-by-one in row deletion
docs: clarify refresh token encryption scheme
chore: bump Hono to 4.7
```

## PR checklist

- [ ] Tests added or justified absence
- [ ] `tsc --noEmit` passes
- [ ] `svelte-check` passes (dashboard)
- [ ] No secrets in diff
- [ ] Docs updated if behavior changes
- [ ] Changelog entry (`docs/changelog.md`, roadmap)

## Testing (wishlist)

MVP doesn't ship tests. Priority order:

1. **Worker unit** — `rows.ts`, `crypto.ts` (pure functions, easy)
2. **Worker integration** — Vitest + `@cloudflare/vitest-pool-workers` against ephemeral D1, mocking Google with MSW
3. **Dashboard component** — Svelte 5 + Vitest; Testing Library
4. **E2E** — Playwright driving the OAuth flow against a dev Google test user

## Architecture decision records

Start an `adr/` folder for significant changes:

```
adr/
  0001-use-hono-not-itty-router.md
  0002-d1-instead-of-durable-objects.md
  0003-localstorage-session-mvp.md
```

## Release process

1. Merge to `main`
2. `worker/`: CI deploys on push (GitHub Actions → `wrangler deploy`)
3. `dashboard/`: CI deploys to Pages on push
4. `addon/`: manual — paste into Apps Script, test deployment
5. Tag release: `git tag v0.2.0 && git push --tags`
6. Update `docs/changelog.md` and `dashboard/src/routes/changelog/+page.svelte`

## Reporting issues

- Bugs: GitHub Issues with reproduction steps, expected vs actual, request ID from `cf-ray` header if available
- Security: email `security@mreshank.com` — do not file publicly
- Feature requests: GitHub Discussions

## Code of conduct

Be kind. Assume good faith. We follow the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
