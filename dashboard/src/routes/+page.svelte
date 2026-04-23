<script lang="ts">
  import { API_BASE } from '$lib/config';
  import { onMount } from 'svelte';
  import { setSession, session } from '$lib/session';
  import { goto } from '$app/navigation';
  import Seo from '$lib/Seo.svelte';
  import ScrollReveal from '$lib/ScrollReveal.svelte';
  import Card3D from '$lib/Card3D.svelte';
  import AnimatedTerminal from '$lib/AnimatedTerminal.svelte';
  import CountUp from '$lib/CountUp.svelte';
  import FeatureMarquee from '$lib/FeatureMarquee.svelte';
  import { organizationSchema, websiteSchema, softwareApplicationSchema } from '$lib/schema';

  const dashUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const loginHref = `${API_BASE}/api/oauth/start?return_to=${encodeURIComponent(dashUrl + '/app')}`;

  onMount(() => {
    const p = new URLSearchParams(window.location.search);
    const userKey = p.get('userKey');
    const email = p.get('email');
    if (userKey && email) {
      setSession({ userKey, email });
      window.history.replaceState({}, '', '/app');
      goto('/app');
    }
  });

  const terminalLines = [
    {
      prompt: '$ ',
      command: `curl '${API_BASE}/api/spreadsheets/abc123/leads'`,
      output: [
        '',
        '[',
        '  {',
        '    "name": "Ada Lovelace",',
        '    "email": "ada@example.com",',
        '    "role": "Engineer"',
        '  },',
        '  {',
        '    "name": "Alan Turing",',
        '    "email": "alan@example.com",',
        '    "role": "Researcher"',
        '  }',
        ']'
      ]
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'CONNECT',
      desc: 'Sign in with Google. We only access sheets you explicitly register. Zero config.'
    },
    {
      num: '02',
      title: 'REGISTER',
      desc: 'Paste a Google Sheet URL. First row becomes JSON keys. That\'s your schema.'
    },
    {
      num: '03',
      title: 'CALL',
      desc: 'GET, POST, PUT, DELETE. JSON, CSV, XML. Optional API keys. Ship it.'
    }
  ];

  const features = [
    'FULL CRUD', 'OAUTH', 'SEARCH & FILTER', 'SORT & PAGINATION',
    'FIELD SELECTION', 'JSON / CSV / XML', 'API KEYS', 'CORS',
    'WORKSPACE ADD-ON', 'ENCRYPTED TOKENS', 'SELF-HOSTABLE', 'WEBHOOKS',
    'OPENAPI SPEC', 'TYPESCRIPT SDK', 'ZERO CONFIG', 'FREE TIER'
  ];

  const stats = [
    { value: 3000000, suffix: '+', label: 'REQUESTS / MONTH' },
    { value: 500, suffix: '+', label: 'SHEETS CONNECTED' },
    { value: 0, suffix: '', label: 'SERVERS REQUIRED', display: '$0' },
    { value: 30, suffix: 's', label: 'TO FIRST API CALL' }
  ];
</script>

<Seo
  title="SheetsAPI — Turn Google Sheets into a REST API"
  description="Use any Google Sheet as a JSON REST API. Free. OAuth-based. No server required. Full CRUD, search, filter, sort, pagination. Ship in 30 seconds."
  canonical="/"
  schema={[organizationSchema, websiteSchema, softwareApplicationSchema]}
/>

<!-- ─────────────────────────────────────────────
     HERO SECTION
     ───────────────────────────────────────────── -->
<section class="relative overflow-hidden" style="min-height: 100vh; display: flex; align-items: center;">
  <!-- Background layers -->
  <div class="absolute inset-0 bg-dots" style="opacity: 0.4;"></div>
  <div class="absolute inset-0 bg-gradient-radial"></div>

  <div class="max-w-6xl mx-auto px-6 w-full" style="padding-top: 80px; padding-bottom: 80px;">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- Left: Text -->
      <div>
        <div class="animate-fade-in-up">
          <div class="text-mono-label" style="margin-bottom: 24px;">
            <span class="animate-border-glow badge">OPEN SOURCE</span>
          </div>
        </div>

        <h1 class="text-hero animate-fade-in-up delay-100" style="margin-bottom: 24px;">
          SHEETS<br/>
          <span style="color: rgba(255,255,255,0.4);">→</span> API
        </h1>

        <p class="animate-fade-in-up delay-200" style="font-size: 18px; color: rgba(255,255,255,0.6); max-width: 480px; line-height: 1.7; margin-bottom: 40px;">
          Connect a Google Sheet in 30 seconds. Read, append, update, and delete rows with standard REST. No server. No plan limits.
        </p>

        <div class="flex flex-wrap gap-4 animate-fade-in-up delay-300">
          {#if $session}
            <a href="/app" class="btn-primary">OPEN DASHBOARD</a>
          {:else}
            <a href={loginHref} class="btn-primary">GET STARTED FREE</a>
          {/if}
          <a href="/docs" class="btn-ghost">READ THE DOCS</a>
        </div>
      </div>

      <!-- Right: Terminal -->
      <div class="animate-fade-in-up delay-400" style="position: relative;">
        <div class="animate-float">
          <AnimatedTerminal lines={terminalLines} typingSpeed={30} lineDelay={500} />
        </div>
        <!-- Glow behind terminal -->
        <div
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
          "
        ></div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="text-center animate-fade-in delay-700" style="margin-top: 48px;">
      <div style="display: inline-flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.2);">
        <span style="font-family: var(--font-pixel); font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px;">Scroll</span>
        <div style="width: 1px; height: 32px; background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);"></div>
      </div>
    </div>
  </div>
</section>


<!-- ─────────────────────────────────────────────
     FEATURE MARQUEE
     ───────────────────────────────────────────── -->
<section style="padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
  <FeatureMarquee items={features} speed={40} />
</section>


<!-- ─────────────────────────────────────────────
     HOW IT WORKS — 3 Steps
     ───────────────────────────────────────────── -->
<section style="padding: 96px 0;">
  <div class="max-w-6xl mx-auto px-6">
    <ScrollReveal>
      <div class="text-mono-label" style="margin-bottom: 16px;">HOW IT WORKS</div>
      <h2 class="text-section" style="margin-bottom: 64px; max-width: 500px;">
        Three steps. Zero infrastructure.
      </h2>
    </ScrollReveal>

    <div class="grid md:grid-cols-3 gap-6">
      {#each steps as step, i}
        <ScrollReveal delay={i * 150}>
          <Card3D maxTilt={3} class="h-full">
            <div class="card-glow h-full" style="padding: 32px;">
              <div class="font-pixel" style="font-size: 56px; font-weight: 300; color: rgba(255,255,255,0.08); margin-bottom: 16px;">
                {step.num}
              </div>
              <div class="font-brand" style="font-size: 15px; text-transform: uppercase; letter-spacing: 1.8px; margin-bottom: 12px;">
                {step.title}
              </div>
              <p style="color: rgba(255,255,255,0.5); font-size: 15px; line-height: 1.6;">
                {step.desc}
              </p>
            </div>
          </Card3D>
        </ScrollReveal>
      {/each}
    </div>

    <!-- Connecting line -->
    <div class="hidden md:block--x " style="margin-top: -60px; position: relative; z-index: -1;">
      <div style="
        height: 1px;
        background: linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 90%);
        margin: 0 80px;
      "></div>
    </div>
  </div>
</section>


<!-- ─────────────────────────────────────────────
     LIVE DEMO SECTION
     ───────────────────────────────────────────── -->
<section style="padding: 96px 0; position: relative;">
  <div class="absolute inset-0 bg-grid" style="opacity: 0.3;"></div>
  <div class="max-w-5xl mx-auto px-6 relative">
    <ScrollReveal>
      <div class="text-mono-label" style="margin-bottom: 16px;">EXAMPLE</div>
      <h2 class="text-section" style="margin-bottom: 48px; max-width: 600px;">
        Your sheet data, one curl away.
      </h2>
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <div class="terminal" style="position: relative;">
        <div class="terminal-header">
          <span class="terminal-dot"></span>
          <span class="terminal-dot"></span>
          <span class="terminal-dot"></span>
          <span style="margin-left: auto; font-family: var(--font-pixel); font-size: 11px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 1.5px;">LIVE</span>
        </div>
        <div class="terminal-body" style="min-height: 200px;">
          <div><span class="syn-comment"># Fetch all rows from the "leads" tab</span></div>
          <div><span class="terminal-prompt">$ </span>curl <span class="syn-url">'{API_BASE}/api/spreadsheets/abc123/leads'</span></div>
          <div>&nbsp;</div>
          <div><span class="syn-comment"># Response:</span></div>
          <div>[</div>
          <div>  {'{'}</div>
          <div>    <span class="syn-key">"name"</span>: <span class="syn-string">"Ada Lovelace"</span>,</div>
          <div>    <span class="syn-key">"email"</span>: <span class="syn-string">"ada@example.com"</span></div>
          <div>  {'}'},</div>
          <div>  {'{'}</div>
          <div>    <span class="syn-key">"name"</span>: <span class="syn-string">"Alan Turing"</span>,</div>
          <div>    <span class="syn-key">"email"</span>: <span class="syn-string">"alan@example.com"</span></div>
          <div>  {'}'}</div>
          <div>]</div>
        </div>
      </div>
    </ScrollReveal>

    <!-- Endpoints preview -->
    <ScrollReveal delay={300}>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style="margin-top: 32px;">
        {#each [
          { method: 'GET', desc: 'Read rows' },
          { method: 'POST', desc: 'Append rows' },
          { method: 'PUT', desc: 'Update rows' },
          { method: 'DELETE', desc: 'Delete rows' }
        ] as endpoint}
          <div class="card" style="padding: 16px 20px;">
            <div class="font-pixel" style="font-size: 14px; letter-spacing: 1.2px; margin-bottom: 4px;">{endpoint.method}</div>
            <div style="font-size: 13px; color: rgba(255,255,255,0.4);">{endpoint.desc}</div>
          </div>
        {/each}
      </div>
    </ScrollReveal>
  </div>
</section>


<!-- ─────────────────────────────────────────────
     STATS SECTION
     ───────────────────────────────────────────── -->
<section style="padding: 72px 0; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {#each stats as stat}
        <ScrollReveal>
          <div>
            <div style="font-size: clamp(32px, 5vw, 48px); font-weight: 300; margin-bottom: 8px;">
              {#if stat.display}
                <span class="font-pixel">{stat.display}</span>
              {:else}
                <CountUp target={stat.value} suffix={stat.suffix} duration={2500} />
              {/if}
            </div>
            <div class="text-mono-label">{stat.label}</div>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>


<!-- ─────────────────────────────────────────────
     WHY SHEETSAPI
     ───────────────────────────────────────────── -->
<section style="padding: 96px 0; position: relative;">
  <div class="absolute inset-0 bg-dots" style="opacity: 0.2;"></div>
  <div class="max-w-6xl mx-auto px-6 relative">
    <ScrollReveal>
      <div class="text-mono-label" style="margin-bottom: 16px;">WHY SHEETSAPI</div>
      <h2 class="text-section" style="margin-bottom: 64px; max-width: 500px;">
        Built for developers who ship fast.
      </h2>
    </ScrollReveal>

    <div class="grid md:grid-cols-2 gap-6">
      {#each [
        {
          title: 'OAuth, not service accounts',
          desc: 'Sign in with Google once. We never need you to share your spreadsheets with a service account email. Your data stays yours.'
        },
        {
          title: 'Every output format',
          desc: 'JSON by default. Add ?format=csv, tsv, xml, or jsonp. One query parameter. No extra configuration.'
        },
        {
          title: 'Search, sort, paginate',
          desc: '?search=field:value, ?sort=-created_at, ?limit=50, ?offset=100. Every list endpoint supports them out of the box.'
        },
        {
          title: 'API keys when you need them',
          desc: 'Endpoints are public until you create your first key. Then Bearer auth kicks in automatically. Zero to secure in one click.'
        },
        {
          title: 'Runs on Cloudflare',
          desc: 'Workers + D1 + KV. Sub-50ms cold starts. Global edge. The free tier covers ~3M requests/month at $0.'
        },
        {
          title: '100% open source',
          desc: 'Clone the repo. Bring your own Cloudflare account and Google OAuth client. Self-host with total control.'
        }
      ] as feature, i}
        <ScrollReveal delay={i * 100}>
          <Card3D maxTilt={2}>
            <div class="card-glow" style="padding: 28px;">
              <h3 style="font-family: var(--font-sans); font-size: 16px; font-weight: 500; margin-bottom: 8px;">{feature.title}</h3>
              <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6;">{feature.desc}</p>
            </div>
          </Card3D>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>


<!-- ─────────────────────────────────────────────
     CTA SECTION
     ───────────────────────────────────────────── -->
<section style="padding: 96px 0;">
  <div class="max-w-4xl mx-auto px-6">
    <ScrollReveal>
      <div class="card-glow" style="padding: 64px; text-align: center; position: relative; overflow: hidden;">
        <!-- Background grid -->
        <div class="absolute inset-0 bg-grid" style="opacity: 0.3;"></div>

        <div style="position: relative;">
          <h2 class="text-hero" style="font-size: clamp(32px, 5vw, 56px); margin-bottom: 16px;">
            SHIP IT.
          </h2>
          <p style="color: rgba(255,255,255,0.5); font-size: 16px; max-width: 400px; margin: 0 auto 40px; line-height: 1.6;">
            Connect your first sheet in 30 seconds. No credit card. No server to manage. Just your data as an API.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            {#if $session}
              <a href="/app" class="btn-primary">OPEN DASHBOARD</a>
            {:else}
              <a href={loginHref} class="btn-primary">GET STARTED FREE</a>
            {/if}
            <a href="/pricing" class="btn-ghost">VIEW PRICING</a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
