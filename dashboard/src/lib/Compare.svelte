<script lang="ts">
  import Seo from './Seo.svelte';
  import ScrollReveal from './ScrollReveal.svelte';
  import Card3D from './Card3D.svelte';
  import { breadcrumbSchema, faqSchema } from './schema';

  type Row = { feature: string; us: string; them: string };

  let {
    slug,
    competitor,
    title,
    description,
    tagline,
    summary,
    matrix,
    whyUs = [] as string[],
    faqs = [] as { q: string; a: string }[]
  }: {
    slug: string;
    competitor: string;
    title: string;
    description: string;
    tagline: string;
    summary: string;
    matrix: Row[];
    whyUs?: string[];
    faqs?: { q: string; a: string }[];
  } = $props();

  const canonical = `/compare/${slug}`;
  const schema = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Compare', url: 'https://sheets.mreshank.com/compare' },
      { name: competitor, url: `https://sheets.mreshank.com${canonical}` }
    ]),
    ...(faqs.length ? [faqSchema(faqs)] : [])
  ];
</script>

<Seo {title} {description} {canonical} {schema} />

<article class="max-w-4xl mx-auto px-6 py-16">
  <ScrollReveal>
    <nav style="font-size: 13px; color: rgba(255,255,255,0.3); margin-bottom: 24px; font-family: var(--font-mono);">
      <a href="/compare" style="color: rgba(255,255,255,0.4); text-decoration: none;" class="hover:text-white">COMPARE</a>
      <span style="margin: 0 8px;">→</span>
      <span>{competitor}</span>
    </nav>
    <h1 style="font-family: var(--font-mono); font-size: clamp(24px, 4vw, 40px); font-weight: 300; margin-bottom: 12px;">
      {title}
    </h1>
    <p style="color: rgba(255,255,255,0.5); font-size: 16px; max-width: 600px; line-height: 1.7;">
      {tagline}
    </p>
  </ScrollReveal>

  <!-- TL;DR -->
  <ScrollReveal delay={100}>
    <div class="card-glow" style="margin-top: 32px; padding: 24px;">
      <div class="font-display" style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; color: rgba(255,255,255,0.4); margin-bottom: 8px;">TL;DR</div>
      <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.7;">{summary}</p>
    </div>
  </ScrollReveal>

  <!-- Feature Comparison Table -->
  <ScrollReveal delay={200}>
    <div style="margin-top: 40px;">
      <h2 class="font-display" style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.4px; margin-bottom: 20px;">FEATURE COMPARISON</h2>
      <div class="card-glow" style="overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <th style="text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono);">Feature</th>
              <th style="text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono);">SheetsAPI</th>
              <th style="text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono);">{competitor}</th>
            </tr>
          </thead>
          <tbody>
            {#each matrix as r}
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px 16px; color: rgba(255,255,255,0.6); font-weight: 500;">{r.feature}</td>
                <td style="padding: 10px 16px; color: rgba(255,255,255,0.8);">{r.us}</td>
                <td style="padding: 10px 16px; color: rgba(255,255,255,0.4);">{r.them}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </ScrollReveal>

  <!-- Why Switch -->
  {#if whyUs.length}
    <ScrollReveal delay={300}>
      <div style="margin-top: 40px;">
        <h2 class="font-display" style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.4px; margin-bottom: 20px;">WHY TEAMS SWITCH</h2>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          {#each whyUs as w}
            <div style="display: flex; gap: 12px; font-size: 14px;">
              <span style="color: rgba(255,255,255,0.3); font-family: var(--font-mono); flex-shrink: 0;">→</span>
              <span style="color: rgba(255,255,255,0.6);">{w}</span>
            </div>
          {/each}
        </div>
      </div>
    </ScrollReveal>
  {/if}

  <!-- FAQ -->
  {#if faqs.length}
    <ScrollReveal delay={400}>
      <div style="margin-top: 48px;">
        <h2 class="font-display" style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.4px; margin-bottom: 20px;">COMMON QUESTIONS</h2>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          {#each faqs as f}
            <details class="card-glow group" style="padding: 18px 22px;">
              <summary style="font-weight: 500; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 14px;">
                {f.q}
                <span style="color: rgba(255,255,255,0.3); transition: transform 0.3s; font-family: var(--font-mono); font-size: 18px;" class="group-open:rotate-45">+</span>
              </summary>
              <p style="margin-top: 12px; color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.7;">{f.a}</p>
            </details>
          {/each}
        </div>
      </div>
    </ScrollReveal>
  {/if}

  <!-- CTA -->
  <ScrollReveal delay={500}>
    <div class="card-glow" style="margin-top: 56px; padding: 40px; text-align: center; position: relative; overflow: hidden;">
      <div class="absolute inset-0 bg-dots" style="opacity: 0.2;"></div>
      <div style="position: relative;">
        <div style="font-family: var(--font-mono); font-size: 18px; font-weight: 400;">READY TO SWITCH FROM {competitor.toUpperCase()}?</div>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin-top: 8px;">Migrate in minutes. Free forever.</p>
        <a href="/app" class="btn-primary" style="margin-top: 20px;">SIGN IN WITH GOOGLE</a>
      </div>
    </div>
  </ScrollReveal>
</article>
