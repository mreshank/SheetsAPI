<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const posts = [
    {
      slug: 'google-sheets-rest-api-in-30-seconds',
      title: 'How to turn a Google Sheet into a REST API in 30 seconds',
      date: '2026-04-22',
      excerpt: 'A full walkthrough of connecting a sheet to SheetsAPI and making your first CRUD call.'
    },
    {
      slug: 'sheetdb-alternative-free',
      title: 'SheetDB is expensive. Here\'s the free, open alternative.',
      date: '2026-04-23',
      excerpt: 'Side-by-side comparison of pricing, features, and migration effort from SheetDB.io.'
    },
    {
      slug: 'best-use-cases-sheets-api',
      title: 'The 10 best use cases for a Google Sheets API in 2026',
      date: '2026-04-24',
      excerpt: 'Form backends, headless CMS, CRM, feature flags, mobile apps, and more.'
    }
  ];
</script>

<Seo
  title="Blog — SheetsAPI"
  description="Tutorials, comparisons, and deep dives on using Google Sheets as a REST API. Form backends, headless CMS, no-code, and production patterns."
  canonical="/blog"
/>

<section class="max-w-3xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Blog</h1>
  <p class="mt-3 text-lg text-slate-600">Tutorials, comparisons, and deep dives.</p>
</section>

<section class="max-w-3xl mx-auto px-6 pb-24 space-y-6">
  {#each posts as p}
    <a href="/blog/{p.slug}" class="card p-6 block hover:ring-brand-500 transition">
      <div class="text-xs text-slate-500">{p.date}</div>
      <h2 class="text-xl font-semibold mt-1">{p.title}</h2>
      <p class="text-sm text-slate-600 mt-2">{p.excerpt}</p>
    </a>
  {/each}
</section>
