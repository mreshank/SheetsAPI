<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';

  const items = [
    { slug: 'contact-form', name: 'Contact Form', body: 'Classic name/email/message backing for your landing page.' },
    { slug: 'crm', name: 'Simple CRM', body: 'Leads, contacts, deals, stage tracking.' },
    { slug: 'event-rsvp', name: 'Event RSVP', body: 'Capture RSVPs with guest count, dietary prefs, notes.' },
    { slug: 'guestbook', name: 'Guestbook', body: 'Public message board for a portfolio or event site.' },
    { slug: 'feedback-form', name: 'Feedback Form', body: 'User feedback with rating, category, message.' },
    { slug: 'lead-capture', name: 'Lead Capture', body: 'Landing page lead-gen with source tracking and UTMs.' }
  ];
</script>

<Seo title="Templates — ready-made Google Sheets for SheetsAPI" description="Ready-to-use Google Sheets templates for SheetsAPI: contact forms, CRM, event RSVPs, guestbooks, feedback, and lead capture." canonical="/templates" />

<section style="padding:72px 0 48px;position:relative;">
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <div class="animate-fade-in-up">
      <div class="text-mono-label" style="margin-bottom:16px;">STARTERS</div>
      <h1 class="text-hero" style="font-size:clamp(32px,5vw,56px);margin-bottom:16px;">TEMPLATES</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:17px;max-width:520px;line-height:1.7;">Pre-built schemas for common use cases. Copy the columns, connect with SheetsAPI, and start shipping.</p>
    </div>
  </div>
</section>

<section style="padding:0 0 96px;">
  <div class="max-w-5xl mx-auto px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each items as t, i}
        <ScrollReveal delay={i * 80}>
          <a href="/templates/{t.slug}" style="text-decoration:none;display:block;">
            <Card3D maxTilt={2}>
              <div class="card-glow" style="padding:24px;height:100%;">
                <div style="font-weight:500;font-size:15px;margin-bottom:6px;">{t.name}</div>
                <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.5;">{t.body}</p>
              </div>
            </Card3D>
          </a>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
