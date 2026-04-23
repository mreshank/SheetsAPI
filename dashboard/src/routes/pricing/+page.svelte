<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';
  import { faqSchema } from '$lib/schema';

  const tiers = [
    {
      name: 'FREE',
      price: '$0',
      per: 'forever',
      highlight: 'Best for personal projects, prototypes, no-code tools.',
      cta: 'GET STARTED',
      ctaHref: '/app',
      featured: true,
      features: [
        'Unlimited spreadsheets',
        '~3M requests/month',
        'Full CRUD + search + filter',
        'All output formats',
        'API keys',
        'Workspace Add-on',
        'Community support'
      ]
    },
    {
      name: 'PRO',
      price: '$9',
      per: '/ month',
      highlight: 'For solo builders running production workloads.',
      cta: 'JOIN WAITLIST',
      ctaHref: '/app',
      badge: 'v0.8',
      features: [
        'Everything in Free',
        '10× rate limit per user',
        'Usage analytics',
        'Custom domain',
        'Webhooks on changes',
        'Scoped API keys',
        'Email support'
      ]
    },
    {
      name: 'TEAM',
      price: '$29',
      per: '/ month',
      highlight: 'Collaborate with teammates on shared sheets.',
      cta: 'JOIN WAITLIST',
      ctaHref: '/app',
      badge: 'v0.8',
      features: [
        'Everything in Pro',
        'Up to 5 members',
        'Shared sheet bindings',
        'Role-based API keys',
        '90-day audit log',
        'Slack/Discord alerts'
      ]
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      per: '',
      highlight: 'SSO, SLA, BAA, dedicated quota, custom DPA.',
      cta: 'CONTACT US',
      ctaHref: 'mailto:hello@mreshank.com',
      features: [
        'Everything in Team',
        '99.9% SLA',
        'HIPAA BAA available',
        'SSO (Google, Okta)',
        'Dedicated quota',
        'Invoice billing',
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

  const competitors = [
    { name: 'SheetDB.io Pro', cost: '$29' },
    { name: 'Sheety Starter', cost: '$29' },
    { name: 'Sheetson Pro', cost: '$24' },
    { name: 'APISpreadsheets Team', cost: '$50' },
    { name: 'SheetsAPI Free', cost: '$0', highlight: true }
  ];
</script>

<Seo
  title="Pricing — SheetsAPI is free for individuals"
  description="Free forever for personal use: ~3M requests/month, full CRUD, search, filters, output formats, API keys. Pro ($9/mo) for production. Team ($29/mo) for collaboration."
  canonical="/pricing"
  schema={[faqSchema(faqs)]}
/>

<!-- Header -->
<section style="padding: 72px 0 48px; position: relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-6xl mx-auto px-6 text-center relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom: 16px;">PRICING</div>
      <h1 class="text-hero" style="font-size: clamp(32px, 5vw, 64px); margin-bottom: 16px;">
        HONEST PRICING
      </h1>
      <p style="font-size: 18px; color: rgba(255,255,255,0.5); max-width: 480px; margin: 0 auto; line-height: 1.7;">
        Free for individuals. Cheaper than every alternative. Self-host for $0 forever.
      </p>
    </div>
  </div>
</section>

<!-- Pricing Cards -->
<section style="padding: 0 0 72px;">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each tiers as t, i}
        <ScrollReveal delay={i * 100}>
          <Card3D maxTilt={2}>
            <div
              class="card-glow flex flex-col"
              style="
                padding: 28px;
                height: 100%;
                {t.featured ? 'border-color: rgba(255,255,255,0.25);' : ''}
              "
            >
              <!-- Header -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <span class="font-pixel" style="font-size: 13px; letter-spacing: 1.6px;">{t.name}</span>
                {#if t.badge}
                  <span class="badge" style="font-size: 9px; padding: 2px 6px;">{t.badge}</span>
                {/if}
              </div>

              <!-- Price -->
              <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px;">
                <span class="font-display" style="font-size: 36px; font-weight: 300;">{t.price}</span>
                <span style="color: rgba(255,255,255,0.3); font-size: 14px;">{t.per}</span>
              </div>

              <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin-bottom: 24px; line-height: 1.5;">{t.highlight}</p>

              <!-- Features -->
              <ul style="list-style: none; padding: 0; margin: 0 0 24px; flex: 1; display: flex; flex-direction: column; gap: 10px;">
                {#each t.features as f}
                  <li style="display: flex; gap: 8px; font-size: 13px;">
                    <span style="color: rgba(255,255,255,0.3); flex-shrink: 0;">→</span>
                    <span style="color: rgba(255,255,255,0.6);">{f}</span>
                  </li>
                {/each}
              </ul>

              <!-- CTA -->
              <a
                href={t.ctaHref}
                class={t.featured ? 'btn-primary' : 'btn-ghost'}
                style="width: 100%; text-align: center; font-size: 12px;"
              >
                {t.cta}
              </a>
            </div>
          </Card3D>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- Comparison Table -->
<section style="padding: 48px 0 72px;">
  <div class="max-w-3xl mx-auto px-6">
    <ScrollReveal>
      <div class="card-glow" style="padding: 32px;">
        <h2 class="font-brand" style="font-size: 15px; text-transform: uppercase; letter-spacing: 1.8px; margin-bottom: 24px;">
          COMPARED AT 100K REQ/MONTH
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <th style="text-align: left; padding: 8px 0; font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono);">Service</th>
              <th style="text-align: right; padding: 8px 0; font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono);">Cost</th>
            </tr>
          </thead>
          <tbody>
            {#each competitors as c}
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); {c.highlight ? 'background: rgba(255,255,255,0.03);' : ''}">
                <td style="padding: 12px 0; font-size: 14px; {c.highlight ? 'font-weight: 500;' : 'color: rgba(255,255,255,0.6);'}">{c.name}</td>
                <td style="padding: 12px 0; font-size: 14px; text-align: right; font-family: var(--font-mono); {c.highlight ? 'font-weight: 500;' : 'color: rgba(255,255,255,0.6);'}">{c.cost}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- FAQ -->
<section style="padding: 0 0 96px;">
  <div class="max-w-3xl mx-auto px-6">
    <ScrollReveal>
      <div class="text-mono-label" style="margin-bottom: 16px;">FAQ</div>
      <h2 class="text-section" style="margin-bottom: 32px;">Frequently asked</h2>
    </ScrollReveal>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      {#each faqs as f, i}
        <ScrollReveal delay={i * 80}>
          <details class="card-glow group" style="padding: 20px 24px;">
            <summary style="
              font-weight: 500;
              cursor: pointer;
              list-style: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 15px;
            ">
              {f.q}
              <span style="
                color: rgba(255,255,255,0.3);
                transition: transform 0.3s;
                font-family: var(--font-mono);
                font-size: 18px;
              " class="group-open:rotate-45">+</span>
            </summary>
            <p style="margin-top: 12px; color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.7;">
              {f.a}
            </p>
          </details>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
