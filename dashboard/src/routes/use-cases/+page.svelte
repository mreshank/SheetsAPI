<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const cases = [
    { slug: 'form-backend', title: 'Form backend', body: 'Capture form submissions into Google Sheets without running a server.', emoji: '📝' },
    { slug: 'mobile-app-backend', title: 'Mobile app backend', body: 'Lightweight content, config, and data store for iOS and Android apps.', emoji: '📱' },
    { slug: 'cms-headless', title: 'Headless CMS', body: 'Let non-technical teammates edit site content in a spreadsheet.', emoji: '📄' },
    { slug: 'prototyping', title: 'MVP & prototyping', body: 'Ship a working product in a day; migrate later if it takes off.', emoji: '⚡' },
    { slug: 'no-code-backend', title: 'No-code backend', body: 'Power Webflow, Framer, Bubble, or Softr with a REST backend.', emoji: '🧩' },
    { slug: 'crm-integration', title: 'CRM integration', body: 'Sync leads, contacts, or deals from Sheets to your stack.', emoji: '👥' },
    { slug: 'landing-pages', title: 'Landing page data', body: 'Testimonials, pricing, feature flags — all editable in Sheets.', emoji: '🚀' },
    { slug: 'internal-tools', title: 'Internal tools', body: 'Admin dashboards and ops tools backed by a familiar spreadsheet.', emoji: '🛠️' },
    { slug: 'leaderboards', title: 'Game leaderboards', body: 'Score submission + retrieval API for casual games.', emoji: '🏆' },
    { slug: 'configuration-store', title: 'Configuration store', body: 'Feature flags, A/B variants, pricing tables — editable live.', emoji: '⚙️' }
  ];
</script>

<Seo
  title="Use cases — Google Sheets REST API"
  description="Real use cases for SheetsAPI: form backends, mobile app APIs, headless CMS, no-code apps, prototyping, CRM integration, game leaderboards, internal tools, configuration stores."
  canonical="/use-cases"
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Use cases</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Ten patterns where a Google Sheets REST API is the fastest path to production. Each guide includes a sheet layout and ready-to-paste code.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-4">
  {#each cases as c}
    <a href="/use-cases/{c.slug}" class="card p-6 hover:ring-brand-500 transition">
      <div class="text-2xl">{c.emoji}</div>
      <div class="font-semibold mt-2">{c.title}</div>
      <p class="text-sm text-slate-600 mt-1">{c.body}</p>
    </a>
  {/each}
</section>
