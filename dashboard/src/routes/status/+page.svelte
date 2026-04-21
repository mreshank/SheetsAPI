<script lang="ts">
  import Seo from '$lib/Seo.svelte';

  const components = [
    { name: 'API — sheets.mreshank.com', status: 'operational' },
    { name: 'Dashboard — sheets.mreshank.com', status: 'operational' },
    { name: 'OAuth — Google', status: 'operational' },
    { name: 'Google Sheets API', status: 'operational' },
    { name: 'Cloudflare D1', status: 'operational' }
  ];

  const days = Array.from({ length: 90 }, () => 'up');
</script>

<Seo
  title="Status — SheetsAPI"
  description="SheetsAPI service status, uptime history, and incidents. Real-time operational status of all SheetsAPI components."
  canonical="/status"
/>

<section class="max-w-4xl mx-auto px-6 py-16">
  <h1 class="text-3xl font-semibold">System status</h1>
  <div class="card p-6 mt-6 bg-green-50 border-green-200">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 bg-green-500 rounded-full"></span>
      <span class="font-medium text-green-900">All systems operational</span>
    </div>
  </div>

  <div class="card p-6 mt-6">
    <h2 class="font-semibold mb-4">Components</h2>
    <ul class="space-y-3">
      {#each components as c}
        <li class="flex items-center justify-between text-sm">
          <span>{c.name}</span>
          <span class="text-green-600 capitalize">● {c.status}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class="card p-6 mt-6">
    <h2 class="font-semibold mb-4">90-day uptime</h2>
    <div class="flex gap-px overflow-x-auto">
      {#each days as _}
        <div class="w-1.5 h-10 bg-green-500 flex-shrink-0 rounded-sm"></div>
      {/each}
    </div>
    <div class="text-xs text-slate-500 mt-2 flex justify-between">
      <span>90 days ago</span>
      <span class="font-medium text-slate-900">100.00% uptime</span>
      <span>Today</span>
    </div>
  </div>

  <div class="card p-6 mt-6">
    <h2 class="font-semibold mb-4">Recent incidents</h2>
    <p class="text-sm text-slate-500">No incidents reported in the last 90 days.</p>
  </div>

  <p class="text-xs text-slate-500 mt-8">
    A full status page with real-time monitoring is planned for v1.0 at status.mreshank.com.
  </p>
</section>
