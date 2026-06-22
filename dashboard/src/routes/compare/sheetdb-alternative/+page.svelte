<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Free tier requests/month', us: '~3,000,000', them: '500' },
    { feature: 'Entry paid tier', us: '$9/mo (v0.8)', them: '$14/mo' },
    { feature: '100k req/month cost', us: '$0', them: '$29' },
    { feature: 'Open source', us: 'Yes', them: 'No' },
    { feature: 'Self-hostable', us: 'Yes', them: 'No' },
    { feature: 'Workspace Marketplace Add-on', us: 'Yes', them: 'No' },
    { feature: 'OAuth-based auth', us: 'Yes', them: 'Mixed' },
    { feature: 'Search / filter', us: 'Yes', them: 'Yes (paid tier)' },
    { feature: 'CSV/XML/JSONP output', us: 'Yes', them: 'Yes' },
    { feature: 'Webhooks', us: 'v0.4', them: 'Yes (paid)' },
    { feature: 'Encrypted tokens at rest', us: 'Documented', them: 'Undisclosed' },
    { feature: 'Transparent compliance posture', us: 'DPDP/GDPR/SOC2 roadmap', them: 'Limited public info' }
  ];

  const whyUs = [
    'Free tier 6,000× larger than SheetDB\'s',
    'Entire codebase is open — self-host if compliance demands it',
    'Native Google Workspace Marketplace listing (Extensions → SheetsAPI)',
    'Published security + compliance posture instead of opaque boilerplate',
    'No lock-in: the URL shape is publicly documented, fully portable'
  ];

  const faqs = [
    { q: 'Is migrating from SheetDB hard?', a: 'No. Response shape is compatible (array of objects keyed by header row). Update the base URL in your code and you\'re done.' },
    { q: 'Do I lose SheetDB features?', a: 'Not the core ones. Search, filter, pagination, and CSV/XML output are all supported. Webhooks are on the roadmap.' },
    { q: 'Why is SheetDB charging so much?', a: 'They were first-to-market in 2018. Infra costs have dropped 10× since then on edge platforms like Cloudflare Workers. We pass the savings through.' }
  ];
</script>

<Compare
  slug="sheetdb-alternative"
  competitor="SheetDB.io"
  title="SheetsAPI vs SheetDB.io — free open alternative"
  description="SheetsAPI is a free, open-source alternative to SheetDB.io. Get 6,000× the free-tier requests, full feature parity, and the option to self-host. Compare features, pricing, and migration."
  tagline="SheetDB pioneered the Google-Sheets-as-API category in 2018. Infrastructure got 10× cheaper since. SheetsAPI passes those savings through — free, open, and Workspace-native."
  summary="SheetsAPI matches SheetDB's core features and exceeds its free tier by 6,000×. Both give you CRUD over a spreadsheet; SheetsAPI adds self-hosting, a Marketplace Add-on, documented compliance, and costs $0 at volumes where SheetDB costs $29/month."
  {matrix}
  {whyUs}
  {faqs}
/>
