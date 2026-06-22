<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `user_email      | plan | credits | flags
ada@example.com | pro  | 1200    | beta,analytics
alan@acme.com   | free | 50      | `;

  const code = `// Admin dashboard — find user + adjust credits
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/users?search_exact=user_email:' + email
);
const [user] = await r.json();
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/users/' + user.row_index, {
  method: 'PUT',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ ...user, credits: String(Number(user.credits) + 100) })
});`;

  const faqs = [
    { q: 'Is Sheets safe for internal data?', a: 'With API keys enabled and Google Workspace access controls, yes. For sensitive internal data (financials, PII) consider self-hosting.' },
    { q: 'Audit trail?', a: 'Sheets version history logs every edit. Our audit log is on the roadmap for Pro.' }
  ];
</script>

<UseCase
  slug="internal-tools"
  title="Internal tools with Google Sheets"
  subtitle="Admin dashboards, ops consoles, and internal tooling backed by a familiar spreadsheet interface."
  description="Build internal tools fast: admin dashboards, ops consoles, user management. Sheets gives non-engineers a safe editing interface."
  {sheetShape}
  {code}
  {faqs}
/>
