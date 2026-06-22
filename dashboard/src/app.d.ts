// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces.

/**
 * SheetsAPI dashboard — type augmentations for SvelteKit.
 *
 * The dashboard is a pure SPA (no SvelteKit server runtime in production),
 * so `Locals`, `PageData`, and `Platform` are intentionally empty. If we
 * ever add SSR-backed routes (e.g. an API proxy), extend these interfaces.
 */

export type Session = {
	userKey: string;
	email: string;
};

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
