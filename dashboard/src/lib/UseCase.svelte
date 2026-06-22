<script lang="ts">
  import Seo from './Seo.svelte';
  import ScrollReveal from './ScrollReveal.svelte';
  import { breadcrumbSchema, faqSchema } from './schema';

  let { slug, title, subtitle, description, sheetShape, code, faqs = [] as { q: string; a: string }[], children }: {
    slug: string; title: string; subtitle: string; description: string; sheetShape: string; code: string;
    faqs?: { q: string; a: string }[]; children?: any;
  } = $props();

  const canonical = `/use-cases/${slug}`;
  const schema = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Use cases', url: 'https://sheets.mreshank.com/use-cases' },
      { name: title, url: `https://sheets.mreshank.com${canonical}` }
    ]),
    ...(faqs.length ? [faqSchema(faqs)] : [])
  ];
</script>

<Seo {title} {description} {canonical} {schema} />

<article class="max-w-4xl mx-auto px-6 py-16">
  <ScrollReveal>
    <nav style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:24px;font-family:var(--font-mono);">
      <a href="/use-cases" style="color:rgba(255,255,255,0.4);text-decoration:none;">USE CASES</a>
      <span style="margin:0 8px;">→</span><span>{title}</span>
    </nav>
    <h1 style="font-family:var(--font-mono);font-size:clamp(24px,4vw,40px);font-weight:300;margin-bottom:12px;">{title}</h1>
    <p style="color:rgba(255,255,255,0.5);font-size:16px;max-width:600px;line-height:1.7;">{subtitle}</p>
  </ScrollReveal>

  <ScrollReveal delay={100}>
    <div class="card-glow" style="margin-top:32px;padding:24px;">
      <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:12px;">SHEET LAYOUT</div>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px;font-size:13px;font-family:var(--font-mono);color:rgba(255,255,255,0.7);overflow-x:auto;">{sheetShape}</pre>
    </div>
  </ScrollReveal>

  <ScrollReveal delay={200}>
    <div class="card-glow" style="margin-top:16px;padding:24px;">
      <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:12px;">EXAMPLE INTEGRATION</div>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px;font-size:13px;font-family:var(--font-mono);color:rgba(255,255,255,0.7);overflow-x:auto;">{code}</pre>
    </div>
  </ScrollReveal>

  {#if children}<div style="margin-top:32px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.8;">{@render children()}</div>{/if}

  {#if faqs.length}
    <ScrollReveal delay={300}>
      <div style="margin-top:48px;">
        <h2 class="font-display" style="font-size:14px;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:20px;">FAQ</h2>
        <div style="display:flex;flex-direction:column;gap:6px;">
          {#each faqs as f}
            <details class="card-glow group" style="padding:18px 22px;">
              <summary style="font-weight:500;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-size:14px;">{f.q}<span style="color:rgba(255,255,255,0.3);transition:transform 0.3s;font-family:var(--font-mono);font-size:18px;" class="group-open:rotate-45">+</span></summary>
              <p style="margin-top:12px;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.7;">{f.a}</p>
            </details>
          {/each}
        </div>
      </div>
    </ScrollReveal>
  {/if}

  <ScrollReveal delay={400}>
    <div class="card-glow" style="margin-top:56px;padding:32px;text-align:center;">
      <div style="font-family:var(--font-mono);font-size:16px;">READY TO BUILD THIS?</div>
      <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-top:6px;">Connect your first sheet in 30 seconds.</p>
      <a href="/app" class="btn-primary" style="margin-top:20px;">SIGN IN WITH GOOGLE</a>
    </div>
  </ScrollReveal>
</article>
