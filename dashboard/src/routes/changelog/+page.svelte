<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const releases = [
    {
      version: 'v0.2',
      date: '2026-04-28',
      title: 'Query features',
      changes: [
        'Added ?limit, ?offset pagination on GET list',
        'Added ?search=field:value substring filter',
        'Added ?search_exact=field:value exact filter',
        'Added ?sort=field and ?sort=-field',
        'Added ?fields=a,b,c field selection',
        'Added ?format=csv|tsv|xml|jsonp',
        'Max limit capped at 1000 per request'
      ]
    },
    {
      version: 'v0.1',
      date: '2026-04-21',
      title: 'MVP launch',
      changes: [
        'Google OAuth 2.0 flow',
        'D1 schema: users, spreadsheets, api_keys, oauth_states',
        'CRUD endpoints (GET list, GET row, POST, PUT, DELETE)',
        'Progressive API-key enforcement',
        'SvelteKit + Tailwind v4 dashboard',
        'Google Apps Script Add-on',
        'Full documentation site',
        '16 SEO-optimized marketing pages'
      ]
    }
  ];
</script>

<Seo
  title="Changelog — SheetsAPI"
  description="Release notes and version history for SheetsAPI. New features, bug fixes, and deprecations."
  canonical="/changelog"
/>

<article class="max-w-3xl mx-auto px-6 py-16">
  <h1 class="text-3xl font-semibold">Changelog</h1>
  <p class="text-slate-600 mt-2">What's new in SheetsAPI.</p>

  <div class="mt-12 space-y-10">
    {#each releases as r}
      <section>
        <div class="flex items-baseline gap-3">
          <h2 class="text-xl font-semibold">{r.version}</h2>
          <span class="text-sm text-slate-500">{r.date}</span>
        </div>
        <div class="text-slate-700 font-medium mt-1">{r.title}</div>
        <ul class="mt-3 space-y-1 text-sm text-slate-600 list-disc pl-5">
          {#each r.changes as c}
            <li>{c}</li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>

  <div class="mt-16 card p-6 bg-slate-50">
    <h3 class="font-semibold">What's next</h3>
    <p class="text-sm text-slate-600 mt-2">See our full <a href="/docs" class="text-brand-600 underline">roadmap</a> for planned features through v1.0.</p>
  </div>
</article>
