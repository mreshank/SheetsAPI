<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { session } from '$lib/session';
  import { api } from '$lib/api';
  import { API_BASE } from '$lib/config';

  let working = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    const p = $page.url.searchParams;
    const ssId = p.get('spreadsheet_id');
    if (!ssId) {
      error = 'No spreadsheet_id provided';
      working = false;
      return;
    }
    if (!$session) {
      const returnTo = window.location.href;
      window.location.href = `${API_BASE}/api/oauth/start?return_to=${encodeURIComponent(returnTo)}`;
      return;
    }
    try {
      await api.addSpreadsheet(ssId, undefined, true);
      await goto('/app');
    } catch (e) {
      error = (e as Error).message;
      working = false;
    }
  });
</script>

<div class="max-w-xl mx-auto px-6 py-24 text-center">
  {#if working}
    <h1 style="font-family:var(--font-mono);font-size:24px;font-weight:300;margin-bottom:8px;">CONNECTING SHEET…</h1>
    <p style="color:rgba(255,255,255,0.4);font-size:14px;">Just a moment.</p>
  {:else if error}
    <h1 style="font-family:var(--font-mono);font-size:24px;font-weight:300;margin-bottom:8px;color:#ef4444;">COULDN'T CONNECT</h1>
    <p style="color:rgba(255,255,255,0.5);font-size:14px;">{error}</p>
    <a href="/app" class="btn-primary" style="margin-top:24px;">GO TO DASHBOARD</a>
  {/if}
</div>
