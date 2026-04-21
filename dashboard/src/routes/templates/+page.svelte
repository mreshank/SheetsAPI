<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const items = [
    { slug: 'contact-form', name: 'Contact Form', body: 'Classic name/email/message backing for your landing page.' },
    { slug: 'crm', name: 'Simple CRM', body: 'Leads, contacts, deals, stage tracking.' },
    { slug: 'event-rsvp', name: 'Event RSVP', body: 'Capture RSVPs with guest count, dietary prefs, notes.' },
    { slug: 'guestbook', name: 'Guestbook', body: 'Public message board for a portfolio or event site.' },
    { slug: 'feedback-form', name: 'Feedback Form', body: 'User feedback with rating, category, message.' },
    { slug: 'lead-capture', name: 'Lead Capture', body: 'Landing page lead-gen with source tracking and UTMs.' }
  ];
</script>

<Seo
  title="Templates — ready-made Google Sheets for SheetsAPI"
  description="Ready-to-use Google Sheets templates for SheetsAPI: contact forms, CRM, event RSVPs, guestbooks, feedback, and lead capture. Copy, connect, ship."
  canonical="/templates"
/>

<section class="max-w-5xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Templates</h1>
  <p class="mt-3 text-lg text-slate-600 max-w-2xl">Pre-built spreadsheet schemas for common use cases. Copy the columns, connect with SheetsAPI, and start shipping.</p>
</section>

<section class="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each items as t}
    <a href="/templates/{t.slug}" class="card p-6 hover:ring-brand-500 transition">
      <div class="font-semibold">{t.name}</div>
      <p class="text-sm text-slate-600 mt-1">{t.body}</p>
    </a>
  {/each}
</section>
