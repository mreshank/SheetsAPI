<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Privacy Policy — SheetsAPI"
  description="SheetsAPI's privacy policy. What we collect, how we use it, your rights under GDPR, DPDP, and CCPA, and how to exercise them."
  canonical="/legal/privacy"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose-dark">
  <h1 class="text-4xl font-semibold">Privacy Policy</h1>
  <p style="color:rgba(255,255,255,0.4);font-family:var(--font-mono);font-size:13px;margin-top:8px;">Last updated: 2026-04-21</p>

  <h2 class="text-2xl font-semibold mt-10">Summary</h2>
  <p>We store the minimum required to operate the service: your Google account ID, email, an encrypted OAuth refresh token, and the spreadsheet and API-key metadata you create. We <strong>do not</strong> store the rows inside your spreadsheets — those stay in your Google Drive.</p>

  <h2 class="text-2xl font-semibold mt-10">Who we are</h2>
  <p>SheetsAPI is operated by Eshank Tyagi (<a href="mailto:hello@mreshank.com" style="color:rgba(255,255,255,0.7);text-decoration:underline;">hello@mreshank.com</a>). For privacy inquiries: <a href="mailto:privacy@mreshank.com" style="color:rgba(255,255,255,0.7);text-decoration:underline;">privacy@mreshank.com</a>.</p>

  <h2 class="text-2xl font-semibold mt-10">Data we collect</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Google account identifier</strong> (<code>sub</code>) and <strong>email</strong> — returned by Google's OAuth ID token.</li>
    <li><strong>Encrypted OAuth refresh token</strong> — AES-GCM-256 encrypted before storage.</li>
    <li><strong>Spreadsheet metadata</strong> — IDs, tab names, titles you register.</li>
    <li><strong>API keys</strong> — opaque tokens you create.</li>
    <li><strong>Timestamps</strong> — created_at, updated_at, last_used_at.</li>
    <li><strong>Edge request logs</strong> — IP, user agent, URL; retained 7 days (Cloudflare).</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">How we use it</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Authenticate you and proxy requests to the Google Sheets API.</li>
    <li>Display your dashboard.</li>
    <li>Rate-limit abuse.</li>
    <li>Debug incidents.</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Legal basis (GDPR / DPDP)</h2>
  <p>We process your data on the basis of <strong>consent</strong>, which you grant through the Google OAuth flow, and in some cases the performance of our contract with you.</p>

  <h2 class="text-2xl font-semibold mt-10">Sharing</h2>
  <p>We share data only with subprocessors required to deliver the service. See our <a href="/legal/subprocessors" style="color:rgba(255,255,255,0.7);text-decoration:underline;">subprocessor list</a>. We do not sell your data. We do not run ads.</p>

  <h2 class="text-2xl font-semibold mt-10">Your rights</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Access</strong> — view all stored data via <code>GET /me</code>.</li>
    <li><strong>Erasure</strong> — click "Sign out" in the dashboard; all records are deleted immediately.</li>
    <li><strong>Portability</strong> — your spreadsheet data never left Google; export from Google Drive at any time.</li>
    <li><strong>Rectification</strong> — update your email by re-connecting with Google.</li>
    <li><strong>Objection / withdraw consent</strong> — revoke at <a href="https://myaccount.google.com/permissions" style="color:rgba(255,255,255,0.7);text-decoration:underline;">myaccount.google.com/permissions</a>.</li>
  </ul>
  <p class="mt-3">Requests: <a href="mailto:privacy@mreshank.com" style="color:rgba(255,255,255,0.7);text-decoration:underline;">privacy@mreshank.com</a>. Response within 30 days.</p>

  <h2 class="text-2xl font-semibold mt-10">Retention</h2>
  <table class="w-full text-sm mt-3" style="border:1px solid rgba(255,255,255,0.1);overflow:hidden;"><thead style="background:rgba(255,255,255,0.06);"><tr class="text-left"><th class="p-3">Data</th><th class="p-3">Retention</th></tr></thead><tbody class=""><tr><td class="p-3">Encrypted refresh tokens</td><td class="p-3">Until logout</td></tr><tr><td class="p-3">Metadata (spreadsheets, keys)</td><td class="p-3">Until removed or logout</td></tr><tr><td class="p-3">OAuth state nonces</td><td class="p-3">≤ 10 minutes</td></tr><tr><td class="p-3">Cloudflare edge logs</td><td class="p-3">7 days</td></tr></tbody></table>

  <h2 class="text-2xl font-semibold mt-10">International transfers</h2>
  <p>SheetsAPI runs on Cloudflare's global edge. Data is encrypted in transit and at rest. Cloudflare and Google provide Standard Contractual Clauses (SCCs) for transfers outside the EEA.</p>

  <h2 class="text-2xl font-semibold mt-10">Children</h2>
  <p>Not intended for children under 16. Do not use if you are under 16.</p>

  <h2 class="text-2xl font-semibold mt-10">California (CCPA) & other jurisdictions</h2>
  <p>Residents of California, India (DPDP), Brazil (LGPD), and Canada (PIPEDA) have equivalent rights — exercise them the same way as GDPR above.</p>

  <h2 class="text-2xl font-semibold mt-10">Changes</h2>
  <p>We'll notify you by email and update the "Last updated" date above for material changes.</p>
</article>
