<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `id | name  | company   | email       | stage    | value
1  | Ada   | Analytics | ada@...     | qualified| 5000
2  | Alan  | Acme      | alan@...    | contacted| 2500`;

  const code = `// Push new signup from landing page into CRM sheet
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name, email, company, stage: 'new' })
});

// Read qualified leads for follow-up
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads?search_exact=stage:qualified'
);`;

  const faqs = [
    { q: 'Can sales edit the sheet directly?', a: 'Yes — that\'s the point. Your team edits in Sheets; your apps read via the API.' },
    { q: 'Can I sync with HubSpot or Salesforce?', a: 'Use Zapier/Make (v0.4) or webhooks (v0.4) to push changes to other systems.' }
  ];
</script>

<UseCase
  slug="crm-integration"
  title="CRM in Google Sheets"
  subtitle="Lightweight CRM where sales works in Sheets and your website / product reads via REST."
  description="Use Google Sheets as a simple CRM. Sales and marketing work in a familiar spreadsheet; your landing pages, product, and automation read and write via REST."
  {sheetShape}
  {code}
  {faqs}
/>
