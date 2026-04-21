import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export type Session = { userKey: string; email: string } | null;

const KEY = 'sheetsapi_session';

function load(): Session {
  if (!browser) return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const session = writable<Session>(load());

session.subscribe((s) => {
  if (!browser) return;
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
});

export function setSession(s: Session) {
  session.set(s);
}

export function getSession(): Session {
  return get(session);
}

export function logout() {
  session.set(null);
}
