# 15 — FAQ

## General

**Q: What is SheetsAPI?**
A thin OAuth-based REST API layer over Google Sheets. Sign in with Google, register a sheet, get CRUD endpoints.

**Q: Who is this for?**
No-code builders, hackathon teams, startup prototypes, form backends, landing pages, internal tools, teachers, students, anyone who needs a backend in 30 seconds.

**Q: Is my data safe?**
Your data never leaves your Google Drive. We store only an encrypted OAuth refresh token + metadata. See [06 — Security](./06-security.md).

**Q: Will this stay free?**
The free tier is generous and here to stay (it's more than covered by Cloudflare's free tier economics). We may add paid tiers for teams, SLAs, and enterprise features — but the core will remain free for individuals.

## Technical

**Q: How fresh is my data?**
Every request hits Google Sheets live. Typical latency ~150ms. No caching by default (roadmap: optional edge cache).

**Q: Are numbers returned as strings?**
Yes, MVP returns rendered strings (matching Google Sheets' "displayed" value). Roadmap: `?format=typed` for coerced types.

**Q: What's the row indexing?**
1-based. Row 1 = first data row below the header. The header itself is row "0" (not addressable via the API).

**Q: How do I search?**
`?search=name:Ada` for substring; `?search_exact=email:a@b.com` for exact (both planned in v0.2). Richer POST search body in v0.3.

**Q: Can I use a private / shared drive sheet?**
Yes, as long as your Google account has edit access to it.

**Q: Formulas?**
They're preserved on write (`"=SUM(A1:A5)"`) and the computed value is returned on read.

**Q: What about images in cells?**
Sheets stores `=IMAGE("url")` formulas — we return the formula text. Reading rendered image URLs is roadmap.

**Q: Large sheets?**
MVP fetches the whole range. For sheets >1000 rows, use `?limit=...&offset=...` (v0.2) to paginate.

**Q: How many sheets can I connect?**
Unlimited in terms of the D1 schema. Soft limit of 1 default for the MVP's URL shape; multi-spreadsheet addressing in v0.3.

## Limits & quotas

**Q: Rate limits?**
Google Sheets API default is 300 read + 300 write requests/minute per GCP project (shared). We'll add per-`userKey` limits in v0.5.

**Q: Cloudflare Workers limits?**
100k requests/day on free plan, 10M on $5/mo. CPU time 10ms on free, 50ms on paid.

**Q: Maximum request/response size?**
Workers has a 100 MB body limit. Sheets API has a 10 MB per-request cap. Practical limit is ~10 MB.

## Authentication

**Q: How does OAuth work here?**
Full authorization code flow with refresh tokens. We never see your password. You can revoke anytime from your Google account.

**Q: What if I don't want to sign in with Google?**
You must. Google Sheets API requires Google-authenticated access. If you want a pure backend without Google, use a different tool (Supabase, Firebase, etc.).

**Q: Can I use a service account instead?**
Not via the hosted version. If you self-host, you can modify the code to use service-account auth + user-shared sheets (less friction, less portable).

**Q: What scopes do you request?**
- `openid` + `email` — identify you
- `spreadsheets` — read/write sheets you give us access to
- `drive.file` — only files our app created (for template library)

We do **not** request drive-full scope.

## Pricing

**Q: Is there a paid plan?**
Not yet. We'll introduce one in v0.8 — it'll add: higher rate limits, usage analytics, team accounts, custom domains, SLAs. The free tier stays.

**Q: Are there usage caps on free?**
Currently shared Google Sheets quota. We won't surprise you with limits — if you hit them we'll reach out before capping.

## Compliance

**Q: GDPR?**
Yes. Privacy policy at /legal/privacy, DPA at /legal/dpa, subprocessor list at /legal/subprocessors. Full DSR support via dashboard.

**Q: DPDP (India)?**
Yes — our posture covers DPDP Act requirements. See [11 — Compliance](./11-compliance.md).

**Q: SOC 2?**
Not certified yet. Posture is aligned; Type II engagement on roadmap for v1.0.

**Q: HIPAA?**
Not suitable out of the box for PHI. Self-host on a BAA'd Google Workspace + Cloudflare Enterprise to use with PHI. Healthcare bundle on roadmap.

**Q: Can I get a DPA signed?**
Yes — template at /legal/dpa, sign-on-request for teams/enterprise.

## Integrations

**Q: Zapier?**
Roadmap v0.4.

**Q: Make.com?**
Roadmap v0.4.

**Q: WordPress?**
Any HTTP client works today. Dedicated plugin on roadmap.

**Q: Webflow?**
Same — any HTTP embed works. A dedicated extension is possible (roadmap).

**Q: SDK in [language]?**
TS and Python on roadmap. Since the API is standard REST/JSON, any language works via its HTTP client.

## Self-hosting

**Q: Can I self-host?**
Yes. The worker + dashboard + schema are in this repo. Bring your own Cloudflare account + Google OAuth client + ENCRYPTION_KEY. See [07 — Deployment](./07-deployment.md).

**Q: Can I self-host on non-Cloudflare?**
The Worker currently uses Cloudflare-specific APIs (D1, Workers runtime). A Node.js port is a reasonable community project (not our priority).

## Troubleshooting

**Q: I get `{"error":"sheet has no header row"}` on POST.**
Your tab's row 1 is empty. Add headers to row 1 first.

**Q: I get `"user not found"`.**
Your `userKey` is wrong, or you were logged out (user record deleted). Sign in again.

**Q: Changes to my sheet aren't showing up.**
No client-side caching in SheetsAPI. Your app or CDN may be caching — check `Cache-Control` and browser devtools.

**Q: 401 after creating an API key.**
Any existing anonymous requests now require `Authorization: Bearer sk_...`. Update your client.

**Q: Cannot invite the app — "this app is blocked".**
Our OAuth consent screen is unverified while in beta. Contact us to be added as a test user, or self-host.

**Q: `invalid_grant` errors.**
Your refresh token was revoked (by you, or Google). Re-connect via the dashboard.
