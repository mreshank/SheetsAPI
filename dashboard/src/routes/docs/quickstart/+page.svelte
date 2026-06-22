<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="quickstart"
  title="Quickstart"
  description="Connect a Google Sheet and make your first REST API call in under 60 seconds."
>
  <h2 class="text-2xl font-semibold mt-10">1. Create a Google Sheet</h2>
  <p class="mt-2">Put your column names in row 1. Example:</p>
  <pre class="code mt-3">name  | email              | created_at
Ada   | ada@example.com    | 2026-04-21
Alan  | alan@example.com   | 2026-04-22</pre>

  <h2 class="text-2xl font-semibold mt-10">2. Connect to SheetsAPI</h2>
  <ol class="mt-2 list-decimal pl-5 space-y-1">
    <li><a href="/app" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Sign in with Google</a>.</li>
    <li>Paste your Google Sheet URL.</li>
    <li>Copy the endpoint URL from your dashboard.</li>
  </ol>

  <h2 class="text-2xl font-semibold mt-10">3. Call the API</h2>

  <h3 class="font-semibold mt-6">Read rows</h3>
  <pre class="code mt-2">curl 'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads'</pre>

  <h3 class="font-semibold mt-6">Append a row</h3>
  <pre class="code mt-2">{`curl -X POST 'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads' \\
  -H 'content-type: application/json' \\
  -d '{"name":"Grace","email":"grace@example.com","created_at":"2026-04-23"}'`}</pre>

  <h3 class="font-semibold mt-6">Update row 1</h3>
  <pre class="code mt-2">{`curl -X PUT 'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads/1' \\
  -H 'content-type: application/json' \\
  -d '{"name":"Ada Lovelace","email":"ada@example.com","created_at":"2026-04-21"}'`}</pre>

  <h3 class="font-semibold mt-6">Delete row 1</h3>
  <pre class="code mt-2">curl -X DELETE 'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads/1'</pre>

  <h2 class="text-2xl font-semibold mt-10">Next</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><a href="/docs/search-and-filters" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Search, filter, paginate</a></li>
    <li><a href="/docs/authentication" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Lock it down with API keys</a></li>
    <li><a href="/docs/errors" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Handle errors</a></li>
  </ul>
</DocLayout>
