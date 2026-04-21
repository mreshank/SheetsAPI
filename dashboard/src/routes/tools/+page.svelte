<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const items = [
    { slug: 'json-viewer', name: 'JSON Viewer', body: 'Paste JSON, see a pretty-printed, collapsible tree.' },
    { slug: 'csv-to-json', name: 'CSV to JSON', body: 'Convert a CSV to an array of JSON objects using the header row.' },
    { slug: 'curl-builder', name: 'curl Builder', body: 'Build curl commands for SheetsAPI endpoints interactively.' },
    { slug: 'sheet-url-to-id', name: 'Sheet URL → ID', body: 'Extract the spreadsheet ID from a Google Sheets URL.' },
    { slug: 'openapi-generator', name: 'OpenAPI Generator', body: 'Generate an OpenAPI 3.1 spec from your Google Sheet shape.' }
  ];
</script>

<Seo
  title="Free tools for Google Sheets developers"
  description="Free utilities for working with Google Sheets as a REST API: JSON viewer, CSV to JSON converter, curl builder, spreadsheet URL parser, OpenAPI generator."
  canonical="/tools"
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Free tools</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Utilities every Sheets-API developer reaches for. All client-side, no tracking, no signup.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each items as t}
    <a href="/tools/{t.slug}" class="card p-6 hover:ring-brand-500 transition">
      <div class="font-semibold">{t.name}</div>
      <p class="text-sm text-slate-600 mt-1">{t.body}</p>
    </a>
  {/each}
</section>
