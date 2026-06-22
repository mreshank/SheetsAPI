<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Free tier requests', us: '~3M/month', them: '200/day (~6k/month)' },
    { feature: 'Response shape', us: 'Array', them: 'Wrapped in { tabName: [...] }' },
    { feature: 'CSV / XML output', us: 'Yes', them: 'No' },
    { feature: 'Field selection', us: 'Yes', them: 'No' },
    { feature: 'Open source', us: 'Yes', them: 'No' },
    { feature: 'Marketplace Add-on', us: 'Yes', them: 'No' },
    { feature: 'Self-hostable', us: 'Yes', them: 'No' },
    { feature: 'Entry paid tier', us: '$9 (v0.8)', them: '$9' }
  ];

  const faqs = [
    { q: 'Sheety wraps responses in a tab-name object. Does SheetsAPI?', a: 'No — we return clean arrays. If you\'re migrating, a one-line adapter handles it: `rows = Array.isArray(r) ? r : r[tabName]`.' },
    { q: 'Does Sheety have anything SheetsAPI doesn\'t?', a: 'Only Sheety-specific quirks. Feature-parity otherwise.' }
  ];
</script>

<Compare
  slug="sheety-alternative"
  competitor="Sheety.co"
  title="SheetsAPI vs Sheety.co — free, open, Sheets-native"
  description="SheetsAPI is a free alternative to Sheety.co. Higher free tier, more output formats, open source, self-hostable, and includes a Workspace Add-on."
  tagline="Sheety is polished but wraps responses awkwardly and caps generous free tiers. SheetsAPI returns clean arrays, supports CSV/XML, and gives you 500× more free requests."
  summary="SheetsAPI is free for volumes where Sheety costs $29/mo. Cleaner response shape, more output formats, open source, and a Workspace Add-on that lives in the Extensions menu of every sheet."
  {matrix}
  {faqs}
/>
