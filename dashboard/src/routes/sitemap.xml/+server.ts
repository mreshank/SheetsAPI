export const prerender = true;

const SITE = 'https://sheets.mreshank.com';

const routes = [
  '',
  '/features',
  '/pricing',
  '/faq',
  '/status',
  '/changelog',
  '/security',
  '/docs',
  '/docs/quickstart',
  '/docs/authentication',
  '/docs/rest-api',
  '/docs/search-and-filters',
  '/docs/errors',
  '/docs/rate-limits',
  '/docs/sdks',
  '/docs/webhooks',
  '/blog',
  '/blog/google-sheets-rest-api-in-30-seconds',
  '/blog/sheetdb-alternative-free',
  '/blog/best-use-cases-sheets-api',
  '/use-cases',
  '/use-cases/form-backend',
  '/use-cases/mobile-app-backend',
  '/use-cases/cms-headless',
  '/use-cases/prototyping',
  '/use-cases/no-code-backend',
  '/use-cases/crm-integration',
  '/use-cases/landing-pages',
  '/use-cases/internal-tools',
  '/use-cases/leaderboards',
  '/use-cases/configuration-store',
  '/compare',
  '/compare/sheetdb-alternative',
  '/compare/sheety-alternative',
  '/compare/sheetson-alternative',
  '/compare/sheetsu-alternative',
  '/compare/google-apps-script-alternative',
  '/compare/airtable-alternative',
  '/compare/nocodb-alternative',
  '/templates',
  '/templates/contact-form',
  '/templates/crm',
  '/templates/event-rsvp',
  '/templates/guestbook',
  '/templates/feedback-form',
  '/templates/lead-capture',
  '/tools',
  '/tools/json-viewer',
  '/tools/csv-to-json',
  '/tools/curl-builder',
  '/tools/sheet-url-to-id',
  '/tools/openapi-generator',
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
  '/legal/dpa',
  '/legal/sla',
  '/legal/aup',
  '/legal/security',
  '/legal/subprocessors'
];

export function GET() {
  const now = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${SITE}${r}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
  )
  .join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml' } });
}
