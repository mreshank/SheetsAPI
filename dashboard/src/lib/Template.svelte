<script lang="ts">
  import Seo from './Seo.svelte';
  import { breadcrumbSchema } from './schema';

  let {
    slug,
    title,
    description,
    tagline,
    columns,
    sampleRow,
    code
  }: {
    slug: string;
    title: string;
    description: string;
    tagline: string;
    columns: { name: string; type: string; notes?: string }[];
    sampleRow: Record<string, string>;
    code: string;
  } = $props();

  const canonical = `/templates/${slug}`;
  const schema = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Templates', url: 'https://sheets.mreshank.com/templates' },
      { name: title, url: `https://sheets.mreshank.com${canonical}` }
    ])
  ];
</script>

<Seo {title} {description} {canonical} {schema} />

<article class="max-w-4xl mx-auto px-6 py-16">
  <nav class="text-sm text-slate-500 mb-4">
    <a href="/templates" class="hover:text-slate-900">Templates</a> / {title}
  </nav>
  <h1 class="text-4xl font-semibold tracking-tight">{title}</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">{tagline}</p>

  <div class="mt-10 card p-6">
    <h2 class="font-semibold">Schema</h2>
    <div class="mt-3 overflow-hidden rounded-lg border border-slate-200">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 border-b border-slate-200 text-left"><tr><th class="p-2">Column</th><th class="p-2">Type</th><th class="p-2">Notes</th></tr></thead>
        <tbody class="divide-y divide-slate-100">
          {#each columns as c}
            <tr><td class="p-2 font-mono text-xs">{c.name}</td><td class="p-2">{c.type}</td><td class="p-2 text-slate-500">{c.notes ?? ''}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
    <h3 class="font-semibold mt-5 text-sm">Sample row</h3>
    <pre class="code mt-2">{JSON.stringify(sampleRow, null, 2)}</pre>
  </div>

  <div class="mt-6 card p-6">
    <h2 class="font-semibold">How to use</h2>
    <ol class="mt-3 space-y-2 text-sm text-slate-700 list-decimal pl-5">
      <li>Open Google Sheets and create a new spreadsheet.</li>
      <li>Paste these column names into row 1.</li>
      <li><a href="/app" class="text-brand-600 underline">Sign in to SheetsAPI</a> and paste your sheet URL.</li>
      <li>Use the example code below to read or write rows.</li>
    </ol>
    <pre class="code mt-4">{code}</pre>
  </div>

  <div class="mt-14 card p-8 bg-brand-50 text-center">
    <div class="font-semibold">Use this template</div>
    <p class="text-sm text-slate-600 mt-1">Connect a sheet and start building.</p>
    <a href="/app" class="btn-primary mt-4 inline-flex">Get started free</a>
  </div>
</article>
