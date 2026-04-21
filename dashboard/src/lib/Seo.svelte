<script lang="ts">
  type JsonLd = Record<string, unknown>;
  type OG = { image?: string; type?: string };

  let {
    title,
    description,
    canonical,
    noindex = false,
    og = {},
    schema = [] as JsonLd[]
  }: {
    title: string;
    description: string;
    canonical: string;
    noindex?: boolean;
    og?: OG;
    schema?: JsonLd[];
  } = $props();

  const SITE = 'https://sheets.mreshank.com';
  const fullTitle = title.includes('SheetsAPI') ? title : `${title} · SheetsAPI`;
  const fullCanonical = canonical.startsWith('http') ? canonical : SITE + canonical;
  const ogImage = og.image ?? `${SITE}/og-default.svg`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={fullCanonical} />
  {#if noindex}
    <meta name="robots" content="noindex,nofollow" />
  {:else}
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
  {/if}

  <!-- Open Graph -->
  <meta property="og:site_name" content="SheetsAPI" />
  <meta property="og:type" content={og.type ?? 'website'} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={fullCanonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content="SheetsAPI — turn any Google Sheet into a REST API" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  {#each schema as block}
    {@html `<script type="application/ld+json">${JSON.stringify(block)}</script>`}
  {/each}
</svelte:head>
