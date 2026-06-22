<script lang="ts">
  import Seo from './Seo.svelte';
  import ScrollReveal from './ScrollReveal.svelte';
  import { breadcrumbSchema } from './schema';

  let { slug, title, description, tagline, columns, sampleRow, code }: {
    slug: string; title: string; description: string; tagline: string;
    columns: { name: string; type: string; notes?: string }[];
    sampleRow: Record<string, string>; code: string;
  } = $props();

  const canonical = `/templates/${slug}`;
  const schema = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Templates', url: 'https://sheets.mreshank.com/templates' },
      { name: title, url: `https://sheets.mreshank.com${canonical}` }
    ])
  ];
</script>

<Seo {title} {description} {canonical} {schema} />

<article class="max-w-4xl mx-auto px-6 py-16">
  <ScrollReveal>
    <nav style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:24px;font-family:var(--font-mono);">
      <a href="/templates" style="color:rgba(255,255,255,0.4);text-decoration:none;">TEMPLATES</a>
      <span style="margin:0 8px;">→</span><span>{title}</span>
    </nav>
    <h1 style="font-family:var(--font-mono);font-size:clamp(24px,4vw,40px);font-weight:300;margin-bottom:12px;">{title}</h1>
    <p style="color:rgba(255,255,255,0.5);font-size:16px;max-width:600px;line-height:1.7;">{tagline}</p>
  </ScrollReveal>

  <!-- Schema Table -->
  <ScrollReveal delay={100}>
    <div class="card-glow" style="margin-top:32px;padding:24px;">
      <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:16px;">SCHEMA</div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
              <th style="text-align:left;padding:8px;font-size:11px;font-weight:400;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;font-family:var(--font-mono);">Column</th>
              <th style="text-align:left;padding:8px;font-size:11px;font-weight:400;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;font-family:var(--font-mono);">Type</th>
              <th style="text-align:left;padding:8px;font-size:11px;font-weight:400;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;font-family:var(--font-mono);">Notes</th>
            </tr>
          </thead>
          <tbody>
            {#each columns as c}
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:8px;font-family:var(--font-mono);font-size:12px;color:rgba(255,255,255,0.7);">{c.name}</td>
                <td style="padding:8px;color:rgba(255,255,255,0.5);">{c.type}</td>
                <td style="padding:8px;color:rgba(255,255,255,0.4);">{c.notes ?? ''}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="font-display" style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.4);margin-top:20px;margin-bottom:8px;">SAMPLE ROW</div>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px;font-size:13px;font-family:var(--font-mono);color:rgba(255,255,255,0.7);overflow-x:auto;">{JSON.stringify(sampleRow, null, 2)}</pre>
    </div>
  </ScrollReveal>

  <!-- How to Use + Code -->
  <ScrollReveal delay={200}>
    <div class="card-glow" style="margin-top:16px;padding:24px;">
      <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:12px;">HOW TO USE</div>
      <ol style="padding-left:20px;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.8;margin-bottom:20px;">
        <li>Open Google Sheets and create a new spreadsheet.</li>
        <li>Paste these column names into row 1.</li>
        <li><a href="/app" style="color:rgba(255,255,255,0.8);text-decoration:underline;">Sign in to SheetsAPI</a> and paste your sheet URL.</li>
        <li>Use the example code below to read or write rows.</li>
      </ol>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px;font-size:13px;font-family:var(--font-mono);color:rgba(255,255,255,0.7);overflow-x:auto;">{code}</pre>
    </div>
  </ScrollReveal>

  <!-- CTA -->
  <ScrollReveal delay={300}>
    <div class="card-glow" style="margin-top:56px;padding:32px;text-align:center;">
      <div style="font-family:var(--font-mono);font-size:16px;">USE THIS TEMPLATE</div>
      <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-top:6px;">Connect a sheet and start building.</p>
      <a href="/app" class="btn-primary" style="margin-top:20px;">GET STARTED FREE</a>
    </div>
  </ScrollReveal>
</article>
