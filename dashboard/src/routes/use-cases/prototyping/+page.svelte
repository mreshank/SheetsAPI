<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `id | name    | status | email
1  | Ada     | signup | ada@...
2  | Alan    | active | alan@...`;

  const code = `// Day 1 → ship with SheetsAPI
fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/users')

// Day 60 → migrate to Postgres
// Export your sheet as CSV, COPY into postgres, swap base URL`;

  const faqs = [
    { q: 'When should I migrate off?', a: 'When you cross ~10,000 rows, need transactions, or your team needs stricter permissions. Until then, Sheets is the fastest option.' },
    { q: 'How to migrate?', a: 'File → Download → CSV. COPY into your database. Replace the fetch URLs. Done.' },
    { q: 'Can I run both in parallel?', a: 'Yes — dual-write during migration for a day or two, then cut over.' }
  ];
</script>

<UseCase
  slug="prototyping"
  title="MVP & rapid prototyping with Sheets"
  subtitle="Ship your idea today. Migrate to a real database if and when you outgrow the spreadsheet."
  description="Use Google Sheets as a prototype backend for your MVP. Validate before committing to infrastructure. Migrate painlessly when you outgrow it."
  {sheetShape}
  {code}
  {faqs}
/>
