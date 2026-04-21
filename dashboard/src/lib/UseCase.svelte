<script lang="ts">
  import Seo from './Seo.svelte';
  import { breadcrumbSchema, faqSchema } from './schema';

  let {
    slug,
    title,
    subtitle,
    description,
    sheetShape,
    code,
    faqs = [] as { q: string; a: string }[],
    children
  }: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    sheetShape: string;
    code: string;
    faqs?: { q: string; a: string }[];
    children?: any;
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

<Seo title={title} description={description} canonical={canonical} schema={schema} />

<article class="max-w-4xl mx-auto px-6 py-16">
  <nav class="text-sm text-slate-500 mb-4">
    <a href="/use-cases" class="hover:text-slate-900">Use cases</a> / {title}
  </nav>
  <h1 class="text-4xl font-semibold tracking-tight">{title}</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">{subtitle}</p>

  <div class="mt-10 card p-6">
    <h2 class="font-semibold">Sheet layout</h2>
    <pre class="code mt-3">{sheetShape}</pre>
  </div>

  <div class="mt-6 card p-6">
    <h2 class="font-semibold">Example integration</h2>
    <pre class="code mt-3">{code}</pre>
  </div>

  {#if children}<div class="mt-10 prose">{@render children()}</div>{/if}

  {#if faqs.length}
    <div class="mt-14">
      <h2 class="text-2xl font-semibold mb-4">FAQ</h2>
      <div class="space-y-3">
        {#each faqs as f}
          <details class="card p-5 group">
            <summary class="font-medium cursor-pointer list-none flex justify-between">{f.q}<span class="text-slate-400 group-open:rotate-45 transition">+</span></summary>
            <p class="mt-3 text-sm text-slate-600">{f.a}</p>
          </details>
        {/each}
      </div>
    </div>
  {/if}

  <div class="mt-14 card p-6 bg-brand-50 text-center">
    <div class="font-semibold">Ready to build this?</div>
    <p class="text-sm text-slate-600 mt-1">Connect your first sheet in 30 seconds.</p>
    <a href="/app" class="btn-primary mt-4 inline-flex">Sign in with Google</a>
  </div>
</article>
