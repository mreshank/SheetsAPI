<script lang="ts">
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Cookie Policy — SheetsAPI"
  description="SheetsAPI uses almost no cookies. Here's exactly what we store in your browser and why."
  canonical="/legal/cookies"
/>

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <h1 class="text-4xl font-semibold">Cookie Policy</h1>
  <p class="text-slate-500 mt-2">Last updated: 2026-04-21</p>

  <h2 class="text-2xl font-semibold mt-10">Summary</h2>
  <p>We don't use tracking cookies. We don't run ads. We store one item in <code>localStorage</code> to keep you signed in.</p>

  <h2 class="text-2xl font-semibold mt-10">What we store</h2>
  <table class="w-full text-sm mt-3 card overflow-hidden">
    <thead class="bg-slate-50"><tr class="text-left"><th class="p-3">Key</th><th class="p-3">Type</th><th class="p-3">Purpose</th></tr></thead>
    <tbody class="divide-y divide-slate-100">
      <tr><td class="p-3 font-mono">sheetsapi_session</td><td class="p-3">localStorage</td><td class="p-3">Keeps you signed in after OAuth callback. Contains your <code>userKey</code> and email.</td></tr>
    </tbody>
  </table>

  <h2 class="text-2xl font-semibold mt-10">Analytics</h2>
  <p>We use <a href="https://www.cloudflare.com/web-analytics/" class="text-brand-600 underline">Cloudflare Web Analytics</a> on marketing pages — a cookieless, privacy-preserving alternative to Google Analytics. No tracking cookies, no cross-site identifiers.</p>

  <h2 class="text-2xl font-semibold mt-10">Third-party cookies</h2>
  <p>When you authenticate with Google, you are briefly on <code>accounts.google.com</code> — Google sets their own cookies there per their policy. That's out of our scope.</p>

  <h2 class="text-2xl font-semibold mt-10">How to clear</h2>
  <p>Sign out of the dashboard, or clear your browser's site data for <code>sheets.mreshank.com</code>.</p>
</article>
