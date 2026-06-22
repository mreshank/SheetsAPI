import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Session shape, aligned with `GKitUser` from `@gkit/types` (the canonical
 * GKit account model). `userKey` is the SheetsAPI-specific access key; the
 * remaining fields mirror the shared GKit user so a future migration to the
 * unified `.gkit.mreshank.com` SSO session is a drop-in.
 */
export type Session = {
  userKey: string;
  email: string;
  name?: string;
  image?: string;
  googleId?: string;
} | null;

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
