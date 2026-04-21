<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import { faqSchema } from '$lib/schema';

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      per: 'forever',
      highlight: 'Best for personal projects, prototypes, no-code tools.',
      cta: 'Get started free',
      ctaHref: '/app',
      features: [
        'Unlimited spreadsheets',
        '~3M requests/month (shared fair-use)',
        'Full CRUD + search + filter',
        'All output formats (JSON, CSV, TSV, XML, JSONP)',
        'API keys',
        'Workspace Add-on',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$9',
      per: '/ month',
      highlight: 'For solo builders running production workloads.',
      cta: 'Join waitlist',
      ctaHref: '/app',
      badge: 'Coming v0.8',
      features: [
        'Everything in Free',
        '10× rate limit per user',
        'Usage analytics',
        'Custom domain (api.yourco.com)',
        'Webhooks on changes',
        'Scoped API keys (read-only, per-tab, expiring)',
        'Email support'
      ]
    },
    {
      name: 'Team',
      price: '$29',
      per: '/ month',
      highlight: 'Collaborate with teammates on shared sheets.',
      cta: 'Join waitlist',
      ctaHref: '/app',
      badge: 'Coming v0.8',
      features: [
        'Everything in Pro',
        'Up to 5 members',
        'Shared spreadsheet bindings',
        'Role-based API keys',
        '90-day audit log',
        'Slack/Discord alerts'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      per: '',
      highlight: 'SSO, SLA, BAA, dedicated quota, custom DPA.',
      cta: 'Contact us',
      ctaHref: 'mailto:hello@mreshank.com',
      features: [
        'Everything in Team',
        '99.9% SLA',
        'HIPAA BAA available',
        'SSO (Google, Okta)',
        'Dedicated Google Cloud quota',
        'Invoicing / PO billing',
        'Priority support'
      ]
    }
  ];

  const faqs = [
    { q: 'Is there really a free tier?', a: 'Yes. The free tier covers personal projects, hackathons, and most small production use. There are no credit-card requirements, and we will never quietly downgrade you.' },
    { q: 'What counts as a "request"?', a: 'Any HTTP call to your API URL — GET, POST, PUT, DELETE. CORS preflights are not counted.' },
    { q: 'What happens if I exceed the free fair-use limit?', a: 'Today: nothing, you keep working. Once we introduce metering, we will email you before imposing any limits so you can upgrade if needed.' },
    { q: 'Can I self-host for free?', a: 'Yes — the entire worker + dashboard + schema is open source. Bring your own Cloudflare account and Google OAuth client.' },
    { q: 'Do you offer a discount for students or non-profits?', a: 'The free tier already covers most of those use cases. For non-profit Pro/Team needs, email us.' }
  ];
</script>

<Seo
  title="Pricing — SheetsAPI is free for individuals"
  description="Free forever for personal use: ~3M requests/month, full CRUD, search, filters, output formats, API keys. Pro ($9/mo) for production. Team ($29/mo) for collaboration. Cheaper than SheetDB, Sheety, Sheetson."
  canonical="/pricing"
  schema={[faqSchema(faqs)]}
/>

<section class="max-w-6xl mx-auto px-6 py-16 text-center">
  <h1 class="text-4xl font-semibold tracking-tight">Simple, honest pricing</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Free for individuals. Cheaper than every alternative. Self-host for $0 forever if you want.</p>
</section>

<section class="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
  {#each tiers as t}
    <div class="card p-6 flex flex-col">
      <div class="flex items-baseline justify-between">
        <div class="font-semibold text-lg">{t.name}</div>
        {#if t.badge}<span class="text-xs bg-slate-100 px-2 py-0.5 rounded">{t.badge}</span>{/if}
      </div>
      <div class="mt-3 flex items-baseline gap-1">
        <div class="text-3xl font-bold">{t.price}</div>
        <div class="text-slate-500 text-sm">{t.per}</div>
      </div>
      <p class="text-sm text-slate-600 mt-2">{t.highlight}</p>
      <ul class="mt-4 space-y-2 text-sm flex-1">
        {#each t.features as f}
          <li class="flex gap-2"><span class="text-brand-500">✓</span><span class="text-slate-700">{f}</span></li>
        {/each}
      </ul>
      <a href={t.ctaHref} class="btn-primary mt-6">{t.cta}</a>
    </div>
  {/each}
</section>

<section class="max-w-4xl mx-auto px-6 pb-24">
  <div class="card p-8">
    <h2 class="text-xl font-semibold mb-4">Compared to the alternatives (100k req/month)</h2>
    <table class="w-full text-sm">
      <thead><tr class="text-left border-b border-slate-200"><th class="py-2">Service</th><th>Monthly cost</th></tr></thead>
      <tbody class="divide-y divide-slate-100">
        <tr><td class="py-2">SheetDB.io Pro</td><td>$29</td></tr>
        <tr><td class="py-2">Sheety Starter</td><td>$29</td></tr>
        <tr><td class="py-2">Sheetson Pro</td><td>$24</td></tr>
        <tr><td class="py-2">APISpreadsheets Team</td><td>$50</td></tr>
        <tr class="bg-brand-50"><td class="py-2 font-semibold">SheetsAPI Free</td><td class="font-semibold">$0</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="max-w-3xl mx-auto px-6 pb-24">
  <h2 class="text-2xl font-semibold mb-6">Frequently asked</h2>
  <div class="space-y-4">
    {#each faqs as f}
      <details class="card p-5 group">
        <summary class="font-medium cursor-pointer list-none flex justify-between">
          {f.q}<span class="text-slate-400 group-open:rotate-45 transition">+</span>
        </summary>
        <p class="mt-3 text-sm text-slate-600">{f.a}</p>
      </details>
    {/each}
  </div>
</section>
