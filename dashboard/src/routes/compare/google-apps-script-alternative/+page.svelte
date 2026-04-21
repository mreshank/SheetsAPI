<script lang="ts">
  import Compare from '$lib/Compare.svelte';

  const matrix = [
    { feature: 'URL style', us: 'sheets.mreshank.com/api/...', them: 'script.google.com/macros/s/.../exec' },
    { feature: 'REST semantics', us: 'Real GET/POST/PUT/DELETE', them: 'doGet/doPost only' },
    { feature: 'Rate limits', us: 'Google Sheets quota only', them: '20k UrlFetchApp calls/day' },
    { feature: 'Custom domain', us: 'sheets.mreshank.com', them: 'No' },
    { feature: 'Cold start', us: 'None', them: '500ms–2s' },
    { feature: 'CORS', us: 'Yes, built-in', them: 'Workarounds required' },
    { feature: 'Output formats', us: 'JSON/CSV/TSV/XML/JSONP', them: 'Manual' },
    { feature: 'Dashboard', us: 'Included', them: 'Build your own' }
  ];

  const faqs = [
    { q: 'Can I just use Apps Script?', a: 'For simple one-off endpoints, yes. For anything production, Apps Script\'s ugly URLs, cold starts, and 20k/day cap become problems fast.' },
    { q: 'Do you use Apps Script under the hood?', a: 'No — we use Cloudflare Workers + Google Sheets API v4 directly. Much faster and no 20k quota.' }
  ];
</script>

<Compare
  slug="google-apps-script-alternative"
  competitor="Google Apps Script"
  title="SheetsAPI vs Google Apps Script web apps"
  description="Apps Script web apps are quick hacks. SheetsAPI is a real REST API: clean URLs, no cold starts, proper HTTP verbs, higher quotas, and a full dashboard."
  tagline="Apps Script web apps work — until your URL is ugly, cold starts are 2 seconds, and the 20k/day quota caps you. SheetsAPI is the production upgrade."
  summary="Apps Script is a clever hack but wasn\'t designed to be a REST API. SheetsAPI uses the Google Sheets API v4 directly from Cloudflare Workers: clean URLs, no cold starts, full HTTP verbs, CORS built-in, and 10× the quota."
  {matrix}
  {faqs}
/>
