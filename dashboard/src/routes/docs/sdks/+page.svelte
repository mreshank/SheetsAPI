<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="sdks"
  title="SDKs"
  description="Client libraries for working with SheetsAPI. Today: fetch works everywhere. Tomorrow: typed TypeScript and Python SDKs."
>
  <h2 class="text-2xl font-semibold mt-10">Today — use fetch</h2>
  <p>SheetsAPI is a standard REST+JSON API. Any HTTP client in any language works:</p>

  <h3 class="font-semibold mt-6">TypeScript / JavaScript</h3>
  <pre class="code mt-2">{`const res = await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads');
const leads = await res.json();`}</pre>

  <h3 class="font-semibold mt-6">Python</h3>
  <pre class="code mt-2">{`import requests
r = requests.get('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads')
leads = r.json()`}</pre>

  <h3 class="font-semibold mt-6">Go</h3>
  <pre class="code mt-2">{`r, _ := http.Get("https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads")
var leads []map[string]string
json.NewDecoder(r.Body).Decode(&leads)`}</pre>

  <h3 class="font-semibold mt-6">Swift</h3>
  <pre class="code mt-2">{`let url = URL(string: "https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads")!
let (data, _) = try await URLSession.shared.data(from: url)
let leads = try JSONDecoder().decode([[String: String]].self, from: data)`}</pre>

  <h2 class="text-2xl font-semibold mt-10">Coming soon — official SDKs</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><code>@sheetsapi/client</code> — TypeScript with generated types from your sheet's header row</li>
    <li><code>sheetsapi</code> — Python with pydantic models</li>
  </ul>
  <p class="mt-3">Both will wrap the same URL patterns; nothing you build today needs to change when they ship.</p>

  <h2 class="text-2xl font-semibold mt-10">OpenAPI</h2>
  <p>Generate a spec for your sheet with the <a href="/tools/openapi-generator" class="text-brand-600 underline">OpenAPI Generator tool</a>. Use it with Postman, Insomnia, or <code>openapi-typescript</code> / <code>openapi-generator-cli</code>.</p>
</DocLayout>
