<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Service Level Agreement — SheetsAPI"
  description="Our SLA commitments for paid tiers: uptime targets, measurement methodology, and service credits."
  canonical="/legal/sla"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Service Level Agreement</h1>
  <p class="text-slate-500 mt-2">Last updated: 2026-04-21</p>

  <h2 class="text-2xl font-semibold mt-10">Scope</h2>
  <p>This SLA applies to paid Pro, Team, and Enterprise plans. The free tier is provided on a best-effort basis without SLA commitments.</p>

  <h2 class="text-2xl font-semibold mt-10">Uptime targets</h2>
  <table class="w-full text-sm mt-3 card overflow-hidden">
    <thead class="bg-slate-50"><tr class="text-left"><th class="p-3">Plan</th><th class="p-3">Monthly uptime</th><th class="p-3">Credits</th></tr></thead>
    <tbody class="divide-y divide-slate-100">
      <tr><td class="p-3">Free</td><td class="p-3">No SLA</td><td class="p-3">—</td></tr>
      <tr><td class="p-3">Pro</td><td class="p-3">99.5%</td><td class="p-3">10% / month per 0.5% below</td></tr>
      <tr><td class="p-3">Team</td><td class="p-3">99.9%</td><td class="p-3">25% / month per 0.5% below</td></tr>
      <tr><td class="p-3">Enterprise</td><td class="p-3">99.99% (custom)</td><td class="p-3">Negotiated</td></tr>
    </tbody>
  </table>

  <h2 class="text-2xl font-semibold mt-10">Measurement</h2>
  <p>Uptime is measured from external probes hitting <code>https://sheets.mreshank.com/health</code> every minute. Published on <a href="/status" class="text-brand-600 underline">/status</a>.</p>

  <h2 class="text-2xl font-semibold mt-10">Exclusions</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Scheduled maintenance, announced at least 24 hours in advance.</li>
    <li>Outages caused by Google Sheets API (separate provider).</li>
    <li>Outages caused by Controller's misconfiguration or exceeded quotas.</li>
    <li>Force majeure.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Claiming credits</h2>
  <p>Email <a href="mailto:support@mreshank.com" class="text-brand-600 underline">support@mreshank.com</a> within 30 days of the incident. Credits are applied to the next monthly invoice.</p>
</article>
