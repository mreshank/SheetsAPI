<script lang="ts">
  import Seo from './Seo.svelte';
  import ScrollReveal from './ScrollReveal.svelte';
  import { articleSchema, breadcrumbSchema } from './schema';

  let {
    slug,
    title,
    description,
    date,
    children
  }: { slug: string; title: string; description: string; date: string; children: any } = $props();

  const canonical = `/blog/${slug}`;
  const url = `https://sheets.mreshank.com${canonical}`;
  const schema = [
    articleSchema({ headline: title, description, url, datePublished: date }),
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Blog', url: 'https://sheets.mreshank.com/blog' },
      { name: title, url }
    ])
  ];
</script>

<Seo {title} {description} {canonical} og={{ type: 'article' }} {schema} />

<article class="max-w-3xl mx-auto px-6 py-16">
  <ScrollReveal>
    <nav style="font-size: 13px; color: rgba(255,255,255,0.3); margin-bottom: 24px; font-family: var(--font-mono);">
      <a href="/blog" style="color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s;" class="hover:text-white">BLOG</a>
      <span style="margin: 0 8px;">→</span>
      <span>{date}</span>
    </nav>
    <h1 style="font-family: var(--font-mono); font-size: clamp(28px, 4vw, 44px); font-weight: 300; margin-bottom: 12px; line-height: 1.2;">
      {title}
    </h1>
    <p style="color: rgba(255,255,255,0.5); font-size: 17px; line-height: 1.7;">
      {description}
    </p>
  </ScrollReveal>

  <div class="prose-dark" style="margin-top: 40px; color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8;">
    {@render children()}
  </div>

  <ScrollReveal>
    <div class="card-glow" style="margin-top: 56px; padding: 40px; text-align: center; position: relative; overflow: hidden;">
      <div class="absolute inset-0 bg-dots" style="opacity: 0.2;"></div>
      <div style="position: relative;">
        <div style="font-family: var(--font-mono); font-size: 18px; font-weight: 400;">READY TO TRY SHEETSAPI?</div>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin-top: 8px;">Connect your first sheet in 30 seconds.</p>
        <a href="/app" class="btn-primary" style="margin-top: 20px;">SIGN IN WITH GOOGLE</a>
      </div>
    </div>
  </ScrollReveal>
</article>

<style>
  .prose-dark :global(h2) {
    font-family: var(--font-mono);
    font-size: 20px;
    font-weight: 500;
    margin-top: 40px;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
  }
  .prose-dark :global(h3) {
    font-size: 16px;
    font-weight: 500;
    margin-top: 28px;
    margin-bottom: 12px;
    color: rgba(255,255,255,0.9);
  }
  .prose-dark :global(pre) {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 16px;
    font-size: 13px;
    font-family: var(--font-mono);
    overflow-x: auto;
    margin: 16px 0;
    color: rgba(255,255,255,0.7);
  }
  .prose-dark :global(code) {
    font-family: var(--font-mono);
    font-size: 13px;
    background: rgba(255,255,255,0.06);
    padding: 2px 6px;
  }
  .prose-dark :global(pre code) {
    background: none;
    padding: 0;
  }
  .prose-dark :global(a) {
    color: rgba(255,255,255,0.8);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .prose-dark :global(a:hover) {
    color: #ffffff;
  }
  .prose-dark :global(ul), .prose-dark :global(ol) {
    padding-left: 20px;
  }
  .prose-dark :global(li) {
    margin-bottom: 6px;
  }
  .prose-dark :global(p) {
    margin-bottom: 16px;
  }
  .prose-dark :global(strong) {
    color: rgba(255,255,255,0.9);
    font-weight: 500;
  }
</style>
