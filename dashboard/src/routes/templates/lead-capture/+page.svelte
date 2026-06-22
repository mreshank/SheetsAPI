<script lang="ts">
  import Template from '$lib/Template.svelte';

  const columns = [
    { name: 'email', type: 'string' },
    { name: 'first_name', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'utm_source', type: 'string' },
    { name: 'utm_medium', type: 'string' },
    { name: 'utm_campaign', type: 'string' },
    { name: 'landing_page', type: 'string' },
    { name: 'captured_at', type: 'string (ISO 8601)' }
  ];

  const sampleRow = { email: 'ada@example.com', first_name: 'Ada', company: 'Analytics Inc', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'spring-launch', landing_page: '/features', captured_at: '2026-04-21T10:00:00Z' };

  const code = `const params = new URLSearchParams(location.search);
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    email, first_name, company,
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    landing_page: location.pathname,
    captured_at: new Date().toISOString()
  })
});`;
</script>

<Template
  slug="lead-capture"
  title="Lead capture template with UTMs"
  description="Marketing-ready Google Sheets template capturing email, UTM parameters, landing page, and timestamp. Feed your CRM from any landing page with one POST."
  tagline="Lead capture with UTMs baked in. Marketing will love you."
  {columns}
  {sampleRow}
  {code}
/>
