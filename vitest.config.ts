import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST, compilerOptions: { runes: true } })],
	test: {
		environment: 'jsdom',
		globals: true
	},
	resolve: {
		conditions: ['browser']
	}
});
