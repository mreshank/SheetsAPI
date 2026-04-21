<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  let input = $state('{\n  "name": "Ada",\n  "age": 36\n}');
  let output = $state('');
  let error = $state('');

  function format() {
    try {
      output = JSON.stringify(JSON.parse(input), null, 2);
      error = '';
    } catch (e) {
      error = (e as Error).message;
      output = '';
    }
  }

  function minify() {
    try {
      output = JSON.stringify(JSON.parse(input));
      error = '';
    } catch (e) {
      error = (e as Error).message;
    }
  }

  $effect(() => {
    format();
  });
</script>

<Seo
  title="JSON Viewer — free online JSON formatter"
  description="Paste JSON, get a pretty-printed tree. Minify, format, validate. Free, client-side, no tracking. Works on SheetsAPI responses or any JSON data."
  canonical="/tools/json-viewer"
/>

<section class="max-w-5xl mx-auto px-6 py-12">
  <h1 class="text-3xl font-semibold">JSON Viewer</h1>
  <p class="text-slate-600 mt-2">Paste JSON, format it, or minify it. All client-side — your data never leaves the browser.</p>

  <div class="grid md:grid-cols-2 gap-4 mt-8">
    <div>
      <label class="text-sm font-medium">Input</label>
      <textarea bind:value={input} class="w-full h-96 mt-1 p-3 font-mono text-sm rounded-lg border border-slate-200"></textarea>
      <div class="flex gap-2 mt-2">
        <button class="btn-primary" onclick={format}>Format</button>
        <button class="btn-secondary" onclick={minify}>Minify</button>
      </div>
    </div>
    <div>
      <label class="text-sm font-medium">Output</label>
      {#if error}
        <div class="mt-1 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      {:else}
        <pre class="h-96 mt-1 p-3 bg-slate-900 text-slate-100 rounded-lg overflow-auto text-xs">{output}</pre>
      {/if}
    </div>
  </div>
</section>
