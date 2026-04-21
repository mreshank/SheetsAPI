<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  const items = [
    { href: '/legal/privacy', name: 'Privacy Policy', body: 'What we collect, how we use it, and your rights.' },
    { href: '/legal/terms', name: 'Terms of Service', body: 'The agreement between you and SheetsAPI.' },
    { href: '/legal/cookies', name: 'Cookie Policy', body: 'What cookies and local storage we use.' },
    { href: '/legal/dpa', name: 'Data Processing Agreement', body: 'GDPR/DPDP-aligned DPA for teams.' },
    { href: '/legal/sla', name: 'Service Level Agreement', body: 'Uptime commitments and credits.' },
    { href: '/legal/aup', name: 'Acceptable Use Policy', body: 'What you can and can\'t do with SheetsAPI.' },
    { href: '/legal/security', name: 'Security & Disclosure', body: 'Our security posture and disclosure policy.' },
    { href: '/legal/subprocessors', name: 'Subprocessors', body: 'Who we share data with to deliver the service.' }
  ];
</script>

<Seo title="Legal — SheetsAPI" description="Legal documents for SheetsAPI: privacy policy, terms of service, cookies, DPA, SLA, acceptable use, subprocessors, security." canonical="/legal" />

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Legal</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Our commitments to you, in plain English.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-4">
  {#each items as i}
    <a href={i.href} class="card p-5 hover:ring-brand-500 transition">
      <div class="font-semibold">{i.name}</div>
      <p class="text-sm text-slate-600 mt-1">{i.body}</p>
    </a>
  {/each}
</section>
