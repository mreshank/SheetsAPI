<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="errors"
  title="Errors"
  description="HTTP status codes, error shape, and debugging tips for SheetsAPI."
>
  <h2 class="text-2xl font-semibold mt-10">Error shape</h2>
  <pre class="code mt-2">{`{ "error": "human-readable message" }`}</pre>

  <h2 class="text-2xl font-semibold mt-10">Status codes</h2>
  <table class="w-full text-sm mt-3 card overflow-hidden">
    <thead class="bg-slate-50 border-b border-slate-200 text-left"><tr><th class="p-3">Code</th><th class="p-3">Meaning</th></tr></thead>
    <tbody class="divide-y divide-slate-100">
      <tr><td class="p-3 font-mono">200</td><td class="p-3">OK</td></tr>
      <tr><td class="p-3 font-mono">400</td><td class="p-3">Bad request — malformed body, bad row index, missing header row</td></tr>
      <tr><td class="p-3 font-mono">401</td><td class="p-3">Missing or invalid API key (when keys are required)</td></tr>
      <tr><td class="p-3 font-mono">404</td><td class="p-3">User, spreadsheet, tab, or row not found</td></tr>
      <tr><td class="p-3 font-mono">429</td><td class="p-3">Google Sheets quota exceeded (300/min/project)</td></tr>
      <tr><td class="p-3 font-mono">500</td><td class="p-3">Upstream failure (Sheets API error, D1 error). Check <code>cf-ray</code> header in response for support.</td></tr>
    </tbody>
  </table>

  <h2 class="text-2xl font-semibold mt-10">Common issues</h2>

  <h3 class="font-semibold mt-6">"sheet has no header row"</h3>
  <p>Row 1 of your tab is empty. Put your column names in row 1.</p>

  <h3 class="font-semibold mt-6">"user not found"</h3>
  <p>Your <code>userKey</code> is wrong or you've signed out. Reconnect from the dashboard.</p>

  <h3 class="font-semibold mt-6">"invalid_grant" in 500 error</h3>
  <p>Your Google-side OAuth token was revoked. Sign in again from the dashboard.</p>

  <h3 class="font-semibold mt-6">Empty array when rows exist</h3>
  <p>Check that you're using the exact tab name (case-sensitive) and that the header row isn't blank.</p>
</DocLayout>
