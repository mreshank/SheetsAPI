<script lang="ts">
  import Seo from './Seo.svelte';
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

<div class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-[240px_1fr] gap-10">
  <aside class="text-sm">
    <div class="font-semibold mb-3"><a href="/docs" class="hover:text-brand-600">Docs</a></div>
    <nav class="space-y-1">
      {#each nav as n}
        <a href={n.href} class="block px-2 py-1 rounded hover:bg-slate-100 text-slate-700">{n.label}</a>
      {/each}
    </nav>
  </aside>
  <article class="prose max-w-none">
    <h1 class="text-4xl font-semibold tracking-tight mb-3">{title}</h1>
    <p class="text-lg text-slate-600 mb-10">{description}</p>
    {@render children()}
  </article>
</div>
