<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `flag              | enabled | rollout | note
new_checkout_ui   | true    | 100     | GA'd 2026-04-15
experimental_ai   | true    | 10      | 10% rollout
dark_mode_default | false   | 0       | `;

  const code = `// Fetch flags at app boot
const r = await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/flags');
const flags = Object.fromEntries((await r.json()).map(f => [f.flag, f.enabled === 'true']));
if (flags.new_checkout_ui) showNewCheckout();`;

  const faqs = [
    { q: 'How fast can flags propagate?', a: 'Immediately — API reads are live. If you cache client-side, control the TTL (30s is a good default).' },
    { q: 'Percentage rollouts?', a: 'Read the rollout column and compare to a hashed user ID modulo 100.' }
  ];
</script>

<UseCase
  slug="configuration-store"
  title="Feature flags & configuration in Sheets"
  subtitle="Ship a lightweight feature-flag system without paying for LaunchDarkly or Statsig."
  description="Use Google Sheets as a feature flag and configuration store. Toggle flags, adjust rollout percentages, and update pricing tables — no deploy required."
  {sheetShape}
  {code}
  {faqs}
/>
