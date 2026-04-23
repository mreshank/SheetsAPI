<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const cases = [
    { slug: 'form-backend', title: 'Form backend', body: 'Capture form submissions into Google Sheets without running a server.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
    { slug: 'mobile-app-backend', title: 'Mobile app backend', body: 'Lightweight content, config, and data store for iOS and Android apps.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' },
    { slug: 'cms-headless', title: 'Headless CMS', body: 'Let non-technical teammates edit site content in a spreadsheet.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
    { slug: 'prototyping', title: 'MVP & prototyping', body: 'Ship a working product in a day; migrate later if it takes off.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>' },
    { slug: 'no-code-backend', title: 'No-code backend', body: 'Power Webflow, Framer, Bubble, or Softr with a REST backend.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    { slug: 'crm-integration', title: 'CRM integration', body: 'Sync leads, contacts, or deals from Sheets to your stack.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>' },
    { slug: 'landing-pages', title: 'Landing page data', body: 'Testimonials, pricing, feature flags — all editable in Sheets.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
    { slug: 'internal-tools', title: 'Internal tools', body: 'Admin dashboards and ops tools backed by a familiar spreadsheet.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>' },
    { slug: 'leaderboards', title: 'Game leaderboards', body: 'Score submission + retrieval API for casual games.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 3 18 9"/><path d="M12 3v12"/><path d="M5 21h14"/></svg>' },
    { slug: 'configuration-store', title: 'Configuration store', body: 'Feature flags, A/B variants, pricing tables — editable live.', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' }
  ];
</script>

<Seo title="Use cases — Google Sheets REST API" description="Real use cases for SheetsAPI: form backends, mobile app APIs, headless CMS, no-code apps, prototyping, CRM integration." canonical="/use-cases" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">PATTERNS</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">USE CASES</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:520px;line-height:1.7;">Ten patterns where a Google Sheets REST API is the fastest path to production.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 gap-5">
      {#each cases as c, i}
        <ScrollReveal delay={i * 60}>
          <a href="/use-cases/{c.slug}" style="text-decoration:none;display:block;">
            <Card3D maxTilt={2}>
              <div class="card-glow" style="padding:24px;height:100%;">
                <div style="margin-bottom:8px;color:rgba(255,255,255,0.5);">{@html c.icon}</div>
                <div style="font-weight:500;font-size:15px;margin-bottom:6px;">{c.title}</div>
                <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;">{c.body}</p>
              </div>
            </Card3D>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
