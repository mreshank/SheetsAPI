<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  let method = $state<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  let userKey = $state('YOUR_KEY');
  let sheetName = $state('leads');
  let row = $state('');
  let apiKey = $state('');
  let body = $state('{"name":"Ada","email":"ada@example.com"}');

  let url = $derived.by(() => {
    const base = `https://sheets.mreshank.com/api/spreadsheets/${userKey}/${encodeURIComponent(sheetName)}`;
    return row ? `${base}/${row}` : base;
  });

  let curl = $derived.by(() => {
    const parts = [`curl -X ${method} '${url}'`];
    if (apiKey) parts.push(`  -H 'authorization: Bearer ${apiKey}'`);
    if (method === 'POST' || method === 'PUT') {
      parts.push(`  -H 'content-type: application/json'`);
      parts.push(`  -d '${body}'`);
    }
    return parts.join(' \\\n');
  });

  function copy() {
    navigator.clipboard.writeText(curl);
  }
</script>

<Seo
  title="curl Builder for SheetsAPI"
  description="Build curl commands for SheetsAPI endpoints interactively. Set method, user key, sheet name, row, auth, and body. Copy the result with one click."
  canonical="/tools/curl-builder"
/>

<section class="max-w-4xl mx-auto px-6 py-12">
  <h1 class="text-3xl font-semibold">curl Builder</h1>

  <div class="card p-6 mt-8 space-y-4">
    <div>
      <label class="text-sm font-medium">Method</label>
      <select bind:value={method} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200">
        <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
      </select>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="text-sm font-medium">userKey</label>
        <input bind:value={userKey} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono" />
      </div>
      <div>
        <label class="text-sm font-medium">Sheet name</label>
        <input bind:value={sheetName} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono" />
      </div>
    </div>
    <div>
      <label class="text-sm font-medium">Row (optional)</label>
      <input bind:value={row} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono" placeholder="e.g. 1" />
    </div>
    <div>
      <label class="text-sm font-medium">API key (optional)</label>
      <input bind:value={apiKey} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono" placeholder="sk_..." />
    </div>
    {#if method === 'POST' || method === 'PUT'}
      <div>
        <label class="text-sm font-medium">Body (JSON)</label>
        <textarea bind:value={body} class="w-full h-32 mt-1 p-3 font-mono text-sm rounded-lg border border-slate-200"></textarea>
      </div>
    {/if}
  </div>

  <div class="mt-6">
    <div class="flex items-center justify-between">
      <div class="text-sm font-medium">Generated command</div>
      <button class="btn-secondary" onclick={copy}>Copy</button>
    </div>
    <pre class="code mt-2">{curl}</pre>
  </div>
</section>
