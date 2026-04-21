<script lang="ts">
  import '../app.css';
  import { session, logout } from '$lib/session';
  import { goto } from '$app/navigation';

  let { children } = $props();
  let mobileOpen = $state(false);

  async function signOut() {
    logout();
    await goto('/');
  }
</script>

<div class="min-h-screen flex flex-col">
  <header class="border-b border-slate-200 bg-white sticky top-0 z-20">
    <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 font-semibold text-lg">
        <span class="inline-block w-8 h-8 rounded-lg bg-brand-500 text-white grid place-items-center text-sm">S</span>
        SheetsAPI
      </a>
      <nav class="hidden md:flex items-center gap-1 text-sm">
        <a href="/features" class="btn-ghost">Features</a>
        <a href="/use-cases" class="btn-ghost">Use cases</a>
        <a href="/compare" class="btn-ghost">Compare</a>
        <a href="/templates" class="btn-ghost">Templates</a>
        <a href="/tools" class="btn-ghost">Tools</a>
        <a href="/pricing" class="btn-ghost">Pricing</a>
        <a href="/docs" class="btn-ghost">Docs</a>
        <a href="/blog" class="btn-ghost">Blog</a>
        {#if $session}
          <a href="/app" class="btn-secondary ml-2">Dashboard</a>
          <button class="btn-ghost" onclick={signOut}>Sign out</button>
        {:else}
          <a href="/app" class="btn-primary ml-2">Sign in</a>
        {/if}
      </nav>
      <button class="md:hidden btn-ghost" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Menu">☰</button>
    </div>
    {#if mobileOpen}
      <div class="md:hidden border-t border-slate-200 p-4 flex flex-col gap-1">
        <a href="/features" class="btn-ghost justify-start">Features</a>
        <a href="/use-cases" class="btn-ghost justify-start">Use cases</a>
        <a href="/compare" class="btn-ghost justify-start">Compare</a>
        <a href="/templates" class="btn-ghost justify-start">Templates</a>
        <a href="/tools" class="btn-ghost justify-start">Tools</a>
        <a href="/pricing" class="btn-ghost justify-start">Pricing</a>
        <a href="/docs" class="btn-ghost justify-start">Docs</a>
        <a href="/blog" class="btn-ghost justify-start">Blog</a>
        <a href="/app" class="btn-primary mt-2">{$session ? 'Dashboard' : 'Sign in'}</a>
      </div>
    {/if}
  </header>

  <main class="flex-1">{@render children()}</main>

  <footer class="border-t border-slate-200 bg-white mt-20">
    <div class="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-4 gap-8 text-sm">
      <div>
        <div class="font-semibold mb-3">SheetsAPI</div>
        <p class="text-slate-500">Turn any Google Sheet into a REST API. Free. OAuth-based. Open.</p>
      </div>
      <div>
        <div class="font-semibold mb-3">Product</div>
        <ul class="space-y-2 text-slate-600">
          <li><a href="/features" class="hover:text-slate-900">Features</a></li>
          <li><a href="/pricing" class="hover:text-slate-900">Pricing</a></li>
          <li><a href="/templates" class="hover:text-slate-900">Templates</a></li>
          <li><a href="/tools" class="hover:text-slate-900">Free tools</a></li>
          <li><a href="/changelog" class="hover:text-slate-900">Changelog</a></li>
          <li><a href="/status" class="hover:text-slate-900">Status</a></li>
        </ul>
      </div>
      <div>
        <div class="font-semibold mb-3">Resources</div>
        <ul class="space-y-2 text-slate-600">
          <li><a href="/docs" class="hover:text-slate-900">Docs</a></li>
          <li><a href="/blog" class="hover:text-slate-900">Blog</a></li>
          <li><a href="/faq" class="hover:text-slate-900">FAQ</a></li>
          <li><a href="/use-cases" class="hover:text-slate-900">Use cases</a></li>
          <li><a href="/compare" class="hover:text-slate-900">Compare</a></li>
          <li><a href="/security" class="hover:text-slate-900">Security</a></li>
        </ul>
      </div>
      <div>
        <div class="font-semibold mb-3">Legal</div>
        <ul class="space-y-2 text-slate-600">
          <li><a href="/legal/privacy" class="hover:text-slate-900">Privacy</a></li>
          <li><a href="/legal/terms" class="hover:text-slate-900">Terms</a></li>
          <li><a href="/legal/cookies" class="hover:text-slate-900">Cookies</a></li>
          <li><a href="/legal/dpa" class="hover:text-slate-900">DPA</a></li>
          <li><a href="/legal/sla" class="hover:text-slate-900">SLA</a></li>
          <li><a href="/legal/aup" class="hover:text-slate-900">Acceptable Use</a></li>
          <li><a href="/legal/subprocessors" class="hover:text-slate-900">Subprocessors</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-500 flex justify-between">
        <div>© {new Date().getFullYear()} SheetsAPI. All rights reserved.</div>
        <div>Built with SvelteKit + Cloudflare.</div>
      </div>
    </div>
  </footer>
</div>
