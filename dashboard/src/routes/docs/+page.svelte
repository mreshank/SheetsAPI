<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const sections = [
    {
      title: 'GETTING STARTED',
      items: [
        { href: '/docs/quickstart', label: 'Quickstart', body: 'Connect your first sheet and make your first API call in 30 seconds.', icon: '→' },
        { href: '/docs/authentication', label: 'Authentication', body: 'OAuth with Google + optional API keys.', icon: '→' }
      ]
    },
    {
      title: 'REFERENCE',
      items: [
        { href: '/docs/rest-api', label: 'REST API', body: 'All CRUD endpoints, parameters, and response formats.', icon: '→' },
        { href: '/docs/search-and-filters', label: 'Search & filters', body: 'Query with search, sort, pagination, field selection.', icon: '→' },
        { href: '/docs/errors', label: 'Errors', body: 'Status codes, error shape, debugging tips.', icon: '→' },
        { href: '/docs/rate-limits', label: 'Rate limits', body: 'What limits apply and how to avoid hitting them.', icon: '→' }
      ]
    },
    {
      title: 'INTEGRATIONS',
      items: [
        { href: '/docs/sdks', label: 'SDKs', body: 'Client libraries for TypeScript and Python (roadmap).', icon: '→' },
        { href: '/docs/webhooks', label: 'Webhooks', body: 'Push notifications on row changes (roadmap).', icon: '→' }
      ]
    }
  ];
</script>

<Seo
  title="Documentation — SheetsAPI"
  description="Complete documentation for SheetsAPI: quickstart, authentication, REST API reference, search and filters, error handling, rate limits, SDKs, webhooks."
  canonical="/docs"
/>

<!-- Header -->
<section style="padding: 72px 0 48px; position: relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom: 16px;">REFERENCE</div>
      <h1 class="text-hero" style="font-size: clamp(36px, 6vw, 72px); margin-bottom: 16px;">DOCS</h1>
      <p style="font-size: 18px; color: rgba(255,255,255,0.5); max-width: 480px; line-height: 1.7;">
        Everything you need to build with SheetsAPI.
      </p>
    </div>
  </div>
</section>

<!-- Doc Sections -->
<section style="padding: 0 0 96px;">
  <div class="max-w-5xl mx-auto px-6" style="display: flex; flex-direction: column; gap: 48px;">
    {#each sections as s, si}
      <ScrollReveal delay={si * 100}>
        <div>
          <h2 class="text-mono-label" style="margin-bottom: 20px;">{s.title}</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            {#each s.items as item, ii}
              <ScrollReveal delay={(si * 100) + (ii * 80)}>
                <a href={item.href} style="text-decoration: none; display: block;">
                  <Card3D maxTilt={2}>
                    <div class="card-glow" style="padding: 24px; display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <div style="font-weight: 500; font-size: 15px; margin-bottom: 6px; color: #ffffff;">
                          {item.label}
                        </div>
                        <p style="color: rgba(255,255,255,0.4); font-size: 13px; line-height: 1.5; margin: 0;">
                          {item.body}
                        </p>
                      </div>
                      <span class="font-display" style="color: rgba(255,255,255,0.2); font-size: 18px; flex-shrink: 0; margin-left: 16px; transition: transform 0.3s, color 0.3s;">
                        {item.icon}
                      </span>
                    </div>
                  </Card3D>
                </a>
              </ScrollReveal>
            {/each}
          </div>
        </div>
      </ScrollReveal>
    {/each}
  </div>
</section>
