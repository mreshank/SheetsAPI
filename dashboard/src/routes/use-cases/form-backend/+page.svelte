<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `timestamp | name        | email              | message
2026-04-21 | Ada Lovelace | ada@example.com  | Love this!`;

  const code = `<form onsubmit="submit(event)">
  <input name="name" required>
  <input name="email" type="email" required>
  <textarea name="message"></textarea>
  <button>Send</button>
</form>

<script>
async function submit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.timestamp = new Date().toISOString();
  await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/submissions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  });
  alert('Sent!');
}
<\/script>`;

  const faqs = [
    { q: 'Will spam bots flood my sheet?', a: 'Likely yes if you post publicly. Add a honeypot field, Cloudflare Turnstile, or require an API key. SheetsAPI endpoints require a Bearer key once you create one in the dashboard.' },
    { q: 'Can I trigger an email on submission?', a: 'Yes — attach a Google Apps Script onEdit trigger to your sheet to send via MailApp, or use Make/Zapier (supported in v0.4).' },
    { q: 'How many submissions per day?', a: 'Google Sheets quota is 300 writes/min/project. For a busy form, consider batching or upgrading to a Pro tier (v0.8).' }
  ];
</script>

<UseCase
  slug="form-backend"
  title="Form backend with Google Sheets"
  subtitle="Capture contact forms, waitlists, feedback, and lead-gen straight into Sheets — no server, no database."
  description="Use Google Sheets as a form backend. Free, no server required. Capture submissions from any HTML form, React app, or no-code site into a spreadsheet with one POST request."
  {sheetShape}
  {code}
  {faqs}
/>
