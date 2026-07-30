/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				// State colours borrowed from the flow this component lives in:
				// green once a code checks out, amber while it is still expiring.
				success: 'hsl(var(--success) / <alpha-value>)',
				warn: 'hsl(var(--warn) / <alpha-value>)',
				danger: 'hsl(var(--danger) / <alpha-value>)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				mono: [
					'ui-monospace',
					'SFMono-Regular',
					'SF Mono',
					'JetBrains Mono',
					'Menlo',
					'Consolas',
					'monospace'
				]
			},
			maxWidth: {
				shell: '80rem'
			},
			keyframes: {
				'message-in': {
					'0%': { opacity: '0', transform: 'translate3d(0, -0.75rem, 0) scale(0.97)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' }
				},
				'rise-in': {
					'0%': { opacity: '0', transform: 'translate3d(0, 0.5rem, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				shake: {
					'0%, 100%': { transform: 'translate3d(0, 0, 0)' },
					'20%': { transform: 'translate3d(-6px, 0, 0)' },
					'40%': { transform: 'translate3d(5px, 0, 0)' },
					'60%': { transform: 'translate3d(-3px, 0, 0)' },
					'80%': { transform: 'translate3d(2px, 0, 0)' }
				}
			},
			animation: {
				'message-in': 'message-in 260ms cubic-bezier(0.16, 1, 0.3, 1)',
				'rise-in': 'rise-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
				shake: 'shake 400ms ease-in-out'
			}
		}
	},
	plugins: []
};
