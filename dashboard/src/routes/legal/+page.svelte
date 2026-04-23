<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const items = [
    { href: '/legal/privacy', name: 'Privacy Policy', body: 'What we collect, how we use it, and your rights.' },
    { href: '/legal/terms', name: 'Terms of Service', body: 'The agreement between you and SheetsAPI.' },
    { href: '/legal/cookies', name: 'Cookie Policy', body: 'What cookies and local storage we use.' },
    { href: '/legal/dpa', name: 'Data Processing Agreement', body: 'GDPR/DPDP-aligned DPA for teams.' },
    { href: '/legal/sla', name: 'Service Level Agreement', body: 'Uptime commitments and credits.' },
    { href: '/legal/aup', name: 'Acceptable Use Policy', body: "What you can and can't do with SheetsAPI." },
    { href: '/legal/security', name: 'Security & Disclosure', body: 'Our security posture and disclosure policy.' },
    { href: '/legal/subprocessors', name: 'Subprocessors', body: 'Who we share data with to deliver the service.' }
  ];
</script>

<Seo title="Legal — SheetsAPI" description="Legal documents for SheetsAPI: privacy policy, terms of service, cookies, DPA, SLA, acceptable use, subprocessors, security." canonical="/legal" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">COMPLIANCE</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">LEGAL</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:480px;line-height:1.7;">Our commitments to you, in plain English.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 gap-5">
      {#each items as item, i}
        <ScrollReveal delay={i * 60}>
          <a href={item.href} style="text-decoration:none;display:block;">
            <Card3D maxTilt={2}>
              <div class="card-glow" style="padding:24px;height:100%;">
                <div style="font-weight:500;font-size:15px;margin-bottom:6px;">{item.name}</div>
                <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;">{item.body}</p>
              </div>
            </Card3D>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
