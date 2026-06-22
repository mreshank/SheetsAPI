<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `key           | value
hero_title    | Ship faster with...
hero_subtitle | The backend you need...
pricing_price | $29
testimonial_1 | "Changed our workflow"`;

  const code = `// Fetch all copy at build time
const r = await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/copy');
const copy = Object.fromEntries((await r.json()).map(row => [row.key, row.value]));
// Use copy.hero_title, copy.pricing_price, etc.`;

  const faqs = [
    { q: 'Live or build-time?', a: 'Build-time is safer for SEO and performance. Rebuild on a schedule or via webhook when the sheet changes.' },
    { q: 'A/B test variants?', a: 'Add a variant column. Fetch all variants, pick client-side based on user segment or random split.' }
  ];
</script>

<UseCase
  slug="landing-pages"
  title="Edit landing-page copy in Sheets"
  subtitle="Stop shipping code every time marketing wants to tweak a headline."
  description="Power landing page copy and testimonials from Google Sheets. Marketing edits in place; your site fetches live or at build time."
  {sheetShape}
  {code}
  {faqs}
/>
