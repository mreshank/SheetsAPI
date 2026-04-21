<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Backend data store', us: 'Google Sheets (yours)', them: 'Airtable (theirs)' },
    { feature: 'Pricing at 1 user', us: 'Free', them: 'Free (with caps)' },
    { feature: 'Pricing at 5 users', us: 'Free', them: '$100+/mo' },
    { feature: 'Open API', us: 'Standard REST', them: 'Airtable API (proprietary)' },
    { feature: 'Open source', us: 'Yes', them: 'No' },
    { feature: 'Own your data', us: 'Yes (Google Drive)', them: 'In Airtable' },
    { feature: 'Rich fields (attachments, etc.)', us: 'Sheets-native only', them: 'Yes' }
  ];

  const faqs = [
    { q: 'When should I choose Airtable?', a: 'If you need rich field types (attachments, linked records, formulas beyond Sheets) and your team already uses Airtable, stick with it. If you\'re already in Google Workspace, SheetsAPI is simpler and cheaper.' },
    { q: 'Does SheetsAPI support linked records?', a: 'Not natively — Sheets doesn\'t have them. You can fake it with ID columns and join client-side.' }
  ];
</script>

<Compare
  slug="airtable-alternative"
  competitor="Airtable"
  title="SheetsAPI vs Airtable API — free, open, Sheets-native"
  description="Airtable is great but expensive and locks your data into their platform. SheetsAPI keeps your data in Google Sheets and gives you a free REST API."
  tagline="Airtable's product is slick. Its price per user, however, scales fast. If you\'re already in Google Workspace, SheetsAPI gives you 90% of the API benefits for $0."
  summary="Airtable is a full-featured product database. SheetsAPI is a thin layer over Google Sheets. Pick Airtable for rich field types and collaboration within Airtable. Pick SheetsAPI to keep data in Google and avoid $100/mo team pricing."
  {matrix}
  {faqs}
/>
