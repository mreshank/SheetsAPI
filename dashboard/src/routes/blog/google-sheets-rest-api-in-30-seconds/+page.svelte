<script lang="ts">
  import BlogPost from '$lib/BlogPost.svelte';
</script>

<BlogPost
  slug="google-sheets-rest-api-in-30-seconds"
  title="How to turn a Google Sheet into a REST API in 30 seconds"
  description="A full walkthrough of connecting a Google Sheet to SheetsAPI and making your first GET, POST, PUT, and DELETE calls — all in under a minute."
  date="2026-04-22"
>
  <p>You have a Google Sheet. You want your app to read from it, write to it, and update it — without setting up a backend. Here's how, end-to-end, with working code.</p>

  <h2 class="text-2xl font-semibold mt-8">Step 1 — Set up your sheet</h2>
  <p>Create any Google Sheet. Put your column names in row 1. That row becomes your JSON schema.</p>
  <pre class="code">name  | email              | created_at
Ada   | ada@example.com    | 2026-04-21
Alan  | alan@example.com   | 2026-04-22</pre>

  <h2 class="text-2xl font-semibold mt-8">Step 2 — Connect to SheetsAPI</h2>
  <p>Visit <a href="/app" class="text-brand-600 underline">sheets.mreshank.com</a> and sign in with Google. Paste your sheet's URL. Done — you now have a <code>userKey</code>.</p>

  <h2 class="text-2xl font-semibold mt-8">Step 3 — Call the API</h2>
  <p>Your endpoint is <code>https://sheets.mreshank.com/api/spreadsheets/&lt;userKey&gt;/&lt;tab&gt;</code>.</p>

  <h3 class="font-semibold mt-4">Read all rows</h3>
  <pre class="code">curl 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads'</pre>

  <h3 class="font-semibold mt-4">Append a row</h3>
  <pre class="code">{`curl -X POST 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads' \\
  -H 'content-type: application/json' \\
  -d '{"name":"Grace","email":"grace@example.com"}'`}</pre>

  <h3 class="font-semibold mt-4">Update row 1</h3>
  <pre class="code">{`curl -X PUT 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads/1' \\
  -H 'content-type: application/json' \\
  -d '{"name":"Ada Lovelace","email":"ada@example.com"}'`}</pre>

  <h3 class="font-semibold mt-4">Delete row 1</h3>
  <pre class="code">curl -X DELETE 'https://sheets.mreshank.com/api/spreadsheets/abc123/leads/1'</pre>

  <h2 class="text-2xl font-semibold mt-8">That's it</h2>
  <p>From here: <a href="/docs/search-and-filters" class="text-brand-600 underline">search and filter</a>, <a href="/docs/authentication" class="text-brand-600 underline">secure with API keys</a>, or <a href="/use-cases" class="text-brand-600 underline">browse use cases</a> for inspiration.</p>
</BlogPost>
