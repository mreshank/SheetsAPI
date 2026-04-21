// Reusable JSON-LD schema blocks

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SheetsAPI',
  url: 'https://sheets.mreshank.com',
  logo: 'https://sheets.mreshank.com/favicon.svg',
  sameAs: ['https://github.com/mreshank/sheetsapi']
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SheetsAPI',
  url: 'https://sheets.mreshank.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://sheets.mreshank.com/docs?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SheetsAPI',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web, Cloud',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1'
  }
};

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a }
    }))
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url
    }))
  };
}

export function articleSchema(a: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    url: a.url,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { '@type': 'Organization', name: 'SheetsAPI' },
    publisher: { '@type': 'Organization', name: 'SheetsAPI' }
  };
}
