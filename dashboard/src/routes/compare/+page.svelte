<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const items = [
    { slug: 'sheetdb-alternative', name: 'SheetDB.io', body: 'The original. Expensive paid tiers, 500 req/month free.' },
    { slug: 'sheety-alternative', name: 'Sheety.co', body: '200 req/day free. No CSV export. Paid $9/mo.' },
    { slug: 'sheetson-alternative', name: 'Sheetson', body: '500 rows free. Dated UI. $12–24/mo paid.' },
    { slug: 'sheetsu-alternative', name: 'Sheetsu / APISpreadsheets', body: 'Sheetsu sunsetted; APISpreadsheets is the successor.' },
    { slug: 'google-apps-script-alternative', name: 'Google Apps Script', body: 'Ugly URLs, 20k calls/day quota. SheetsAPI is a full REST API.' },
    { slug: 'airtable-alternative', name: 'Airtable', body: "More feature-rich but locks you into Airtable's product." },
    { slug: 'nocodb-alternative', name: 'NocoDB', body: "Open source but requires self-hosting and isn't Sheets-native." }
  ];
</script>

<Seo title="SheetsAPI vs SheetDB, Sheety, Sheetson, Sheetsu — free alternatives" description="SheetsAPI is a free, open, OAuth-based alternative to SheetDB.io, Sheety.co, Sheetson.com, and APISpreadsheets." canonical="/compare" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">ALTERNATIVES</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">COMPARE</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:520px;line-height:1.7;">Side-by-side comparisons with the paid Google-Sheets-to-API tools most teams outgrow.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 gap-5">
      {#each items as c, i}
        <ScrollReveal delay={i * 80}>
          <a href="/compare/{c.slug}" style="text-decoration:none;display:block;">
            <Card3D maxTilt={2}>
              <div class="card-glow" style="padding:24px;height:100%;">
                <div style="font-weight:500;font-size:15px;margin-bottom:6px;">SheetsAPI vs {c.name}</div>
                <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;margin-bottom:12px;">{c.body}</p>
                <span style="font-size:12px;color:rgba(255,255,255,0.3);font-family:var(--font-mono);">READ COMPARISON →</span>
              </div>
            </Card3D>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
