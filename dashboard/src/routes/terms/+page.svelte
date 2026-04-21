<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  onMount(() => goto('/legal/terms', { replaceState: true }));
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0;url=/legal/terms" />
  <link rel="canonical" href="https://sheets.mreshank.com/legal/terms" />
</svelte:head>

<p class="p-8 text-slate-500">Redirecting to <a href="/legal/terms" class="text-brand-600 underline">Terms of Service</a>…</p>
