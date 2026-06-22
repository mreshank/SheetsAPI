<script lang="ts">
  import UseCase from '$lib/UseCase.svelte';

  const sheetShape = `player_id | name  | score | timestamp
p_001     | Ada   | 9850  | 2026-04-21T10:00:00Z
p_002     | Alan  | 9240  | 2026-04-21T10:15:00Z`;

  const code = `// Submit a score
await fetch('https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/scores', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ player_id, name, score, timestamp: new Date().toISOString() })
});

// Top 10 leaderboard
const r = await fetch(
  'https://sheets.mreshank.com/api/spreadsheets/YOUR_KEY/scores?sort=-score&limit=10'
);`;

  const faqs = [
    { q: 'Anti-cheat?', a: 'Don\'t trust client-submitted scores blindly. Gate with a server-signed token or obfuscated API key.' },
    { q: 'Real-time updates?', a: 'Poll every 30s, or use webhooks (v0.4) + SSE on your side.' }
  ];
</script>

<UseCase
  slug="leaderboards"
  title="Game leaderboards on Sheets"
  subtitle="Score submission and retrieval for casual games, hackathons, or any ranking feature."
  description="Simple leaderboard backend using Google Sheets. Submit scores via POST, fetch top N via GET with sort parameter."
  {sheetShape}
  {code}
  {faqs}
/>
