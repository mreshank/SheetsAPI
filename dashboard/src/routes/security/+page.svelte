<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Security — SheetsAPI"
  description="How SheetsAPI secures your data: encrypted OAuth tokens at rest, HTTPS everywhere, Cloudflare edge protection, minimal data footprint, transparent disclosure policy."
  canonical="/security"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Security at SheetsAPI</h1>
  <p class="mt-4 text-slate-600 text-lg">Our architecture is designed around one principle: keep user data in the user's Google account, and minimize what we hold ourselves.</p>

  <h2 class="text-2xl font-semibold mt-12">What we store</h2>
  <ul class="mt-3 space-y-1 text-slate-600 list-disc pl-6">
    <li>Your Google account ID (sub) and email address</li>
    <li>An AES-GCM-256 encrypted OAuth refresh token</li>
    <li>The spreadsheet and tab identifiers you register</li>
    <li>The API keys you create</li>
  </ul>
  <p class="mt-3 text-slate-600">We do <b>not</b> store row data from your spreadsheets. Every API call fetches live from Google.</p>

  <h2 class="text-2xl font-semibold mt-12">Encryption</h2>
  <p class="mt-3 text-slate-600"><b>At rest:</b> AES-GCM with a 256-bit key and a fresh 96-bit IV per record. Key is held as a Cloudflare Worker secret, separate from the database.</p>
  <p class="mt-3 text-slate-600"><b>In transit:</b> TLS 1.3 enforced across sheets.mreshank.com and sheets.mreshank.com.</p>

  <h2 class="text-2xl font-semibold mt-12">Access & revocation</h2>
  <p class="mt-3 text-slate-600">Sign out from the dashboard or revoke our app at <a href="https://myaccount.google.com/permissions" class="text-brand-600 underline">myaccount.google.com/permissions</a>. Either path invalidates our access within seconds.</p>

  <h2 class="text-2xl font-semibold mt-12">Infrastructure</h2>
  <p class="mt-3 text-slate-600">Built on Cloudflare (Workers, D1, Pages). Cloudflare's ISO 27001, SOC 2, and PCI DSS certifications apply to the underlying infrastructure.</p>

  <h2 class="text-2xl font-semibold mt-12">Responsible disclosure</h2>
  <p class="mt-3 text-slate-600">Report vulnerabilities to <a href="mailto:security@mreshank.com" class="text-brand-600 underline">security@mreshank.com</a>. We commit to acknowledging within 48 hours and patching high-severity issues within 7 days. Researchers are welcome; we won't pursue legal action against good-faith research.</p>

  <h2 class="text-2xl font-semibold mt-12">Compliance posture</h2>
  <p class="mt-3 text-slate-600">Full details on GDPR, DPDP (India), SOC 2, and HIPAA alignment in our <a href="/legal/subprocessors" class="text-brand-600 underline">subprocessor list</a> and compliance documentation.</p>

  <h2 class="text-2xl font-semibold mt-12">Further reading</h2>
  <ul class="mt-3 space-y-1 text-slate-600 list-disc pl-6">
    <li><a href="/legal/privacy" class="text-brand-600 underline">Privacy Policy</a></li>
    <li><a href="/legal/dpa" class="text-brand-600 underline">Data Processing Agreement</a></li>
    <li><a href="/legal/subprocessors" class="text-brand-600 underline">Subprocessors</a></li>
  </ul>
</article>
