<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const sections = [
    {
      title: 'Getting started',
      items: [
        { href: '/docs/quickstart', label: 'Quickstart', body: 'Connect your first sheet and make your first API call in 30 seconds.' },
        { href: '/docs/authentication', label: 'Authentication', body: 'OAuth with Google + optional API keys.' }
      ]
    },
    {
      title: 'Reference',
      items: [
        { href: '/docs/rest-api', label: 'REST API', body: 'All CRUD endpoints, parameters, and response formats.' },
        { href: '/docs/search-and-filters', label: 'Search & filters', body: 'Query with search, sort, pagination, field selection.' },
        { href: '/docs/errors', label: 'Errors', body: 'Status codes, error shape, debugging tips.' },
        { href: '/docs/rate-limits', label: 'Rate limits', body: 'What limits apply and how to avoid hitting them.' }
      ]
    },
    {
      title: 'Integrations',
      items: [
        { href: '/docs/sdks', label: 'SDKs', body: 'Client libraries for TypeScript and Python (roadmap).' },
        { href: '/docs/webhooks', label: 'Webhooks', body: 'Push notifications on row changes (roadmap).' }
      ]
    }
  ];
</script>

<Seo
  title="Documentation — SheetsAPI"
  description="Complete documentation for SheetsAPI: quickstart, authentication, REST API reference, search and filters, error handling, rate limits, SDKs, webhooks."
  canonical="/docs"
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Documentation</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Everything you need to build with SheetsAPI.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 space-y-10">
  {#each sections as s}
    <div>
      <h2 class="text-xl font-semibold mb-4">{s.title}</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        {#each s.items as i}
          <a href={i.href} class="card p-5 hover:ring-brand-500 transition">
            <div class="font-semibold">{i.label}</div>
            <p class="text-sm text-slate-600 mt-1">{i.body}</p>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</section>
