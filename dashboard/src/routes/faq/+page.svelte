<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import { faqSchema } from '$lib/schema';

  const sections = [
    {
      title: 'General',
      items: [
        { q: 'What is SheetsAPI?', a: 'A free, OAuth-based REST API layer over Google Sheets. Sign in with Google, register a sheet, get CRUD endpoints — all in under a minute.' },
        { q: 'Who is it for?', a: 'Developers, no-code builders, startup founders, marketing teams, teachers, hackathon hackers — anyone who wants a backend fast.' },
        { q: 'Is my data safe?', a: 'Your data never leaves your Google Drive. We store only an encrypted OAuth refresh token and minimal metadata. AES-GCM-256 at rest.' }
      ]
    },
    {
      title: 'Technical',
      items: [
        { q: 'How fresh is the data returned?', a: 'Every API request fetches live from Google Sheets. There is no caching by default.' },
        { q: 'Are numbers returned as strings?', a: 'Yes — MVP returns the rendered display value, matching what you see in Sheets. Typed output is on the roadmap.' },
        { q: 'How do I search?', a: 'Use ?search=field:value for substring matching or ?search_exact=field:value for exact. You can also sort with ?sort=-field.' },
        { q: 'Can I paginate?', a: 'Yes: ?limit=50&offset=100. Maximum limit is 1000.' },
        { q: 'Large sheets?', a: 'Combine ?limit and ?offset. For sheets >10,000 rows, consider splitting across tabs and querying in parallel.' },
        { q: 'Formulas?', a: 'Preserved on write. Read returns the computed value.' }
      ]
    },
    {
      title: 'Limits',
      items: [
        { q: 'Rate limits?', a: 'Current: shared Google Sheets quota (300/min/project). Planned: per-userKey limits in v0.5.' },
        { q: 'Maximum body size?', a: 'Workers supports 100 MB. Google Sheets caps at 10 MB per request — the practical limit.' },
        { q: 'How many sheets can I connect?', a: 'Unlimited.' }
      ]
    },
    {
      title: 'Auth',
      items: [
        { q: 'Why OAuth instead of service accounts?', a: 'OAuth is how normal Google apps work — no sharing dance, no invisible emails in your sheet\'s share list. Standard, auditable, revocable from your Google account.' },
        { q: 'What scopes do you request?', a: 'openid, email, spreadsheets, drive.file. We do not ask for drive-full access.' },
        { q: 'Can I revoke?', a: 'Yes — from the dashboard (deletes all our records) or from your Google account permissions page.' }
      ]
    },
    {
      title: 'Compliance',
      items: [
        { q: 'GDPR?', a: 'Yes. Full DSR support via the dashboard. DPA available at /legal/dpa.' },
        { q: 'DPDP (India)?', a: 'Yes. Notice + consent via OAuth screen, right to access via /me, right to erasure via logout.' },
        { q: 'SOC 2?', a: 'Not certified yet. Posture aligned. Type II engagement on roadmap.' },
        { q: 'HIPAA?', a: 'Not suitable out of the box for PHI. Self-host bundle with BAA-compliant defaults on roadmap.' }
      ]
    },
    {
      title: 'Pricing',
      items: [
        { q: 'Is there a paid plan?', a: 'Not yet — Pro and Team launch in v0.8. The free tier will remain generous.' },
        { q: 'Will you add usage caps on free?', a: 'We will give plenty of notice and always offer a path to keep working.' },
        { q: 'Self-hostable?', a: 'Yes, $0 forever. Bring your own Cloudflare + Google OAuth client.' }
      ]
    }
  ];

  const allItems = sections.flatMap((s) => s.items);
</script>

<Seo
  title="FAQ — SheetsAPI"
  description="Answers to common questions about using SheetsAPI, our free Google Sheets REST API. Authentication, rate limits, compliance, self-hosting, pricing."
  canonical="/faq"
  schema={[faqSchema(allItems)]}
/>

<article class="max-w-3xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-semibold tracking-tight">Frequently asked questions</h1>

  {#each sections as sec}
    <h2 class="text-2xl font-semibold mt-12 mb-4">{sec.title}</h2>
    <div class="space-y-3">
      {#each sec.items as f}
        <details class="card p-5 group">
          <summary class="font-medium cursor-pointer list-none flex justify-between">
            {f.q}<span class="text-slate-400 group-open:rotate-45 transition">+</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 whitespace-pre-line">{f.a}</p>
        </details>
      {/each}
    </div>
  {/each}
</article>
