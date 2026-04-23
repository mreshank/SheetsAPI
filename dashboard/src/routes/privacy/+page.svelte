<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  onMount(() => goto('/legal/privacy', { replaceState: true }));
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0;url=/legal/privacy" />
  <link rel="canonical" href="https://sheets.mreshank.com/legal/privacy" />
</svelte:head>

<p style="padding:32px;color:rgba(255,255,255,0.4);font-family:var(--font-mono);font-size:13px;">Redirecting to <a href="/legal/privacy" style="color:rgba(255,255,255,0.7);text-decoration:underline;">Privacy Policy</a>…</p>
