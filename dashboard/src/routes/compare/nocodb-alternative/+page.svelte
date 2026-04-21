<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'Hosting', us: 'Managed (or self-host)', them: 'Self-host only (free), managed paid' },
    { feature: 'Data store', us: 'Google Sheets', them: 'Postgres / MySQL / SQLite' },
    { feature: 'Open source', us: 'Yes', them: 'Yes' },
    { feature: 'Setup time', us: '30 seconds', them: 'Docker + DB + config' },
    { feature: 'Team editors in familiar UI', us: 'Google Sheets (billions know it)', them: 'NocoDB UI' },
    { feature: 'Best for', us: 'Teams in Workspace, marketing, no-code', them: 'Self-hosted infra teams' }
  ];

  const faqs = [
    { q: 'NocoDB is also open source. Why SheetsAPI?', a: 'NocoDB is a full Airtable clone — great if you want to replace Airtable with self-hosted. SheetsAPI is for teams already in Google Sheets who want a REST API on top, with zero infra.' },
    { q: 'Can I self-host SheetsAPI?', a: 'Yes. Clone the repo, deploy to Cloudflare Workers, bring your own Google OAuth client.' }
  ];
</script>

<Compare
  slug="nocodb-alternative"
  competitor="NocoDB"
  title="SheetsAPI vs NocoDB — Sheets-native vs self-hosted Airtable"
  description="NocoDB is an open-source Airtable clone. SheetsAPI is a REST API on top of Google Sheets. Different tradeoffs — compare setup, data store, and intended users."
  tagline="Both open source, different goals. NocoDB replaces Airtable with self-hosted infra. SheetsAPI adds a REST layer to Google Sheets your team already uses."
  summary="NocoDB is a full self-hosted Airtable alternative with its own UI and database. SheetsAPI is a thin REST layer over Google Sheets. If your data belongs in Sheets, we\'re the simpler path."
  {matrix}
  {faqs}
/>
