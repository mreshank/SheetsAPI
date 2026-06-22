// Query-string processing for GET list endpoint.
// Supports: limit, offset, search, search_exact, sort, fields, format, callback.

export type QueryOptions = {
  limit?: number;
  offset: number;
  search: Array<[string, string]>; // substring, case-insensitive
  searchExact: Array<[string, string]>;
  sort?: { field: string; desc: boolean };
  fields?: string[];
  format: 'json' | 'csv' | 'tsv' | 'xml' | 'jsonp';
  callback?: string;
};

const MAX_LIMIT = 1000;

function parseFilters(raw: string | undefined): Array<[string, string]> {
  if (!raw) return [];
  return raw.split(',').map((pair) => {
    const i = pair.indexOf(':');
    return i < 0 ? [pair, ''] : [pair.slice(0, i), pair.slice(i + 1)];
  });
}

export function parseQuery(url: URL): QueryOptions {
  const p = url.searchParams;
  const limitRaw = p.get('limit');
  const limit = limitRaw ? Math.min(MAX_LIMIT, Math.max(1, parseInt(limitRaw, 10) || 0)) : undefined;
  const offset = Math.max(0, parseInt(p.get('offset') ?? '0', 10) || 0);
  const sortRaw = p.get('sort');
  const sort = sortRaw
    ? { field: sortRaw.startsWith('-') ? sortRaw.slice(1) : sortRaw, desc: sortRaw.startsWith('-') }
    : undefined;
  const fieldsRaw = p.get('fields');
  const fields = fieldsRaw ? fieldsRaw.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
  const formatRaw = (p.get('format') ?? 'json').toLowerCase();
  const format = (['json', 'csv', 'tsv', 'xml', 'jsonp'] as const).find((f) => f === formatRaw) ?? 'json';

  return {
    limit,
    offset,
    search: parseFilters(p.get('search') ?? undefined),
    searchExact: parseFilters(p.get('search_exact') ?? undefined),
    sort,
    fields,
    format,
    callback: p.get('callback') ?? undefined,
  };
}

export function applyQuery(rows: Record<string, string>[], q: QueryOptions): Record<string, string>[] {
  let out = rows;

  if (q.search.length > 0) {
    out = out.filter((r) =>
      q.search.every(([k, v]) => (r[k] ?? '').toLowerCase().includes(v.toLowerCase()))
    );
  }
  if (q.searchExact.length > 0) {
    out = out.filter((r) => q.searchExact.every(([k, v]) => (r[k] ?? '') === v));
  }
  if (q.sort) {
    const { field, desc } = q.sort;
    out = [...out].sort((a, b) => {
      const av = a[field] ?? '';
      const bv = b[field] ?? '';
      const an = Number(av);
      const bn = Number(bv);
      const bothNum = !isNaN(an) && !isNaN(bn) && av !== '' && bv !== '';
      const cmp = bothNum ? an - bn : av.localeCompare(bv);
      return desc ? -cmp : cmp;
    });
  }
  if (q.offset) out = out.slice(q.offset);
  if (q.limit !== undefined) out = out.slice(0, q.limit);
  if (q.fields) {
    const keep = new Set(q.fields);
    out = out.map((r) => {
      const obj: Record<string, string> = {};
      for (const k of keep) if (k in r) obj[k] = r[k];
      return obj;
    });
  }
  return out;
}

function csvEscape(v: string, delim: string): string {
  if (v.includes(delim) || v.includes('"') || v.includes('\n')) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export function formatResponse(
  rows: Record<string, string>[],
  q: QueryOptions,
  headers: string[]
): { body: string; contentType: string } {
  if (q.format === 'json') {
    return { body: JSON.stringify(rows), contentType: 'application/json; charset=utf-8' };
  }
  if (q.format === 'jsonp') {
    const cb = (q.callback ?? 'callback').replace(/[^a-zA-Z0-9_$.]/g, '');
    return {
      body: `${cb}(${JSON.stringify(rows)});`,
      contentType: 'application/javascript; charset=utf-8',
    };
  }
  if (q.format === 'csv' || q.format === 'tsv') {
    const delim = q.format === 'csv' ? ',' : '\t';
    const cols = q.fields ?? headers;
    const header = cols.join(delim);
    const body = rows.map((r) => cols.map((c) => csvEscape(r[c] ?? '', delim)).join(delim)).join('\n');
    return {
      body: header + '\n' + body,
      contentType: q.format === 'csv' ? 'text/csv; charset=utf-8' : 'text/tab-separated-values; charset=utf-8',
    };
  }
  // xml
  const xmlEscape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const parts: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<rows>'];
  for (const r of rows) {
    parts.push('<row>');
    for (const k of Object.keys(r)) {
      parts.push(`<${k}>${xmlEscape(r[k] ?? '')}</${k}>`);
    }
    parts.push('</row>');
  }
  parts.push('</rows>');
  return { body: parts.join(''), contentType: 'application/xml; charset=utf-8' };
}
