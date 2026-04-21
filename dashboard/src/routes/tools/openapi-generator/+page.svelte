<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  let userKey = $state('YOUR_KEY');
  let sheetName = $state('leads');
  let columns = $state('name,email,company,stage');

  let spec = $derived.by(() => {
    const cols = columns.split(',').map((c) => c.trim()).filter(Boolean);
    const schema = {
      type: 'object',
      properties: Object.fromEntries(cols.map((c) => [c, { type: 'string' }]))
    };
    return JSON.stringify({
      openapi: '3.1.0',
      info: { title: `SheetsAPI — ${sheetName}`, version: '1.0.0' },
      servers: [{ url: 'https://sheets.mreshank.com' }],
      paths: {
        [`/api/spreadsheets/${userKey}/${sheetName}`]: {
          get: { summary: 'List rows', responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: schema } } } } } },
          post: { summary: 'Append row(s)', requestBody: { content: { 'application/json': { schema: { oneOf: [schema, { type: 'array', items: schema }] } } } }, responses: { '200': { description: 'OK' } } }
        },
        [`/api/spreadsheets/${userKey}/${sheetName}/{row}`]: {
          parameters: [{ name: 'row', in: 'path', required: true, schema: { type: 'integer' } }],
          get: { summary: 'Get row', responses: { '200': { description: 'OK', content: { 'application/json': { schema } } } } },
          put: { summary: 'Update row', requestBody: { content: { 'application/json': { schema } } }, responses: { '200': { description: 'OK' } } },
          delete: { summary: 'Delete row', responses: { '200': { description: 'OK' } } }
        }
      }
    }, null, 2);
  });

  function copy() {
    navigator.clipboard.writeText(spec);
  }
</script>

<Seo
  title="OpenAPI spec generator for Google Sheets"
  description="Generate an OpenAPI 3.1 spec for your Google Sheet exposed via SheetsAPI. Import into Postman, Swagger, Insomnia, or generate clients in any language."
  canonical="/tools/openapi-generator"
/>

<section class="max-w-5xl mx-auto px-6 py-12">
  <h1 class="text-3xl font-semibold">OpenAPI Generator</h1>
  <p class="text-slate-600 mt-2">Generate an OpenAPI 3.1 spec for your sheet. Import anywhere.</p>

  <div class="card p-6 mt-8 grid sm:grid-cols-3 gap-3">
    <div><label class="text-sm font-medium">userKey</label><input bind:value={userKey} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm" /></div>
    <div><label class="text-sm font-medium">Sheet name</label><input bind:value={sheetName} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm" /></div>
    <div><label class="text-sm font-medium">Columns (CSV)</label><input bind:value={columns} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm" /></div>
  </div>

  <div class="mt-6">
    <div class="flex justify-between items-center">
      <div class="text-sm font-medium">OpenAPI 3.1</div>
      <button class="btn-secondary" onclick={copy}>Copy</button>
    </div>
    <pre class="code mt-2 max-h-96 overflow-auto">{spec}</pre>
  </div>
</section>
