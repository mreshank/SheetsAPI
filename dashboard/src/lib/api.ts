import { API_BASE } from './config';
import { getSession } from './session';

// All Worker endpoints live under /api on the same origin as the dashboard
// (sheets.mreshank.com). API_BASE is the origin; we prepend /api here.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const s = getSession();
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json');
  if (s) headers.set('x-user-key', s.userKey);
  const r = await fetch(`${API_BASE}/api${path}`, { ...init, headers });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? r.statusText);
  return r.json() as Promise<T>;
}

export type Me = {
  userKey: string;
  email: string;
  spreadsheets: {
    id: string;
    google_spreadsheet_id: string;
    title: string | null;
    is_default: number;
  }[];
  apiKeys: { key: string; label: string | null; created_at: number; last_used_at: number | null }[];
};

export const api = {
  me: () => request<Me>('/me'),
  addSpreadsheet: (google_spreadsheet_id: string, title?: string, set_default = true) =>
    request<{ id: string; title: string | null }>('/me/spreadsheets', {
      method: 'POST',
      body: JSON.stringify({ google_spreadsheet_id, title, set_default })
    }),
  removeSpreadsheet: (id: string) =>
    request<{ ok: true }>(`/me/spreadsheets/${id}`, { method: 'DELETE' }),
  listTabs: (id: string) =>
    request<{ title: string; sheets: { sheetId: number; title: string }[] }>(
      `/me/spreadsheets/${id}/sheets`
    ),
  createKey: (label?: string) =>
    request<{ key: string }>('/me/api-keys', {
      method: 'POST',
      body: JSON.stringify({ label })
    }),
  deleteKey: (key: string) =>
    request<{ ok: true }>(`/me/api-keys/${encodeURIComponent(key)}`, { method: 'DELETE' }),
  logout: () => request<{ ok: true }>('/me/logout', { method: 'POST' })
};
