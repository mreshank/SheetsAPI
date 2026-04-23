<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const posts = [
    { slug: 'google-sheets-rest-api-in-30-seconds', title: 'How to turn a Google Sheet into a REST API in 30 seconds', date: '2026-04-22', excerpt: 'A full walkthrough of connecting a sheet to SheetsAPI and making your first CRUD call.' },
    { slug: 'sheetdb-alternative-free', title: "SheetDB is expensive. Here's the free, open alternative.", date: '2026-04-23', excerpt: 'Side-by-side comparison of pricing, features, and migration effort from SheetDB.io.' },
    { slug: 'best-use-cases-sheets-api', title: 'The 10 best use cases for a Google Sheets API in 2026', date: '2026-04-24', excerpt: 'Form backends, headless CMS, CRM, feature flags, mobile apps, and more.' }
  ];
</script>

<Seo title="Blog — SheetsAPI" description="Tutorials, comparisons, and deep dives on using Google Sheets as a REST API." canonical="/blog" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-3xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">WRITING</div>
      <h1 class="text-hero" style="font-size:clamp(36px,6vw,64px);margin-bottom:16px;">BLOG</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;line-height:1.7;">Tutorials, comparisons, and deep dives.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-3xl mx-auto px-6" style="display:flex;flex-direction:column;gap:12px;">
    {#each posts as p, i}
      <ScrollReveal delay={i * 100}>
        <a href="/blog/{p.slug}" style="text-decoration:none;display:block;">
          <Card3D maxTilt={2}>
            <div class="card-glow" style="padding:24px;">
              <div style="font-size:12px;color:rgba(255,255,255,0.3);font-family:var(--font-mono);margin-bottom:8px;">{p.date}</div>
              <h2 style="font-size:17px;font-weight:500;color:#fff;margin-bottom:6px;">{p.title}</h2>
              <p style="font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;">{p.excerpt}</p>
            </div>
          </Card3D>
        </a>
      </ScrollReveal>
    {/each}
  </div>
</section>
