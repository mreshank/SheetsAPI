<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  onMount(() => goto('/legal/privacy', { replaceState: true }));
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0;url=/legal/privacy" />
  <link rel="canonical" href="https://sheets.mreshank.com/legal/privacy" />
</svelte:head>

<p class="p-8 text-slate-500">Redirecting to <a href="/legal/privacy" class="text-brand-600 underline">Privacy Policy</a>…</p>
