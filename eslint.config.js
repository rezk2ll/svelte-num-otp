import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

// ESLint 9 only reads this file. The old .eslintrc.cjs matched nothing, so `eslint .`
// walked the repo and checked none of it.
export default [
	{
		ignores: [
			'.svelte-kit/**',
			'.vercel/**',
			'build/**',
			'dist/**',
			'package/**',
			'node_modules/**'
		]
	},
	js.configs.recommended,
	{
		plugins: { '@typescript-eslint': tsPlugin },
		rules: {
			...tsPlugin.configs.recommended.rules,
			// TypeScript resolves every identifier itself, and ESLint cannot see the DOM types
			// (`AutoFill`) or the generics that Svelte components declare (`Id`).
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			]
		}
	},
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: { sourceType: 'module', ecmaVersion: 2022 },
			globals: { ...globals.browser, ...globals.node }
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tsParser }
		},
		rules: {
			// A code sample containing `</script>` has to be written `<\/script>`, or it closes
			// the component's own script block. The escape is required, not useless.
			'no-useless-escape': 'off'
		}
	},
	{
		// Tailwind and PostCSS config are CommonJS.
		files: ['**/*.cjs'],
		languageOptions: { sourceType: 'commonjs' }
	},
	prettier,
	...svelte.configs['flat/prettier']
];
