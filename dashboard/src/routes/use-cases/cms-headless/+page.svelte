<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `slug    | title          | author    | published_at | body
hello   | Hello world    | Ada       | 2026-04-01   | <markdown>
shipped | We shipped it  | Alan      | 2026-04-15   | <markdown>`;

  const code = `// Next.js — pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const res = await fetch(
    \`https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/posts?search_exact=slug:\${params.slug}\`
  );
  const [post] = await res.json();
  return { props: { post }, revalidate: 60 };
}`;

  const faqs = [
    { q: 'Does it support markdown?', a: 'Store markdown in a cell; render with any MD library (remark, markdown-it). Sheets stores plain text — your app renders it.' },
    { q: 'Rich content?', a: 'Use a CDN for images (Cloudinary, uploadcare) and paste URLs into Sheets. Embed video IDs and render with the player.' },
    { q: 'Preview drafts?', a: 'Add a status column (draft/published). Filter with ?search_exact=status:published in production, show all in preview mode.' }
  ];
</script>

<UseCase
  slug="cms-headless"
  title="Headless CMS with Google Sheets"
  subtitle="Let non-technical teammates edit site content in a spreadsheet they already know. Your site fetches via REST."
  description="Use Google Sheets as a headless CMS. Editors work in a familiar spreadsheet interface; your static site, blog, or marketing pages fetch content via JSON API."
  {sheetShape}
  {code}
  {faqs}
/>
