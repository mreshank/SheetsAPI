<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';

  const components = [
    { name: 'API — sheets.mreshank.com', status: 'operational' },
    { name: 'Dashboard — sheets.mreshank.com', status: 'operational' },
    { name: 'OAuth — Google', status: 'operational' },
    { name: 'Google Sheets API', status: 'operational' },
    { name: 'Cloudflare D1', status: 'operational' }
  ];

  const days = Array.from({ length: 90 }, () => 'up');
</script>

<Seo title="Status — SheetsAPI" description="SheetsAPI service status, uptime history, and incidents." canonical="/status" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-4xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">OPERATIONS</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">STATUS</h1>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-4xl mx-auto px-6" style="display:flex;flex-direction:column;gap:16px;">

    <ScrollReveal>
      <div class="card-glow" style="padding:24px;border-color:rgba(34,197,94,0.3);">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="width:10px;height:10px;border-radius:50%;background:#22c55e;display:block;"></span>
          <span style="font-weight:500;color:rgba(34,197,94,0.9);">All systems operational</span>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <div class="card-glow" style="padding:24px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:16px;">COMPONENTS</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          {#each components as c}
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:14px;">
              <span style="color:rgba(255,255,255,0.6);">{c.name}</span>
              <span style="color:rgba(34,197,94,0.8);font-size:13px;font-family:var(--font-mono);">● {c.status}</span>
            </div>
          {/each}
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <div class="card-glow" style="padding:24px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:16px;">90-DAY UPTIME</div>
        <div style="display:flex;gap:2px;overflow-x:auto;">
          {#each days as _}
            <div style="width:6px;height:32px;background:rgba(34,197,94,0.6);flex-shrink:0;"></div>
          {/each}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);margin-top:8px;font-family:var(--font-mono);">
          <span>90 DAYS AGO</span>
          <span style="color:rgba(34,197,94,0.8);font-weight:500;">100.00% UPTIME</span>
          <span>TODAY</span>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={300}>
      <div class="card-glow" style="padding:24px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:12px;">RECENT INCIDENTS</div>
        <p style="font-size:14px;color:rgba(255,255,255,0.4);">No incidents reported in the last 90 days.</p>
      </div>
    </ScrollReveal>

    <p style="font-size:11px;color:rgba(255,255,255,0.25);margin-top:16px;font-family:var(--font-mono);">
      A full status page with real-time monitoring is planned for v1.0 at status.mreshank.com.
    </p>
  </div>
</section>
