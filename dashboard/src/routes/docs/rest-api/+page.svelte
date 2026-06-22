<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="rest-api"
  title="REST API reference"
  description="All CRUD endpoints, request formats, and response shapes for SheetsAPI."
>
  <h2 class="text-2xl font-semibold mt-10">Base URL</h2>
  <pre class="code mt-2">https://sheets.mreshank.com</pre>

  <h2 class="text-2xl font-semibold mt-10">URL shape</h2>
  <pre class="code mt-2">{`/api/spreadsheets/{userKey}/{sheetName}         # list / append
/api/spreadsheets/{userKey}/{sheetName}/{row}   # get / update / delete`}</pre>

  <h2 class="text-2xl font-semibold mt-10">Endpoints</h2>

  <h3 class="font-semibold mt-6">GET — list rows</h3>
  <pre class="code mt-2">GET /api/spreadsheets/{'{userKey}'}/{'{sheetName}'}</pre>
  <p class="mt-2">Returns an array of objects keyed by the header row. See <a href="/docs/search-and-filters" style="color:rgba(255,255,255,0.7);text-decoration:underline;">search & filters</a> for query parameters.</p>

  <h3 class="font-semibold mt-6">GET — one row</h3>
  <pre class="code mt-2">GET /api/spreadsheets/{'{userKey}'}/{'{sheetName}'}/{'{row}'}</pre>
  <p class="mt-2">1-based row index. Row 1 = first data row below the header.</p>

  <h3 class="font-semibold mt-6">POST — append row(s)</h3>
  <pre class="code mt-2">{`POST /api/spreadsheets/{userKey}/{sheetName}
Content-Type: application/json

{"name":"Grace","age":"42"}

# or batch
[{"name":"Grace"},{"name":"Hedy"}]`}</pre>

  <h3 class="font-semibold mt-6">PUT — replace row</h3>
  <pre class="code mt-2">{`PUT /api/spreadsheets/{userKey}/{sheetName}/{row}
Content-Type: application/json

{"name":"Ada Lovelace","age":"37"}`}</pre>

  <h3 class="font-semibold mt-6">DELETE — remove row</h3>
  <pre class="code mt-2">DELETE /api/spreadsheets/{'{userKey}'}/{'{sheetName}'}/{'{row}'}</pre>

  <h2 class="text-2xl font-semibold mt-10">Response format</h2>
  <p>All JSON responses are <code>application/json; charset=utf-8</code>. All values in row data are strings (matching Sheets' rendered value).</p>

  <h2 class="text-2xl font-semibold mt-10">CORS</h2>
  <p><code>Access-Control-Allow-Origin: *</code> on all endpoints. Use a Bearer token for auth; browser credentials are not required.</p>
</DocLayout>
