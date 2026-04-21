<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { session, setSession } from '$lib/session';
  import { api, type Me } from '$lib/api';
  import { API_BASE } from '$lib/config';

  let me = $state<Me | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let tabsById = $state<Record<string, { title: string; sheetId: number }[]>>({});
  let newSheetUrl = $state('');
  let newKeyLabel = $state('');
  let copied = $state<string | null>(null);

  onMount(async () => {
    const p = $page.url.searchParams;
    const uk = p.get('userKey');
    const em = p.get('email');
    if (uk && em) {
      setSession({ userKey: uk, email: em });
      window.history.replaceState({}, '', '/app');
    }
    if (!$session) {
      await goto('/');
      return;
    }
    await load();
  });

  async function load() {
    loading = true;
    error = null;
    try {
      me = await api.me();
      for (const s of me.spreadsheets) {
        try {
          const meta = await api.listTabs(s.id);
          tabsById[s.id] = meta.sheets;
        } catch {}
      }
    } catch (e) {
      error = String((e as Error).message);
    } finally {
      loading = false;
    }
  }

  function extractSpreadsheetId(url: string): string | null {
    const m = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return m ? m[1] : url.trim() || null;
  }

  async function addSheet() {
    const id = extractSpreadsheetId(newSheetUrl);
    if (!id) return;
    try {
      await api.addSpreadsheet(id, undefined, true);
      newSheetUrl = '';
      await load();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  async function removeSheet(id: string) {
    if (!confirm('Remove this spreadsheet binding?')) return;
    await api.removeSpreadsheet(id);
    await load();
  }

  async function createKey() {
    const { key } = await api.createKey(newKeyLabel || undefined);
    newKeyLabel = '';
    await load();
    alert(`Your new API key (copy it now):\n\n${key}`);
  }

  async function deleteKey(key: string) {
    if (!confirm('Revoke this API key?')) return;
    await api.deleteKey(key);
    await load();
  }

  function copy(s: string, label: string) {
    navigator.clipboard.writeText(s);
    copied = label;
    setTimeout(() => (copied = null), 1200);
  }

  function endpoint(userKey: string, sheetName: string) {
    return `${API_BASE}/api/spreadsheets/${userKey}/${encodeURIComponent(sheetName)}`;
  }
</script>

<div class="max-w-6xl mx-auto px-6 py-10">
  {#if loading}
    <div class="text-slate-500">Loading…</div>
  {:else if error}
    <div class="card p-6 text-red-700">Error: {error}</div>
  {:else if me}
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <p class="text-sm text-slate-500">Signed in as {me.email}</p>
      </div>
      <div class="text-right">
        <div class="text-xs uppercase text-slate-500">Your userKey</div>
        <button
          class="font-mono text-sm bg-slate-100 px-2 py-1 rounded hover:bg-slate-200"
          onclick={() => copy(me!.userKey, 'userKey')}
        >
          {me.userKey}
        </button>
        {#if copied === 'userKey'}<span class="text-xs text-green-600 ml-2">copied!</span>{/if}
      </div>
    </div>

    <!-- Spreadsheets -->
    <div class="card p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4">Spreadsheets</h2>

      <div class="flex gap-2 mb-6">
        <input
          bind:value={newSheetUrl}
          placeholder="Paste Google Sheet URL or ID"
          class="flex-1 px-3 py-2 rounded-lg ring-1 ring-slate-200 focus:ring-brand-500 outline-none"
        />
        <button class="btn-primary" onclick={addSheet}>Add</button>
      </div>

      {#if me.spreadsheets.length === 0}
        <p class="text-sm text-slate-500">No sheets registered yet. Paste a URL above to begin.</p>
      {/if}

      <div class="space-y-6">
        {#each me.spreadsheets as ss (ss.id)}
          <div class="border border-slate-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">
                  {ss.title ?? '(untitled)'}
                  {#if ss.is_default}<span class="ml-2 text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">default</span>{/if}
                </div>
                <div class="text-xs text-slate-500 font-mono">{ss.google_spreadsheet_id}</div>
              </div>
              <button class="btn-ghost text-red-600" onclick={() => removeSheet(ss.id)}>Remove</button>
            </div>

            {#if tabsById[ss.id]?.length}
              <div class="mt-4 space-y-2">
                {#each tabsById[ss.id] as tab}
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium w-40 truncate">{tab.title}</span>
                    <code class="flex-1 text-xs font-mono bg-slate-50 px-2 py-1 rounded truncate">
                      {endpoint(me.userKey, tab.title)}
                    </code>
                    <button
                      class="btn-ghost text-xs"
                      onclick={() => copy(endpoint(me!.userKey, tab.title), tab.title)}
                    >
                      {copied === tab.title ? 'copied!' : 'copy'}
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- API Keys -->
    <div class="card p-6 mb-8">
      <h2 class="text-lg font-semibold mb-1">API Keys</h2>
      <p class="text-sm text-slate-500 mb-4">
        Optional. If you create any, all endpoints require <code>Authorization: Bearer &lt;key&gt;</code>.
      </p>
      <div class="flex gap-2 mb-6">
        <input
          bind:value={newKeyLabel}
          placeholder="Label (optional)"
          class="flex-1 px-3 py-2 rounded-lg ring-1 ring-slate-200 focus:ring-brand-500 outline-none"
        />
        <button class="btn-primary" onclick={createKey}>Create Key</button>
      </div>
      {#if me.apiKeys.length === 0}
        <p class="text-sm text-slate-500">No keys. Endpoints are currently public.</p>
      {:else}
        <div class="space-y-2">
          {#each me.apiKeys as k}
            <div class="flex items-center gap-3 border border-slate-200 rounded-lg p-3">
              <code class="font-mono text-xs flex-1 truncate">{k.key}</code>
              <span class="text-xs text-slate-500">{k.label ?? ''}</span>
              <button class="btn-ghost text-red-600" onclick={() => deleteKey(k.key)}>Revoke</button>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Usage -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold mb-4">Usage examples</h2>
      {#if me.spreadsheets[0] && tabsById[me.spreadsheets[0].id]?.[0]}
        {@const tab = tabsById[me.spreadsheets[0].id][0].title}
        {@const url = endpoint(me.userKey, tab)}
        <div class="space-y-3 text-sm">
          <div>
            <div class="font-semibold text-slate-700 mb-1">GET — list rows</div>
            <pre class="code">curl '{url}'</pre>
          </div>
          <div>
            <div class="font-semibold text-slate-700 mb-1">POST — append</div>
            <pre class="code">{`curl -X POST '${url}' \\
  -H 'content-type: application/json' \\
  -d '{"name":"test","age":"12"}'`}</pre>
          </div>
          <div>
            <div class="font-semibold text-slate-700 mb-1">PUT — update row 1</div>
            <pre class="code">{`curl -X PUT '${url}/1' \\
  -H 'content-type: application/json' \\
  -d '{"name":"updated","age":"13"}'`}</pre>
          </div>
          <div>
            <div class="font-semibold text-slate-700 mb-1">DELETE — remove row 1</div>
            <pre class="code">{`curl -X DELETE '${url}/1'`}</pre>
          </div>
        </div>
      {:else}
        <p class="text-sm text-slate-500">Add a spreadsheet first to see live example URLs.</p>
      {/if}
    </div>
  {/if}
</div>
