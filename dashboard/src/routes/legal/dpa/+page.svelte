<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Data Processing Agreement — SheetsAPI"
  description="Standard DPA aligned with GDPR Article 28 and India's DPDP Act. Available for signature on request for teams handling personal data."
  canonical="/legal/dpa"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Data Processing Agreement</h1>
  <p class="text-slate-500 mt-2">Last updated: 2026-04-21</p>

  <p>This DPA forms part of the <a href="/legal/terms" class="text-brand-600 underline">Terms of Service</a> between you ("Controller") and SheetsAPI ("Processor").</p>

  <h2 class="text-2xl font-semibold mt-10">1. Subject matter</h2>
  <p>Processor will process Personal Data on behalf of Controller to provide the SheetsAPI service: proxying REST API calls to Google Sheets on Controller's authenticated behalf.</p>

  <h2 class="text-2xl font-semibold mt-10">2. Categories of data subjects & data</h2>
  <p><strong>Subjects:</strong> Controller's employees, customers, or leads whose records appear in Controller's spreadsheets.<br /><strong>Data:</strong> limited to what appears in Controller's registered sheets — typically name, email, free-form text. Special category data only if Controller places it there.</p>

  <h2 class="text-2xl font-semibold mt-10">3. Processor's obligations</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Process only on Controller's documented instructions.</li>
    <li>Ensure confidentiality of Processor personnel.</li>
    <li>Implement technical and organizational measures (see <a href="/security" class="text-brand-600 underline">Security</a>).</li>
    <li>Assist Controller in responding to data subject requests.</li>
    <li>Notify Controller of any personal data breach without undue delay (within 72 hours).</li>
    <li>Delete or return all Personal Data upon termination.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">4. Subprocessors</h2>
  <p>Controller authorizes use of the subprocessors listed at <a href="/legal/subprocessors" class="text-brand-600 underline">/legal/subprocessors</a>. We'll give 30 days' notice of changes.</p>

  <h2 class="text-2xl font-semibold mt-10">5. International transfers</h2>
  <p>Processor relies on Cloudflare's and Google's Standard Contractual Clauses for transfers outside the EEA.</p>

  <h2 class="text-2xl font-semibold mt-10">6. Audits</h2>
  <p>Processor will provide reasonable information necessary to demonstrate compliance. On-site audits are available on 30 days' notice for Enterprise customers.</p>

  <h2 class="text-2xl font-semibold mt-10">7. Signing</h2>
  <p>This DPA is incorporated by reference into our Terms. For a countersigned copy, email <a href="mailto:legal@mreshank.com" class="text-brand-600 underline">legal@mreshank.com</a>.</p>
</article>
