<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="webhooks"
  title="Webhooks"
  description="Push notifications when a sheet changes. Coming in v0.4."
>
  <h2 class="text-2xl font-semibold mt-10">Status</h2>
  <p>Webhooks are <strong>planned for v0.4</strong>. This page documents the shape so you can design around it.</p>

  <h2 class="text-2xl font-semibold mt-10">How it will work</h2>
  <ol class="mt-2 list-decimal pl-5 space-y-1">
    <li>Register a webhook URL from your dashboard.</li>
    <li>On each mutation (POST/PUT/DELETE), we'll POST a JSON body to your URL.</li>
    <li>Your endpoint responds 2xx; we retry with exponential backoff on non-2xx.</li>
  </ol>

  <h2 class="text-2xl font-semibold mt-10">Payload</h2>
  <pre class="code mt-3">{`{
  "event": "row.appended" | "row.updated" | "row.deleted",
  "spreadsheet_id": "...",
  "sheet_name": "leads",
  "row": 5,
  "data": { "name": "Ada", "email": "ada@..." },
  "timestamp": "2026-04-21T10:00:00Z",
  "signature": "sha256=..."
}`}</pre>

  <h2 class="text-2xl font-semibold mt-10">Verifying signatures</h2>
  <p>Every webhook carries an <code>X-SheetsAPI-Signature</code> header: <code>sha256=HMAC_SHA256(body, webhook_secret)</code>. Compare with your stored secret.</p>

  <h2 class="text-2xl font-semibold mt-10">Alternatives today</h2>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li>Poll the GET list endpoint every 30–60 seconds.</li>
    <li>Use a Google Apps Script <code>onEdit</code> trigger in your sheet to POST to your URL directly.</li>
  </ul>
</DocLayout>
