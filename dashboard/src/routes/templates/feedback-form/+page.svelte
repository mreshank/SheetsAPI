<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'rating', type: 'number', notes: '1–5' },
    { name: 'category', type: 'string', notes: 'bug / feature / praise / other' },
    { name: 'message', type: 'string' },
    { name: 'user_id', type: 'string', notes: 'Optional' },
    { name: 'page', type: 'string', notes: 'Where feedback was given' },
    { name: 'submitted_at', type: 'string (ISO 8601)' }
  ];

  const sampleRow = { rating: '5', category: 'praise', message: 'Love the dashboard redesign', user_id: 'u_123', page: '/app', submitted_at: '2026-04-21T10:00:00Z' };

  const code = `// Submit feedback
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/feedback', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ rating, category, message, page: location.pathname, submitted_at: new Date().toISOString() })
});`;
</script>

<Template
  slug="feedback-form"
  title="User feedback template"
  description="Google Sheets template for collecting user feedback with ratings, categories, and context. Great for post-purchase surveys, feature requests, or bug reports."
  tagline="A user feedback backend in a spreadsheet."
  {columns}
  {sampleRow}
  {code}
/>
