# 17 — SEO & Marketing Strategy

## Target keywords (primary)

| Intent                     | Keyword                                      | Difficulty | Priority |
| -------------------------- | -------------------------------------------- | ---------- | -------- |
| Solution                   | google sheets rest api                       | Medium     | P0       |
| Solution                   | google sheets as api                         | Medium     | P0       |
| Solution                   | turn spreadsheet into api                    | Low        | P0       |
| Solution                   | json api from google sheets                  | Medium     | P1       |
| Alternative                | sheetdb alternative                          | Low        | P0       |
| Alternative                | sheety alternative                           | Low        | P0       |
| Alternative                | sheetson alternative                         | Low        | P1       |
| Comparison                 | sheetdb vs sheety                            | Low        | P1       |
| Use case                   | form backend google sheets                   | Low        | P1       |
| Use case                   | google sheets cms                            | Medium     | P1       |
| Use case                   | google sheets database free                  | High       | P2       |
| Commercial                 | free google sheets api                       | High       | P1       |
| Tool                       | google sheet to json converter               | Low        | P2       |
| Tool                       | csv to rest api                              | Low        | P2       |
| Informational              | how to make google sheet public api          | Low        | P1       |
| Informational              | google sheets api tutorial                   | High       | P2       |

## Page → keyword mapping

### Transactional (high intent)
- `/` → "google sheets rest api", "google sheets as api"
- `/features` → feature keywords
- `/pricing` → "free google sheets api", "google sheets api pricing"

### Comparison (high convert)
- `/compare/sheetdb-alternative` → "sheetdb alternative", "sheetdb vs"
- `/compare/sheety-alternative` → "sheety alternative"
- `/compare/sheetson-alternative` → "sheetson alternative"
- `/compare/sheetsu-alternative` → "sheetsu alternative", "apispreadsheets alternative"
- `/compare/google-apps-script-alternative` → "apps script vs"
- `/compare/airtable-alternative` → long-tail
- `/compare/nocodb-alternative` → long-tail

### Use case (discovery)
- `/use-cases/form-backend` → "form backend google sheets"
- `/use-cases/mobile-app-backend` → "mobile backend google sheets"
- `/use-cases/cms-headless` → "google sheets cms", "headless cms sheets"
- `/use-cases/prototyping` → "mvp backend"
- `/use-cases/no-code-backend` → "no code backend"
- `/use-cases/crm-integration` → "google sheets crm api"
- `/use-cases/landing-pages` → "landing page backend"
- `/use-cases/internal-tools` → "internal tools google sheets"
- `/use-cases/leaderboards` → "game leaderboard api"
- `/use-cases/configuration-store` → "feature flags google sheets"

### Informational (SEO + brand)
- `/docs` → docs navigation
- `/docs/quickstart` → "google sheets api tutorial"
- `/docs/authentication` → "google sheets api oauth"
- `/docs/rest-api` → reference
- `/blog/*` → long-tail content (see editorial calendar)

### Tools (link magnets)
- `/tools/json-viewer` → "json viewer online"
- `/tools/curl-builder` → "curl builder"
- `/tools/csv-to-json` → "csv to json"
- `/tools/sheet-url-to-id` → utility
- `/tools/openapi-generator` → "openapi from sheet"

### Templates (link magnets)
- `/templates/contact-form` → "contact form template"
- `/templates/crm` → "crm spreadsheet template"
- `/templates/event-rsvp` → "event rsvp template"
- `/templates/guestbook`
- `/templates/feedback-form`
- `/templates/lead-capture`

## Technical SEO checklist

- [x] Every page has unique title, description, canonical
- [x] Open Graph + Twitter Card meta
- [x] JSON-LD: Organization, WebSite, SoftwareApplication/Product, FAQPage, Article
- [x] Sitemap generated at build (`/sitemap.xml`)
- [x] `robots.txt` — allow marketing, disallow `/app`, `/connect`
- [x] Clean URL structure (no `?` params for content pages)
- [ ] `hreflang` (future — once we localize)
- [x] Semantic HTML (`<article>`, `<section>`, `<nav>`)
- [x] Descriptive alt text on all images
- [x] No render-blocking JS for above-the-fold content
- [x] LCP <2.5s (static SvelteKit → Pages edge)
- [ ] Structured FAQ schema on FAQ and use-case pages
- [ ] Breadcrumbs with BreadcrumbList JSON-LD

## Content calendar — first 90 days

### Month 1 (product launch content)
1. "How to turn a Google Sheet into a REST API in 30 seconds"
2. "SheetDB is expensive. Here's the free, open alternative."
3. "The 10 best use cases for a Google Sheets API in 2026"
4. "Form backends: Google Sheets vs Formspree vs Netlify Forms"

### Month 2 (tutorials)
5. "Build a contact form with React + Google Sheets"
6. "Next.js + Google Sheets: a headless CMS in 15 minutes"
7. "Feature flags without a database: use Google Sheets"
8. "Leaderboard API for your mobile game using Google Sheets"

### Month 3 (deep dives)
9. "Why we built SheetsAPI on Cloudflare Workers + D1"
10. "OAuth without the headache: how SheetsAPI authenticates"
11. "Making Google Sheets HIPAA-compliant: what you need"
12. "Is Google Sheets fast enough for production?"

## Link-building strategy

- **Template libraries** — our `/templates/*` pages are natively shareable
- **Free tools** — `/tools/*` earn inbound links from SEO content writers
- **Open source** — GitHub repo with clear README attracts dev audience
- **HackerNews launch** — v0.7 milestone
- **Product Hunt launch** — v0.7 milestone
- **Comparison posts** on Dev.to, Medium cross-posts
- **Reddit** /r/googlesheets, /r/webdev, /r/nocode (genuine participation, not spam)

## Analytics & measurement

- Cloudflare Web Analytics (free, privacy-preserving, cookieless) on marketing pages
- No third-party trackers on dashboard
- Goal tracking: `/oauth/start` redirect = signup intent
- Weekly review: top queries → gap-fill with content

## Anti-SEO

Don't do:
- Keyword stuffing
- Doorway pages
- Duplicate content across `/compare` pages — each is unique
- Fake reviews / testimonials
- AI-slop blog posts — every article has a human-authored angle or data point
