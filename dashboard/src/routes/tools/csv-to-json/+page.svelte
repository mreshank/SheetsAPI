<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  let input = $state('name,age,email\nAda,36,ada@example.com\nAlan,41,alan@example.com');
  let output = $state('');
  let error = $state('');

  function parse() {
    try {
      const lines = input.trim().split(/\r?\n/);
      if (lines.length < 2) throw new Error('Need at least a header row and one data row');
      const headers = lines[0].split(',').map((h) => h.trim());
      const rows = lines.slice(1).map((line) => {
        const cells = line.split(',');
        return Object.fromEntries(headers.map((h, i) => [h, (cells[i] ?? '').trim()]));
      });
      output = JSON.stringify(rows, null, 2);
      error = '';
    } catch (e) {
      error = (e as Error).message;
    }
  }

  $effect(() => {
    parse();
  });
</script>

<Seo
  title="CSV to JSON converter — free online tool"
  description="Paste CSV data, get JSON output. Uses the first row as keys. Free, client-side, no signup. Perfect for prepping data for a Google Sheets REST API."
  canonical="/tools/csv-to-json"
/>

<section class="max-w-5xl mx-auto px-6 py-12">
  <h1 class="text-3xl font-semibold">CSV to JSON</h1>
  <p style="color:rgba(255,255,255,0.4);margin-top:8px;">First row becomes the keys. Rest are data rows as objects.</p>

  <div class="grid md:grid-cols-2 gap-4 mt-8">
    <div>
      <label class="text-sm font-medium">CSV</label>
      <textarea bind:value={input} class="w-full h-96 mt-1 p-3 font-mono text-sm rounded-lg border border-slate-200"></textarea>
    </div>
    <div>
      <label class="text-sm font-medium">JSON</label>
      {#if error}
        <div class="mt-1 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      {:else}
        <pre class="h-96 mt-1 p-3 bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.7)] rounded-lg overflow-auto text-xs">{output}</pre>
      {/if}
    </div>
  </div>
</section>
