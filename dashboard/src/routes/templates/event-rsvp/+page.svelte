<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'guests', type: 'number', notes: '1, 2, etc.' },
    { name: 'dietary', type: 'string', notes: 'veg/vegan/none/allergies' },
    { name: 'note', type: 'string' },
    { name: 'rsvp_at', type: 'string (ISO 8601)' }
  ];

  const sampleRow = { name: 'Ada Lovelace', email: 'ada@example.com', guests: '2', dietary: 'vegetarian', note: 'Can\'t wait!', rsvp_at: '2026-04-21T10:00:00Z' };

  const code = `// RSVP form submit
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/rsvps', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ ...formData, rsvp_at: new Date().toISOString() })
});`;
</script>

<Template
  slug="event-rsvp"
  title="Event RSVP template"
  description="A Google Sheets template for event RSVPs with name, email, guest count, dietary preferences, and notes. Perfect for weddings, conferences, meetups."
  tagline="Simple RSVP collection without Eventbrite fees."
  {columns}
  {sampleRow}
  {code}
/>
