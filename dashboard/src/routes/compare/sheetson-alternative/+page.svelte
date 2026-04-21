<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Free tier cap', us: '~3M req/month', them: '500 rows total' },
    { feature: 'Row indexing', us: '1-based', them: '0-based' },
    { feature: 'Paid entry', us: '$9 (v0.8)', them: '$12/mo' },
    { feature: 'Open source', us: 'Yes', them: 'No' },
    { feature: 'Self-hostable', us: 'Yes', them: 'No' },
    { feature: 'Marketplace Add-on', us: 'Yes', them: 'No' },
    { feature: 'Modern UI', us: 'SvelteKit + Tailwind v4', them: 'Dated' }
  ];

  const faqs = [
    { q: 'Sheetson uses 0-based row indexing. SheetsAPI?', a: '1-based. If you\'re migrating, add 1 to your row indices.' },
    { q: 'Sheetson rate-limits at 5 req/sec. SheetsAPI?', a: 'Higher. Bound by Google Sheets shared quota (300/min/project) today; per-user limits on roadmap.' }
  ];
</script>

<Compare
  slug="sheetson-alternative"
  competitor="Sheetson"
  title="SheetsAPI vs Sheetson — free alternative with more rows"
  description="SheetsAPI is a free alternative to Sheetson.com. No 500-row cap, open source, self-hostable, and includes a modern dashboard built on SvelteKit."
  tagline="Sheetson caps its free tier at 500 rows — painful for anything real. SheetsAPI doesn\'t cap row counts and gives you 3M requests/month."
  summary="SheetsAPI removes Sheetson\'s row-count cap, updates the UI to a modern SvelteKit + Tailwind v4 dashboard, and is fully open source. Migration is straightforward: adjust row indexing from 0-based to 1-based."
  {matrix}
  {faqs}
/>
