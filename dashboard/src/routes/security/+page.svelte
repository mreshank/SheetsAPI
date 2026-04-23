<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
</script>

<Seo
  title="Security — SheetsAPI"
  description="How SheetsAPI secures your data: encrypted OAuth tokens at rest, HTTPS everywhere, Cloudflare edge protection, minimal data footprint, transparent disclosure policy."
  canonical="/security"
/>

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-3xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">TRUST</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">SECURITY</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:520px;line-height:1.7;">
        Our architecture is designed around one principle: keep user data in the user's Google account, and minimize what we hold.
      </p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-3xl mx-auto px-6" style="display:flex;flex-direction:column;gap:32px;">

    <ScrollReveal>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">WHAT WE STORE</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          {#each ['Your Google account ID (sub) and email address', 'An AES-GCM-256 encrypted OAuth refresh token', 'The spreadsheet and tab identifiers you register', 'The API keys you create'] as item}
            <div style="display:flex;gap:10px;font-size:14px;">
              <span style="color:rgba(255,255,255,0.3);font-family:var(--font-mono);flex-shrink:0;">→</span>
              <span style="color:rgba(255,255,255,0.6);">{item}</span>
            </div>
          {/each}
        </div>
        <p style="margin-top:14px;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;">We do <strong style="color:rgba(255,255,255,0.8);">not</strong> store row data from your spreadsheets. Every API call fetches live from Google.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">ENCRYPTION</div>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin-bottom:10px;"><strong style="color:rgba(255,255,255,0.8);">At rest:</strong> AES-GCM with a 256-bit key and a fresh 96-bit IV per record. Key is held as a Cloudflare Worker secret, separate from the database.</p>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;"><strong style="color:rgba(255,255,255,0.8);">In transit:</strong> TLS 1.3 enforced across all endpoints.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">ACCESS & REVOCATION</div>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;">Sign out from the dashboard or revoke our app at <a href="https://myaccount.google.com/permissions" style="color:rgba(255,255,255,0.8);text-decoration:underline;">myaccount.google.com/permissions</a>. Either path invalidates our access within seconds.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={300}>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">INFRASTRUCTURE</div>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;">Built on Cloudflare (Workers, D1, Pages). Cloudflare's ISO 27001, SOC 2, and PCI DSS certifications apply to the underlying infrastructure.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={400}>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">RESPONSIBLE DISCLOSURE</div>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;">Report vulnerabilities to <a href="mailto:security@mreshank.com" style="color:rgba(255,255,255,0.8);text-decoration:underline;">security@mreshank.com</a>. We commit to acknowledging within 48 hours and patching high-severity issues within 7 days.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal delay={500}>
      <div class="card-glow" style="padding:28px;">
        <div class="font-display" style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.4);margin-bottom:14px;">FURTHER READING</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          {#each [
            { href: '/legal/privacy', label: 'Privacy Policy' },
            { href: '/legal/dpa', label: 'Data Processing Agreement' },
            { href: '/legal/subprocessors', label: 'Subprocessors' }
          ] as link}
            <a href={link.href} style="display:flex;gap:10px;font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;transition:color 0.2s;" class="hover:text-white">
              <span style="color:rgba(255,255,255,0.3);font-family:var(--font-mono);">→</span>
              {link.label}
            </a>
          {/each}
        </div>
      </div>
    </ScrollReveal>

  </div>
</section>
