<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="rate-limits"
  title="Rate limits"
  description="Current and planned rate limits for SheetsAPI, plus how to avoid hitting them."
>
  <h2 class="text-2xl font-semibold mt-10">Current limits</h2>
  <p>SheetsAPI inherits the Google Sheets API default quota:</p>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><strong>300 read</strong> requests/minute per GCP project</li>
    <li><strong>300 write</strong> requests/minute per GCP project</li>
  </ul>
  <p class="mt-3">On the hosted service, these are shared across all users. In practice this is very rarely an issue — if you hit it, we can raise the quota for free via Google support.</p>

  <h2 class="text-2xl font-semibold mt-10">Cloudflare Worker limits</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><strong>100,000</strong> requests/day on the free plan (we're on paid — higher)</li>
    <li><strong>50 ms</strong> CPU time per request</li>
    <li><strong>100 MB</strong> max body size</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Google Sheets hard limits</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><strong>10 million</strong> cells per spreadsheet</li>
    <li><strong>18,278</strong> columns per tab (column ZZZ)</li>
    <li><strong>50,000</strong> characters per cell</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">How to avoid limits</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li>Cache responses client-side or at your CDN for 30–60 seconds.</li>
    <li>Use <code>?fields=</code> to reduce payload size.</li>
    <li>Batch your writes — POST accepts arrays.</li>
    <li>Use <code>?search=</code> instead of fetching everything and filtering client-side.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Planned (v0.5)</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li>Per-<code>userKey</code> rate limits via Durable Objects.</li>
    <li>Dedicated Google Cloud project per Enterprise customer.</li>
    <li>Edge caching with ETag / If-None-Match.</li>
  </ul>
</DocLayout>
