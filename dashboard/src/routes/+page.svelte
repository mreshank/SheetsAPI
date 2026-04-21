<script lang="ts">
  import { API_BASE } from '$lib/config';
  import { onMount } from 'svelte';
  import { setSession, session } from '$lib/session';
  import { goto } from '$app/navigation';

  const dashUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const loginHref = `${API_BASE}/api/oauth/start?return_to=${encodeURIComponent(dashUrl + '/app')}`;

  onMount(() => {
    // If Google redirected us back with ?userKey=... handle it here for users who land on /
    const p = new URLSearchParams(window.location.search);
    const userKey = p.get('userKey');
    const email = p.get('email');
    if (userKey && email) {
      setSession({ userKey, email });
      window.history.replaceState({}, '', '/app');
      goto('/app');
    }
  });
</script>

<section class="max-w-6xl mx-auto px-6 py-24 text-center">
  <h1 class="text-5xl font-bold tracking-tight">Your Google Sheet. As a REST API.</h1>
  <p class="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
    Connect a spreadsheet in 30 seconds. Read, append, update, and delete rows with GET/POST/PUT/DELETE.
    No server. No plan limits on your data.
  </p>
  <div class="mt-10 flex items-center justify-center gap-3">
    {#if $session}
      <a href="/app" class="btn-primary">Open Dashboard →</a>
    {:else}
      <a href={loginHref} class="btn-primary">Connect Google Sheets</a>
    {/if}
    <a href="/docs" class="btn-secondary">Read the docs</a>
  </div>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24">
  <div class="card p-6">
    <div class="text-sm font-semibold text-slate-500 mb-2">Example</div>
    <pre class="code">{`curl '${API_BASE}/api/spreadsheets/abc123/leads'
[
  { "name": "Ada Lovelace", "email": "ada@example.com" },
  { "name": "Alan Turing",  "email": "alan@example.com" }
]`}</pre>
  </div>

  <div class="mt-10 grid sm:grid-cols-3 gap-4">
    <div class="card p-5">
      <div class="text-sm font-semibold">1. Connect</div>
      <p class="text-sm text-slate-600 mt-1">Sign in with Google. We only access sheets you register.</p>
    </div>
    <div class="card p-5">
      <div class="text-sm font-semibold">2. Register a sheet</div>
      <p class="text-sm text-slate-600 mt-1">Paste a Google Sheet URL. First row = JSON keys.</p>
    </div>
    <div class="card p-5">
      <div class="text-sm font-semibold">3. Call the API</div>
      <p class="text-sm text-slate-600 mt-1">GET, POST, PUT, DELETE. Optional API keys per user.</p>
    </div>
  </div>
</section>
