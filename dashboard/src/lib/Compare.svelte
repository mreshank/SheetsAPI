<script lang="ts">
  import Seo from './Seo.svelte';
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
  <nav class="text-sm text-slate-500 mb-4">
    <a href="/compare" class="hover:text-slate-900">Compare</a> / {competitor}
  </nav>
  <h1 class="text-4xl font-semibold tracking-tight">{title}</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">{tagline}</p>

  <div class="mt-10 card p-6">
    <h2 class="font-semibold">TL;DR</h2>
    <p class="mt-2 text-slate-700">{summary}</p>
  </div>

  <div class="mt-10">
    <h2 class="text-2xl font-semibold mb-4">Feature comparison</h2>
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr class="text-left">
            <th class="p-3">Feature</th>
            <th class="p-3 text-brand-700">SheetsAPI</th>
            <th class="p-3">{competitor}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each matrix as r}
            <tr>
              <td class="p-3 font-medium">{r.feature}</td>
              <td class="p-3 text-brand-700">{r.us}</td>
              <td class="p-3 text-slate-600">{r.them}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  {#if whyUs.length}
    <div class="mt-10">
      <h2 class="text-2xl font-semibold mb-4">Why teams switch to SheetsAPI</h2>
      <ul class="space-y-2">
        {#each whyUs as w}
          <li class="flex gap-3"><span class="text-brand-500 font-bold">✓</span><span class="text-slate-700">{w}</span></li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if faqs.length}
    <div class="mt-14">
      <h2 class="text-2xl font-semibold mb-4">Common questions</h2>
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

  <div class="mt-14 card p-8 bg-brand-50 text-center">
    <div class="text-xl font-semibold">Ready to switch from {competitor}?</div>
    <p class="text-slate-600 mt-2">Migrate in minutes. Free forever.</p>
    <a href="/app" class="btn-primary mt-4 inline-flex">Sign in with Google</a>
  </div>
</article>
