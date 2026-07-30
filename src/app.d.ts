// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		/** Defined by the pre-paint theme script in app.html. */
		__applyTheme?: (dark: boolean) => void;
	}
}

export {};
