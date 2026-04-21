<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Security & Disclosure Policy — SheetsAPI"
  description="How to report security vulnerabilities to SheetsAPI. Our commitments to researchers and our published security.txt."
  canonical="/legal/security"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Security & Responsible Disclosure</h1>

  <h2 class="text-2xl font-semibold mt-10">Reporting</h2>
  <p>Email <a href="mailto:security@mreshank.com" class="text-brand-600 underline">security@mreshank.com</a>. Please include:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Description of the vulnerability</li>
    <li>Steps to reproduce</li>
    <li>Impact assessment</li>
    <li>Your name and a link if you want public credit</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Our commitments</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Acknowledge within 48 hours.</li>
    <li>Patch high-severity issues within 7 days.</li>
    <li>Public credit if you want it (and you didn't break our AUP finding it).</li>
    <li>No legal action against good-faith research.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Safe harbor</h2>
  <p>We consider security research performed under these guidelines to be authorized. We will not pursue civil or criminal action, and will work to remove any action against you if a third party (e.g. your ISP) does.</p>

  <h2 class="text-2xl font-semibold mt-10">Out of scope</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Denial-of-service tests against production.</li>
    <li>Social engineering against our staff or users.</li>
    <li>Physical attacks.</li>
    <li>Findings solely on third-party services (report to Cloudflare or Google).</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">security.txt</h2>
  <p>Our <a href="/.well-known/security.txt" class="text-brand-600 underline">security.txt</a> is published at the well-known location per RFC 9116.</p>

  <h2 class="text-2xl font-semibold mt-10">More</h2>
  <p>See our <a href="/security" class="text-brand-600 underline">Security page</a> for the architecture and threat model.</p>
</article>
