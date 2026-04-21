<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="search-and-filters"
  title="Search & filters"
  description="Filter, sort, paginate, select fields, and change output formats — all through query parameters on the GET list endpoint."
>
  <h2 class="text-2xl font-semibold mt-10">Pagination</h2>
  <pre class="code mt-2">?limit=50&offset=100</pre>
  <p class="mt-2">Maximum <code>limit</code> is 1000.</p>

  <h2 class="text-2xl font-semibold mt-10">Substring search</h2>
  <pre class="code mt-2">?search=name:Ada</pre>
  <p class="mt-2">Case-insensitive. Combine fields with commas: <code>?search=name:Ada,status:active</code> (all must match).</p>

  <h2 class="text-2xl font-semibold mt-10">Exact match</h2>
  <pre class="code mt-2">?search_exact=email:ada@example.com</pre>

  <h2 class="text-2xl font-semibold mt-10">Sort</h2>
  <pre class="code mt-2">?sort=age        # ascending
?sort=-age       # descending</pre>
  <p class="mt-2">Numeric columns sort numerically; other columns sort lexicographically.</p>

  <h2 class="text-2xl font-semibold mt-10">Field selection</h2>
  <pre class="code mt-2">?fields=name,email</pre>

  <h2 class="text-2xl font-semibold mt-10">Output formats</h2>
  <pre class="code mt-2">?format=json      # default
?format=csv       # text/csv
?format=tsv       # text/tab-separated-values
?format=xml       # application/xml
?format=jsonp&callback=myFn</pre>

  <h2 class="text-2xl font-semibold mt-10">Combine them</h2>
  <pre class="code mt-2">?search=stage:qualified&sort=-last_touched&limit=20&fields=name,email,value</pre>
</DocLayout>
