<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `name   | bio          | avatar           | featured
Ada    | Mathematician | https://.../a.jpg | true
Alan   | Computer sci  | https://.../b.jpg | false`;

  const code = `// Webflow / Framer — fetch + render via custom code
fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/team?search=featured:true')
  .then(r => r.json())
  .then(team => team.forEach(member => renderCard(member)));`;

  const faqs = [
    { q: 'Does it work with Webflow?', a: 'Yes — add an Embed block with fetch() or use Webflow\'s native CMS integration (roadmap).' },
    { q: 'Framer?', a: 'Framer supports fetch in code overrides and code components. Paste the URL.' },
    { q: 'Bubble / Softr?', a: 'Configure as a custom REST API connector. Both tools have first-class support.' }
  ];
</script>

<UseCase
  slug="no-code-backend"
  title="No-code backend with Google Sheets"
  subtitle="Power Webflow, Framer, Bubble, Softr, FlutterFlow, and Carrd with a JSON API backed by a spreadsheet."
  description="Connect SheetsAPI to any no-code tool. Webflow, Framer, Bubble, Softr, Carrd, FlutterFlow — all support REST API data sources."
  {sheetShape}
  {code}
  {faqs}
/>
