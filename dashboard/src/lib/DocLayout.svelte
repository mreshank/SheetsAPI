<script lang="ts">
  import Seo from './Seo.svelte';
  import ScrollReveal from './ScrollReveal.svelte';
  import { breadcrumbSchema } from './schema';

  let {
    slug,
    title,
    description,
    children
  }: {
    slug: string;
    title: string;
    description: string;
    children: any;
  } = $props();

  const nav = [
    { href: '/docs/quickstart', label: 'Quickstart' },
    { href: '/docs/authentication', label: 'Authentication' },
    { href: '/docs/rest-api', label: 'REST API' },
    { href: '/docs/search-and-filters', label: 'Search & filters' },
    { href: '/docs/errors', label: 'Errors' },
    { href: '/docs/rate-limits', label: 'Rate limits' },
    { href: '/docs/sdks', label: 'SDKs' },
    { href: '/docs/webhooks', label: 'Webhooks' }
  ];

  const canonical = `/docs/${slug}`;
  const schema = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sheets.mreshank.com/' },
      { name: 'Docs', url: 'https://sheets.mreshank.com/docs' },
      { name: title, url: `https://sheets.mreshank.com${canonical}` }
    ])
  ];
</script>

<Seo {title} {description} {canonical} {schema} />

<div class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[220px_1fr] gap-12">
  <!-- Sidebar -->
  <aside>
    <div class="font-display text-xs uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.4);">
      <a href="/docs" style="color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s;" class="hover:text-white">← Docs</a>
    </div>
    <nav style="display: flex; flex-direction: column; gap: 2px;">
      {#each nav as n}
        <a
          href={n.href}
          style="
            display: block;
            padding: 6px 12px;
            font-size: 13px;
            color: {canonical === n.href ? '#ffffff' : 'rgba(255,255,255,0.4)'};
            background: {canonical === n.href ? 'rgba(255,255,255,0.06)' : 'transparent'};
            border-left: 2px solid {canonical === n.href ? 'rgba(255,255,255,0.5)' : 'transparent'};
            text-decoration: none;
            transition: all 0.2s;
          "
        >
          {n.label}
        </a>
      {/each}
    </nav>
  </aside>

  <!-- Content -->
  <article class="prose-dark">
    <ScrollReveal>
      <div class="text-mono-label" style="margin-bottom: 12px;">DOCS / {slug.toUpperCase().replace(/-/g, ' ')}</div>
      <h1 style="font-family: var(--font-mono); font-size: clamp(28px, 4vw, 44px); font-weight: 300; margin-bottom: 12px;">
        {title}
      </h1>
      <p style="color: rgba(255,255,255,0.5); font-size: 16px; margin-bottom: 40px; line-height: 1.7;">
        {description}
      </p>
    </ScrollReveal>
    <div style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.8;">
      {@render children()}
    </div>
  </article>
</div>

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
    color: rgba(255,255,255,0.8);
  }
  .prose-dark :global(pre code) {
    background: none;
    padding: 0;
  }
  .prose-dark :global(a) {
    color: rgba(255,255,255,0.8);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
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
  .prose-dark :global(strong), .prose-dark :global(b) {
    color: rgba(255,255,255,0.9);
    font-weight: 500;
  }
  .prose-dark :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;
  }
  .prose-dark :global(th) {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    font-weight: 400;
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .prose-dark :global(td) {
    padding: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.6);
  }
</style>
