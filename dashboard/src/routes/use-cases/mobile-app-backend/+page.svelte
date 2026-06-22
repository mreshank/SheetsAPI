<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `id | title       | body              | image_url         | published
1  | Welcome     | Thanks for...    | https://.../a.png | true
2  | Tip of day  | Tap to...        | https://.../b.png | true`;

  const code = `// React Native / iOS / Android
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/content?search=published:true'
);
const posts = await r.json();
setPosts(posts);`;

  const faqs = [
    { q: 'Is it fast enough for mobile?', a: 'Typical response ~150ms from Cloudflare edge. Cache responses client-side for 60s to eliminate most requests.' },
    { q: 'How do I handle offline?', a: 'Cache responses in AsyncStorage / UserDefaults / SharedPreferences. Refetch on reconnect.' },
    { q: 'Can I update from the app?', a: 'Yes — POST/PUT/DELETE work the same. Use API keys to gate write access.' }
  ];
</script>

<UseCase
  slug="mobile-app-backend"
  title="Mobile app backend with Google Sheets"
  subtitle="Ship content, configs, leaderboards, and lightweight data to your iOS/Android apps without standing up a backend."
  description="Use SheetsAPI as a mobile app backend. Fetch configurable content, push notifications content, feature flags, and lightweight data from Google Sheets via REST."
  {sheetShape}
  {code}
  {faqs}
/>
