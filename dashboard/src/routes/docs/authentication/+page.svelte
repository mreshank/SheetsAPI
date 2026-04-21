<script lang="ts">
  import DocLayout from '$lib/DocLayout.svelte';
</script>

<DocLayout
  slug="authentication"
  title="Authentication"
  description="SheetsAPI uses OAuth with Google for connecting your account, plus optional bearer API keys for gating your endpoints."
>
  <h2 class="text-2xl font-semibold mt-10">Two layers</h2>
  <ol class="mt-2 list-decimal pl-5 space-y-1">
    <li><strong>You ↔ Google</strong> — OAuth 2.0 authorization code flow. You consent once; we store an encrypted refresh token.</li>
    <li><strong>Your callers ↔ SheetsAPI</strong> — optional Bearer API keys on every request.</li>
  </ol>

  <h2 class="text-2xl font-semibold mt-10">OAuth flow</h2>
  <p>From the dashboard, click "Sign in with Google". You'll be redirected to Google's consent screen, then back to your dashboard. We request:</p>
  <ul class="mt-2 list-disc pl-5 space-y-1">
    <li><code>openid</code> + <code>email</code> — identify you</li>
    <li><code>spreadsheets</code> — read/write sheets you give us access to</li>
    <li><code>drive.file</code> — create new sheets on your behalf</li>
  </ul>

  <h2 class="text-2xl font-semibold mt-10">Progressive API keys</h2>
  <p>Endpoints are <strong>public by default</strong>. The moment you create your first API key in the dashboard, <em>all</em> your endpoints start requiring it.</p>
  <pre class="code mt-3">curl -H 'authorization: Bearer sk_abc123...' \
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/leads'</pre>

  <h2 class="text-2xl font-semibold mt-10">Revoking access</h2>
  <p>Two paths — either works:</p>
  <ol class="mt-2 list-decimal pl-5 space-y-1">
    <li>Sign out of the SheetsAPI dashboard — this deletes all our records for your account.</li>
    <li>Remove the app from <a href="https://myaccount.google.com/permissions" class="text-brand-600 underline">myaccount.google.com/permissions</a>.</li>
  </ol>

  <h2 class="text-2xl font-semibold mt-10">Storage & encryption</h2>
  <p>Refresh tokens are AES-GCM-256 encrypted at rest with a key stored separately from the database. See <a href="/security" class="text-brand-600 underline">Security</a>.</p>
</DocLayout>
