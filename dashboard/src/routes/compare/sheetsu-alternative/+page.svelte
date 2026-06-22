<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Status', us: 'Active, maintained', them: 'Sheetsu sunsetted; APISpreadsheets is the spiritual successor' },
    { feature: 'Free tier', us: '~3M req/mo', them: '250 req/day (~7.5k/mo)' },
    { feature: 'Query language', us: 'Simple ?search=field:value', them: 'SQL-like ?query=' },
    { feature: 'Open source', us: 'Yes', them: 'No' },
    { feature: 'Self-hostable', us: 'Yes', them: 'No' },
    { feature: 'Google Sheets native', us: 'Yes', them: 'Works with CSV/Excel/Sheets' },
    { feature: 'OAuth', us: 'Yes', them: 'Yes' }
  ];

  const faqs = [
    { q: 'Is Sheetsu still around?', a: 'Sheetsu shut down. APISpreadsheets picked up the category — similar model, still closed-source.' },
    { q: 'My Sheetsu URLs still work somewhere?', a: 'Unlikely long-term. Migrate to SheetsAPI; the URL shape is similar and response format is the same (array of objects).' }
  ];
</script>

<Compare
  slug="sheetsu-alternative"
  competitor="Sheetsu / APISpreadsheets"
  title="SheetsAPI vs Sheetsu & APISpreadsheets"
  description="Sheetsu is sunsetted; APISpreadsheets is its successor. SheetsAPI offers 400× the free tier, open source, self-hosting, and a simpler query syntax."
  tagline="Sheetsu turned off the lights. APISpreadsheets carries the torch but keeps things closed-source at $50/mo for 100k requests. SheetsAPI is free, open, and purpose-built for Sheets."
  summary="APISpreadsheets supports CSV, Excel, and Sheets but spreads itself thin. SheetsAPI focuses on Google Sheets and does it better — higher free tier, open source, Workspace-native."
  {matrix}
  {faqs}
/>
