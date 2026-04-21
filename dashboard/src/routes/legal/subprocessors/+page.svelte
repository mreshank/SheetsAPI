<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const subs = [
    { name: 'Google LLC', purpose: 'Google Sheets API, OAuth, Google account identifiers', location: 'USA / global' },
    { name: 'Cloudflare, Inc.', purpose: 'Workers runtime, D1 database, Pages hosting, DNS, TLS, DDoS mitigation', location: 'Global edge' }
  ];
</script>

<Seo
  title="Subprocessors — SheetsAPI"
  description="The list of third-party subprocessors SheetsAPI uses to deliver the service. Notified 30 days in advance of changes."
  canonical="/legal/subprocessors"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Subprocessors</h1>
  <p class="text-slate-500 mt-2">Last updated: 2026-04-21</p>

  <p>SheetsAPI uses the following subprocessors to deliver the service. We notify customers 30 days before adding or changing subprocessors.</p>

  <table class="w-full text-sm mt-6 card overflow-hidden">
    <thead class="bg-slate-50"><tr class="text-left"><th class="p-3">Name</th><th class="p-3">Purpose</th><th class="p-3">Location</th></tr></thead>
    <tbody class="divide-y divide-slate-100">
      {#each subs as s}
        <tr><td class="p-3 font-medium">{s.name}</td><td class="p-3">{s.purpose}</td><td class="p-3 text-slate-500">{s.location}</td></tr>
      {/each}
    </tbody>
  </table>

  <h2 class="text-2xl font-semibold mt-10">Compliance inheritance</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Google: ISO 27001, SOC 2, SOC 3, HIPAA (with BAA on Workspace Business/Enterprise).</li>
    <li>Cloudflare: ISO 27001, SOC 2 Type II, PCI DSS, GDPR SCCs.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Notifications</h2>
  <p>Subscribe to updates at <a href="mailto:legal@mreshank.com" class="text-brand-600 underline">legal@mreshank.com</a> to receive subprocessor-change notifications.</p>
</article>
