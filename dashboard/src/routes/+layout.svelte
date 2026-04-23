<script lang="ts">
  import '../app.css';
  import { session, logout } from '$lib/session';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let { children } = $props();
  let mobileOpen = $state(false);
  let scrolled = $state(false);

  async function signOut() {
    logout();
    await goto('/');
  }

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Global scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/use-cases', label: 'Use Cases' },
    { href: '/compare', label: 'Compare' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Docs' },
    { href: '/blog', label: 'Blog' }
  ];
</script>

<div class="min-h-screen flex flex-col" style="background-color: var(--color-bg);">
  <!-- ─── Navbar ─── -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    class:glass={scrolled}
    style="border-bottom: 1px solid {scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Brand -->
      <a href="/" class="flex items-center gap-3 group" style="text-decoration: none;">
        <img src="/logo-64.webp" alt="SheetsAPI" width="28" height="28" style="display:block;" />
        <span class="font-brand text-base tracking-wider" style="letter-spacing: 2.5px; text-transform: uppercase; color: #ffffff; font-size: 15px;">
          SheetsAPI
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <a href={link.href} class="btn-nav">{link.label}</a>
        {/each}
        <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.1); margin: 0 8px;"></div>
        {#if $session}
          <a href="/app" class="btn-ghost" style="padding: 8px 16px; font-size: 12px;">DASHBOARD</a>
          <button class="btn-nav" style="opacity: 0.5;" onclick={signOut}>Sign out</button>
        {:else}
          <a href="/app" class="btn-primary" style="padding: 8px 20px; font-size: 12px;">GET STARTED</a>
        {/if}
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden"
        style="background: none; border: 1px solid rgba(255,255,255,0.2); padding: 8px 12px; color: #fff; font-family: var(--font-mono); font-size: 12px; cursor: pointer;"
        onclick={() => (mobileOpen = !mobileOpen)}
        aria-label="Menu"
      >
        {#if mobileOpen}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="1" y1="4" x2="15" y2="4"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="12" x2="15" y2="12"/></svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileOpen}
      <div
        class="md:hidden animate-fade-in"
        style="
          background: var(--color-bg);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 24px;
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 4px;
        "
      >
        {#each navLinks as link, i}
          <a
            href={link.href}
            class="animate-fade-in-up"
            style="
              display: block;
              padding: 16px 0;
              font-family: var(--font-mono);
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1.4px;
              color: #ffffff;
              text-decoration: none;
              border-bottom: 1px solid rgba(255,255,255,0.06);
              animation-delay: {i * 60}ms;
            "
            onclick={() => (mobileOpen = false)}
          >
            {link.label}
          </a>
        {/each}

        <div style="margin-top: 24px;">
          {#if $session}
            <a href="/app" class="btn-ghost" style="width: 100%; text-align: center;" onclick={() => (mobileOpen = false)}>DASHBOARD</a>
          {:else}
            <a href="/app" class="btn-primary" style="width: 100%; text-align: center;" onclick={() => (mobileOpen = false)}>GET STARTED</a>
          {/if}
        </div>
      </div>
    {/if}
  </header>

  <!-- ─── Main Content ─── -->
  <main class="flex-1" style="padding-top: 72px;">
    <div class="page-transition-enter">
      {@render children()}
    </div>
  </main>

  <!-- ─── Footer ─── -->
  <footer style="border-top: 1px solid rgba(255,255,255,0.06); margin-top: 0;">
    <div class="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <!-- Brand column -->
      <div>
        <div class="font-brand text-sm" style="text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 12px;">SheetsAPI</div>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6;">
          Turn any Google Sheet into a REST API. Free. OAuth-based. Open.
        </p>
      </div>

      <!-- Product -->
      <div>
        <div class="text-mono-label" style="margin-bottom: 16px;">Product</div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
          <li><a href="/features" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Features</a></li>
          <li><a href="/pricing" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Pricing</a></li>
          <li><a href="/templates" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Templates</a></li>
          <li><a href="/tools" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Free tools</a></li>
          <li><a href="/changelog" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Changelog</a></li>
          <li><a href="/status" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Status</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div>
        <div class="text-mono-label" style="margin-bottom: 16px;">Resources</div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
          <li><a href="/docs" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Docs</a></li>
          <li><a href="/blog" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Blog</a></li>
          <li><a href="/faq" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>FAQ</a></li>
          <li><a href="/use-cases" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Use cases</a></li>
          <li><a href="/compare" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Compare</a></li>
          <li><a href="/security" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Security</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <div class="text-mono-label" style="margin-bottom: 16px;">Legal</div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
          <li><a href="/legal/privacy" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Privacy</a></li>
          <li><a href="/legal/terms" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Terms</a></li>
          <li><a href="/legal/cookies" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Cookies</a></li>
          <li><a href="/legal/dpa" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>DPA</a></li>
          <li><a href="/legal/sla" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>SLA</a></li>
          <li><a href="/legal/subprocessors" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: opacity 0.3s;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>Subprocessors</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div style="border-top: 1px solid rgba(255,255,255,0.06);">
      <div class="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center" style="font-size: 12px;">
        <div style="color: rgba(255,255,255,0.3); font-family: var(--font-pixel); letter-spacing: 1px; font-size: 12px;">
          © {new Date().getFullYear()} SHEETSAPI
        </div>
        <div style="color: rgba(255,255,255,0.2); font-family: var(--font-pixel); font-size: 11px; letter-spacing: 1px;">
          SVELTEKIT + CLOUDFLARE
        </div>
      </div>
    </div>
  </footer>
</div>
