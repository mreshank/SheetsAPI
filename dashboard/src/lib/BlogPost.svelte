<script lang="ts">
  import Seo from './Seo.svelte';
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

<article class="max-w-3xl mx-auto px-6 py-16 prose">
  <nav class="text-sm text-slate-500 mb-4">
    <a href="/blog" class="hover:text-slate-900">Blog</a> / {date}
  </nav>
  <h1 class="text-4xl font-semibold tracking-tight">{title}</h1>
  <p class="mt-3 text-lg text-slate-600">{description}</p>
  <div class="mt-10 text-slate-700 leading-relaxed space-y-4">
    {@render children()}
  </div>
  <div class="mt-14 card p-8 bg-brand-50 text-center">
    <div class="font-semibold">Ready to try SheetsAPI?</div>
    <a href="/app" class="btn-primary mt-4 inline-flex">Sign in with Google</a>
  </div>
</article>
