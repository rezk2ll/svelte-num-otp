<script lang="ts">
	import '../app.css';
	import ThemeToggle from '../components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header
		class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/65"
	>
		<div class="mx-auto flex h-14 max-w-shell items-center justify-between gap-4 px-4 sm:px-8">
			<a href="/" class="flex items-center gap-2.5">
				<span
					class="flex h-6 w-6 items-center justify-center rounded-md border border-border font-mono text-[0.625rem] font-semibold"
					aria-hidden="true"
				>
					6
				</span>
				<span class="font-mono text-sm font-medium tracking-tight">
					svelte-<span class="text-muted-foreground">num</span>-otp
				</span>
			</a>

			<nav class="flex items-center gap-1">
				<a
					href="https://www.npmjs.com/package/svelte-num-otp"
					target="_blank"
					rel="noreferrer"
					aria-label="svelte-num-otp on npm"
					class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path
							d="M2 4v16h6.5v-2.5H12V20h10V4H2Zm4.5 3H9v9H7.5V9.5H6V16H4V7h2.5Zm5 0H17v9h-2.5v-6.5H13V16h-1.5V7Zm7 0H20v9h-1.5V7Z"
						/>
					</svg>
				</a>
				<a
					href="https://github.com/rezk2ll/svelte-num-otp"
					target="_blank"
					rel="noreferrer"
					aria-label="svelte-num-otp on GitHub"
					class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path
							d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"
						/>
					</svg>
				</a>
				<div class="mx-1 h-5 w-px bg-border" aria-hidden="true"></div>
				<ThemeToggle />
			</nav>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-border">
		<div
			class="mx-auto flex max-w-shell flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8"
		>
			<p>MIT licensed. Built with Svelte 5.</p>
			<a
				href="https://github.com/rezk2ll/svelte-num-otp/issues"
				target="_blank"
				rel="noreferrer"
				class="underline underline-offset-4 transition-colors hover:text-foreground"
			>
				Report an issue
			</a>
		</div>
	</footer>
</div>
