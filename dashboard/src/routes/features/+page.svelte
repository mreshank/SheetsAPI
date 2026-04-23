<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';
  import { softwareApplicationSchema } from '$lib/schema';

  const features = [
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>', title: 'CRUD out of the box', body: 'GET, POST, PUT, DELETE on every tab. Header row becomes JSON keys. Zero configuration needed.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>', title: 'OAuth, not sharing', body: 'Sign in with Google once. We never need you to share a spreadsheet with a service account.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', title: 'Search & filter', body: '?search=field:value, ?search_exact=field:value. Case-insensitive substring matching by default.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/><line x1="4" y1="21" x2="20" y2="21"/></svg>', title: 'Sort & pagination', body: '?sort=-created_at, ?limit=50, ?offset=100. Every list endpoint supports them.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>', title: 'Field selection', body: '?fields=name,email to return only the columns you need. Smaller payloads, faster clients.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', title: 'Multiple output formats', body: 'JSON (default), CSV, TSV, XML, JSONP — one ?format= query parameter away.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>', title: 'API keys when you want', body: 'Endpoints are public until you create your first key. Then Bearer auth is enforced automatically.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', title: 'Workspace Add-on', body: 'Extensions > SheetsAPI inside any Sheet. Copy endpoint URLs without leaving your tab.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>', title: 'CORS by default', body: 'Fetch from any origin. No preflight headaches. Browser apps work instantly.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', title: 'Encrypted tokens', body: 'AES-GCM-256 on refresh tokens. Key stored separately from the database.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', title: 'Free tier that scales', body: 'Cloudflare Workers + D1 covers ~3M requests/month at $0. No surprise bills.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>', title: 'Self-hostable', body: 'Clone the repo, bring your own Cloudflare and Google OAuth client. Total control.' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>', title: 'Webhooks', body: 'POST to your URL on any row change. Build live dashboards without polling.', badge: 'SOON' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>', title: 'OpenAPI spec', body: 'Auto-generated spec per spreadsheet. Import into Postman, generate clients.', badge: 'SOON' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>', title: 'SDKs', body: 'TypeScript and Python clients with full typing for your sheet shape.', badge: 'SOON' },
    { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/><circle cx="12" cy="14" r="1"/></svg>', title: 'Workspace-native', body: 'Built to feel like a first-party Google Workspace tool, not an external service.' }
  ];
</script>

<Seo
  title="Features — everything in SheetsAPI"
  description="CRUD, search, sort, pagination, field selection, CSV/JSON/XML/TSV output, OAuth, API keys, webhooks, and Workspace Add-on. Everything you need to turn a Google Sheet into a REST API."
  canonical="/features"
  schema={[softwareApplicationSchema]}
/>

<!-- Header -->
<section style="padding: 72px 0 48px; position: relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom: 16px;">CAPABILITIES</div>
      <h1 class="text-hero" style="font-size: clamp(36px, 6vw, 72px); margin-bottom: 16px;">FEATURES</h1>
      <p style="font-size: 18px; color: rgba(255,255,255,0.5); max-width: 520px; line-height: 1.7;">
        Everything you need to ship a production-grade backend on top of Google Sheets — without standing up a server.
      </p>
    </div>
  </div>
</section>

<!-- Feature Grid -->
<section style="padding: 0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each features as f, i}
        <ScrollReveal delay={i * 60}>
          <Card3D maxTilt={2}>
            <div class="card-glow" style="padding: 24px; height: 100%;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <span style="font-size: 18px; color: rgba(255,255,255,0.5);">{@html f.icon}</span>
                <span class="font-display" style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 500;">
                  {f.title}
                </span>
                {#if f.badge}
                  <span class="badge" style="font-size: 9px; padding: 2px 6px; margin-left: auto;">{f.badge}</span>
                {/if}
              </div>
              <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6;">
                {f.body}
              </p>
            </div>
          </Card3D>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section style="padding: 0 0 96px;">
  <div class="max-w-4xl mx-auto px-6">
    <ScrollReveal>
      <div class="card-glow" style="padding: 48px; text-align: center; position: relative; overflow: hidden;">
        <div class="absolute inset-0 bg-dots" style="opacity: 0.3;"></div>
        <div style="position: relative;">
          <h2 style="font-family: var(--font-mono); font-size: clamp(24px, 4vw, 36px); font-weight: 300; margin-bottom: 12px;">
            READY TO TRY IT?
          </h2>
          <p style="color: rgba(255,255,255,0.5); font-size: 15px; margin-bottom: 32px;">
            Connect your first sheet in 30 seconds.
          </p>
          <a href="/app" class="btn-primary">GET STARTED FREE</a>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
