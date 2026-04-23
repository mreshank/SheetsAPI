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
    <div style="color:rgba(255,255,255,0.4);font-family:var(--font-mono);font-size:13px;">LOADING…</div>
  {:else if error}
    <div class="card-glow" style="padding:24px;border-color:rgba(239,68,68,0.3);">
      <span style="color:#ef4444;font-family:var(--font-mono);font-size:13px;">ERROR:</span>
      <span style="color:rgba(255,255,255,0.6);font-size:14px;margin-left:8px;">{error}</span>
    </div>
  {:else if me}
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 style="font-family:var(--font-mono);font-size:24px;font-weight:300;">DASHBOARD</h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:4px;">Signed in as {me.email}</p>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.3);font-family:var(--font-mono);margin-bottom:4px;">YOUR USERKEY</div>
        <button
          style="font-family:var(--font-mono);font-size:13px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:4px 10px;color:rgba(255,255,255,0.7);cursor:pointer;transition:background 0.2s;"
          onclick={() => copy(me!.userKey, 'userKey')}
        >
          {me.userKey}
        </button>
        {#if copied === 'userKey'}<span style="font-size:11px;color:rgba(34,197,94,0.8);margin-left:8px;">copied!</span>{/if}
      </div>
    </div>

    <!-- Spreadsheets -->
    <div class="card-glow" style="padding:28px;margin-bottom:20px;">
      <h2 class="font-display" style="font-size:14px;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:20px;">SPREADSHEETS</h2>

      <div style="display:flex;gap:8px;margin-bottom:24px;">
        <input
          bind:value={newSheetUrl}
          placeholder="Paste Google Sheet URL or ID"
          style="flex:1;padding:8px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:14px;outline:none;font-family:var(--font-mono);transition:border-color 0.2s;"
        />
        <button class="btn-primary" onclick={addSheet}>ADD</button>
      </div>

      {#if me.spreadsheets.length === 0}
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">No sheets registered yet. Paste a URL above to begin.</p>
      {/if}

      <div style="display:flex;flex-direction:column;gap:16px;">
        {#each me.spreadsheets as ss (ss.id)}
          <div style="border:1px solid rgba(255,255,255,0.08);padding:16px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
              <div>
                <div style="font-weight:500;font-size:15px;">
                  {ss.title ?? '(untitled)'}
                  {#if ss.is_default}<span class="badge" style="margin-left:8px;font-size:9px;padding:2px 6px;">DEFAULT</span>{/if}
                </div>
                <div style="font-size:11px;color:rgba(255,255,255,0.3);font-family:var(--font-mono);margin-top:2px;">{ss.google_spreadsheet_id}</div>
              </div>
              <button class="btn-ghost" style="color:#ef4444;font-size:12px;" onclick={() => removeSheet(ss.id)}>REMOVE</button>
            </div>

            {#if tabsById[ss.id]?.length}
              <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;">
                {#each tabsById[ss.id] as tab}
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:13px;font-weight:500;width:120px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{tab.title}</span>
                    <code style="flex:1;font-size:11px;font-family:var(--font-mono);background:rgba(255,255,255,0.04);padding:4px 8px;color:rgba(255,255,255,0.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                      {endpoint(me.userKey, tab.title)}
                    </code>
                    <button
                      class="btn-ghost"
                      style="font-size:11px;"
                      onclick={() => copy(endpoint(me!.userKey, tab.title), tab.title)}
                    >
                      {copied === tab.title ? 'COPIED!' : 'COPY'}
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
    <div class="card-glow" style="padding:28px;margin-bottom:20px;">
      <h2 class="font-display" style="font-size:14px;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:4px;">API KEYS</h2>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:20px;">
        Optional. If you create any, all endpoints require <code style="font-family:var(--font-mono);background:rgba(255,255,255,0.06);padding:1px 5px;font-size:12px;">Authorization: Bearer &lt;key&gt;</code>.
      </p>
      <div style="display:flex;gap:8px;margin-bottom:20px;">
        <input
          bind:value={newKeyLabel}
          placeholder="Label (optional)"
          style="flex:1;padding:8px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:14px;outline:none;font-family:var(--font-mono);transition:border-color 0.2s;"
        />
        <button class="btn-primary" onclick={createKey}>CREATE KEY</button>
      </div>
      {#if me.apiKeys.length === 0}
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">No keys. Endpoints are currently public.</p>
      {:else}
        <div style="display:flex;flex-direction:column;gap:8px;">
          {#each me.apiKeys as k}
            <div style="display:flex;align-items:center;gap:12px;border:1px solid rgba(255,255,255,0.08);padding:10px 14px;">
              <code style="font-family:var(--font-mono);font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgba(255,255,255,0.6);">{k.key}</code>
              <span style="font-size:12px;color:rgba(255,255,255,0.3);">{k.label ?? ''}</span>
              <button class="btn-ghost" style="color:#ef4444;font-size:11px;" onclick={() => deleteKey(k.key)}>REVOKE</button>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Usage -->
    <div class="card-glow" style="padding:28px;">
      <h2 class="font-display" style="font-size:14px;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:20px;">USAGE EXAMPLES</h2>
      {#if me.spreadsheets[0] && tabsById[me.spreadsheets[0].id]?.[0]}
        {@const tab = tabsById[me.spreadsheets[0].id][0].title}
        {@const url = endpoint(me.userKey, tab)}
        <div style="display:flex;flex-direction:column;gap:16px;font-size:14px;">
          {#each [
            { label: 'GET — LIST ROWS', cmd: `curl '${url}'` },
            { label: 'POST — APPEND', cmd: `curl -X POST '${url}' \\\n  -H 'content-type: application/json' \\\n  -d '{"name":"test","age":"12"}'` },
            { label: 'PUT — UPDATE ROW 1', cmd: `curl -X PUT '${url}/1' \\\n  -H 'content-type: application/json' \\\n  -d '{"name":"updated","age":"13"}'` },
            { label: 'DELETE — REMOVE ROW 1', cmd: `curl -X DELETE '${url}/1'` }
          ] as ex}
            <div>
              <div style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:rgba(255,255,255,0.4);margin-bottom:6px;">{ex.label}</div>
              <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px;font-size:12px;font-family:var(--font-mono);color:rgba(255,255,255,0.6);overflow-x:auto;">{ex.cmd}</pre>
            </div>
          {/each}
        </div>
      {:else}
        <p style="font-size:13px;color:rgba(255,255,255,0.4);">Add a spreadsheet first to see live example URLs.</p>
      {/if}
    </div>
  {/if}
</div>
