<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const items = [
    { slug: 'sheetdb-alternative', name: 'SheetDB.io', body: 'The original. Expensive paid tiers, 500 req/month free.' },
    { slug: 'sheety-alternative', name: 'Sheety.co', body: '200 req/day free. No CSV export. Paid $9/mo.' },
    { slug: 'sheetson-alternative', name: 'Sheetson', body: '500 rows free. Dated UI. $12–24/mo paid.' },
    { slug: 'sheetsu-alternative', name: 'Sheetsu / APISpreadsheets', body: 'Sheetsu sunsetted; APISpreadsheets is the successor.' },
    { slug: 'google-apps-script-alternative', name: 'Google Apps Script', body: 'Ugly URLs, 20k calls/day quota. SheetsAPI is a full REST API.' },
    { slug: 'airtable-alternative', name: 'Airtable', body: 'More feature-rich but locks you into Airtable\'s product.' },
    { slug: 'nocodb-alternative', name: 'NocoDB', body: 'Open source but requires self-hosting and isn\'t Sheets-native.' }
  ];
</script>

<Seo
  title="SheetsAPI vs SheetDB, Sheety, Sheetson, Sheetsu — free alternatives"
  description="SheetsAPI is a free, open, OAuth-based alternative to SheetDB.io, Sheety.co, Sheetson.com, and APISpreadsheets. See side-by-side feature comparisons and migration guides."
  canonical="/compare"
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Compare</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Side-by-side comparisons with the paid Google-Sheets-to-API tools most teams outgrow.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-4">
  {#each items as c}
    <a href="/compare/{c.slug}" class="card p-6 hover:ring-brand-500 transition">
      <div class="font-semibold">SheetsAPI vs {c.name}</div>
      <p class="text-sm text-slate-600 mt-1">{c.body}</p>
      <div class="text-brand-600 text-sm mt-3">Read comparison →</div>
    </a>
  {/each}
</section>
