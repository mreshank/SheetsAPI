<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';

  const releases = [
    {
      version: 'v0.2', date: '2026-04-28', title: 'Query features',
      changes: [
        'Added ?limit, ?offset pagination on GET list',
        'Added ?search=field:value substring filter',
        'Added ?search_exact=field:value exact filter',
        'Added ?sort=field and ?sort=-field',
        'Added ?fields=a,b,c field selection',
        'Added ?format=csv|tsv|xml|jsonp',
        'Max limit capped at 1000 per request'
      ]
    },
    {
      version: 'v0.1', date: '2026-04-21', title: 'MVP launch',
      changes: [
        'Google OAuth 2.0 flow',
        'D1 schema: users, spreadsheets, api_keys, oauth_states',
        'CRUD endpoints (GET list, GET row, POST, PUT, DELETE)',
        'Progressive API-key enforcement',
        'SvelteKit + Tailwind v4 dashboard',
        'Google Apps Script Add-on',
        'Full documentation site',
        '16 SEO-optimized marketing pages'
      ]
    }
  ];
</script>

<Seo title="Changelog — SheetsAPI" description="Release notes and version history for SheetsAPI." canonical="/changelog" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-3xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">RELEASES</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">CHANGELOG</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;">What's new in SheetsAPI.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-3xl mx-auto px-6" style="display:flex;flex-direction:column;gap:24px;">
    {#each releases as r, i}
      <ScrollReveal delay={i * 120}>
        <div class="card-glow" style="padding:28px;">
          <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;">
            <span class="font-display" style="font-size:20px;font-weight:300;">{r.version}</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.3);font-family:var(--font-mono);">{r.date}</span>
          </div>
          <div style="font-weight:500;font-size:15px;color:rgba(255,255,255,0.7);margin-bottom:14px;">{r.title}</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            {#each r.changes as c}
              <div style="display:flex;gap:10px;font-size:13px;">
                <span style="color:rgba(255,255,255,0.2);font-family:var(--font-mono);flex-shrink:0;">→</span>
                <span style="color:rgba(255,255,255,0.5);">{c}</span>
              </div>
            {/each}
          </div>
        </div>
      </ScrollReveal>
    {/each}

    <ScrollReveal delay={releases.length * 120}>
      <div class="card-glow" style="padding:24px;">
        <div class="font-pixel" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:8px;">WHAT'S NEXT</div>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);">See our full <a href="/docs" style="color:rgba(255,255,255,0.8);text-decoration:underline;">roadmap</a> for planned features through v1.0.</p>
      </div>
    </ScrollReveal>
  </div>
</section>
