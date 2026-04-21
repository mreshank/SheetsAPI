<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'name', type: 'string' },
    { name: 'message', type: 'string' },
    { name: 'url', type: 'string', notes: 'Optional homepage link' },
    { name: 'timestamp', type: 'string (ISO 8601)' }
  ];

  const sampleRow = { name: 'Ada', message: 'Loved your portfolio!', url: 'https://ada.dev', timestamp: '2026-04-21T10:00:00Z' };

  const code = `// Display latest 50 messages
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/guestbook?sort=-timestamp&limit=50'
);
const entries = await r.json();`;
</script>

<Template
  slug="guestbook"
  title="Guestbook template"
  description="A classic guestbook template for portfolios and personal sites. Google Sheets backed, exposed as a JSON API. Free, no moderation tools out of the box — add your own."
  tagline="A retro guestbook for your portfolio. Because static sites deserve conversation."
  {columns}
  {sampleRow}
  {code}
/>
