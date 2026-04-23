<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const items = [
    { slug: 'json-viewer', name: 'JSON Viewer', body: 'Paste JSON, see a pretty-printed, collapsible tree.', icon: '{ }' },
    { slug: 'csv-to-json', name: 'CSV to JSON', body: 'Convert a CSV to an array of JSON objects using the header row.', icon: '<>' },
    { slug: 'curl-builder', name: 'curl Builder', body: 'Build curl commands for SheetsAPI endpoints interactively.', icon: '$_' },
    { slug: 'sheet-url-to-id', name: 'Sheet URL → ID', body: 'Extract the spreadsheet ID from a Google Sheets URL.', icon: '#' },
    { slug: 'openapi-generator', name: 'OpenAPI Generator', body: 'Generate an OpenAPI 3.1 spec from your Google Sheet shape.', icon: '{ }' }
  ];
</script>

<Seo title="Free tools for Google Sheets developers" description="Free utilities: JSON viewer, CSV to JSON converter, curl builder, spreadsheet URL parser, OpenAPI generator." canonical="/tools" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">UTILITIES</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">FREE TOOLS</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:520px;line-height:1.7;">Every utility a Sheets-API developer reaches for. All client-side, no tracking, no signup.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each items as t, i}
        <ScrollReveal delay={i * 80}>
          <a href="/tools/{t.slug}" style="text-decoration:none;display:block;">
            <Card3D maxTilt={2}>
              <div class="card-glow" style="padding:24px;height:100%;">
                <span style="font-family:var(--font-mono);font-size:18px;color:rgba(255,255,255,0.3);display:block;margin-bottom:10px;">{t.icon}</span>
                <div style="font-weight:500;font-size:15px;margin-bottom:6px;">{t.name}</div>
                <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;">{t.body}</p>
              </div>
            </Card3D>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
