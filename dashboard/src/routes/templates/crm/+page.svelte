<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'stage', type: 'string', notes: 'new / contacted / qualified / won / lost' },
    { name: 'value', type: 'number' },
    { name: 'owner', type: 'string' },
    { name: 'last_touched', type: 'string (ISO 8601)' }
  ];

  const sampleRow = { id: 'l_001', name: 'Ada', email: 'ada@example.com', company: 'Analytics Inc', stage: 'qualified', value: '5000', owner: 'sam', last_touched: '2026-04-21T10:00:00Z' };

  const code = `// Get qualified leads for a sales rep
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads?search_exact=stage:qualified&search=owner:sam&sort=-last_touched'
);
const leads = await r.json();`;
</script>

<Template
  slug="crm"
  title="Simple CRM template"
  description="A Google Sheets CRM template with leads, contacts, stages, deal values, and ownership. Works as a REST API via SheetsAPI — perfect for early-stage sales teams."
  tagline="Early-stage sales don't need Salesforce. They need a spreadsheet — and an API."
  {columns}
  {sampleRow}
  {code}
/>
