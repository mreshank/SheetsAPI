<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  let input = $state('https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j_ABCDEFG_hijklmnop/edit#gid=0');

  let id = $derived.by(() => {
    const m = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return m ? m[1] : '';
  });

  let gid = $derived.by(() => {
    const m = input.match(/[#&]gid=(\d+)/);
    return m ? m[1] : '';
  });
</script>

<Seo
  title="Google Sheets URL to ID extractor"
  description="Paste a Google Sheets URL, get the spreadsheet ID and tab GID. Useful when registering a sheet with SheetsAPI or working with the Google Sheets API directly."
  canonical="/tools/sheet-url-to-id"
/>

<section class="max-w-3xl mx-auto px-6 py-12">
  <h1 class="text-3xl font-semibold">Sheet URL → ID</h1>
  <p class="text-slate-600 mt-2">Extract the spreadsheet ID (and tab GID) from any Google Sheets URL.</p>

  <div class="mt-8">
    <label class="text-sm font-medium">URL</label>
    <input bind:value={input} class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm" />
  </div>

  <div class="grid sm:grid-cols-2 gap-4 mt-6">
    <div class="card p-4">
      <div class="text-xs text-slate-500 uppercase">Spreadsheet ID</div>
      <div class="font-mono text-sm mt-2 break-all">{id || '—'}</div>
    </div>
    <div class="card p-4">
      <div class="text-xs text-slate-500 uppercase">Tab GID</div>
      <div class="font-mono text-sm mt-2">{gid || '—'}</div>
    </div>
  </div>
</section>
