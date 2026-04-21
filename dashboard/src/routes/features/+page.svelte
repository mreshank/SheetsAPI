<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import { softwareApplicationSchema } from '$lib/schema';

  const features = [
    { title: 'CRUD out of the box', body: 'GET, POST, PUT, DELETE on every tab. Header row becomes JSON keys. Zero configuration.' },
    { title: 'OAuth, not sharing', body: 'Sign in with Google once. We never need you to share a spreadsheet with a service account.' },
    { title: 'Search & filter', body: '?search=field:value, ?search_exact=field:value. Case-insensitive substring matching by default.' },
    { title: 'Sort & pagination', body: '?sort=-created_at, ?limit=50, ?offset=100. Every list endpoint supports them.' },
    { title: 'Field selection', body: '?fields=name,email to return only the columns you need. Smaller payloads, faster clients.' },
    { title: 'Multiple output formats', body: 'JSON (default), CSV, TSV, XML, JSONP — one ?format= query parameter away.' },
    { title: 'API keys when you want them', body: 'Endpoints are public until you create your first key. Then Bearer auth is enforced automatically.' },
    { title: 'Workspace Add-on', body: 'Extensions → SheetsAPI inside any Sheet. Copy endpoint URLs without leaving your tab.' },
    { title: 'CORS by default', body: 'Fetch from any origin. No preflight headaches. Browser apps work instantly.' },
    { title: 'Encrypted tokens at rest', body: 'AES-GCM-256 on refresh tokens. Key stored separately from the database.' },
    { title: 'Free tier that scales', body: 'Cloudflare Workers + D1 covers ~3M requests/month at $0. No surprise bills.' },
    { title: 'Self-hostable', body: 'Clone the repo, bring your own Cloudflare and Google OAuth client. Total control.' },
    { title: 'Webhooks (coming soon)', body: 'POST to your URL on any row change. Build live dashboards without polling.' },
    { title: 'OpenAPI spec (coming soon)', body: 'Auto-generated spec per spreadsheet. Import into Postman, generate clients.' },
    { title: 'SDKs (coming soon)', body: 'TypeScript and Python clients with full typing for your sheet shape.' },
    { title: 'Workspace-native', body: 'Built to feel like a first-party Google Workspace tool, not an external service.' }
  ];
</script>

<Seo
  title="Features — everything in SheetsAPI"
  description="CRUD, search, sort, pagination, field selection, CSV/JSON/XML/TSV output, OAuth, API keys, webhooks, and Workspace Add-on. Everything you need to turn a Google Sheet into a REST API."
  canonical="/features"
  schema={[softwareApplicationSchema]}
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Features</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Everything you need to ship a production-grade backend on top of Google Sheets — without standing up a server.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each features as f}
    <div class="card p-5">
      <div class="font-semibold">{f.title}</div>
      <p class="text-sm text-slate-600 mt-2">{f.body}</p>
    </div>
  {/each}
</section>

<section class="max-w-5xl mx-auto px-6 pb-24">
  <div class="card p-8 text-center bg-brand-50">
    <h2 class="text-2xl font-semibold">Ready to try it?</h2>
    <p class="mt-2 text-slate-600">Connect your first sheet in 30 seconds.</p>
    <a href="/app" class="btn-primary mt-6 inline-flex">Sign in with Google</a>
  </div>
</section>
