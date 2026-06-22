<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'timestamp', type: 'string (ISO 8601)', notes: 'Set client-side on submit' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'message', type: 'string', notes: 'Long text OK' },
    { name: 'source', type: 'string', notes: 'Optional — page or campaign' }
  ];

  const sampleRow = {
    timestamp: '2026-04-21T10:00:00Z',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'Love the product!',
    source: 'homepage'
  };

  const code = `document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.timestamp = new Date().toISOString();
  data.source = location.pathname;
  await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/submissions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  alert('Thanks!');
});`;
</script>

<Template
  slug="contact-form"
  title="Contact form template"
  description="A ready-to-use Google Sheets template for a website contact form backend. Columns: timestamp, name, email, message, source. Includes drop-in form submission code."
  tagline="The classic. Capture form submissions from any landing page into a spreadsheet."
  {columns}
  {sampleRow}
  {code}
/>
