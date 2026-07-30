<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		text: string;
		label?: string;
		/** Drop the text and keep the icon, for tight spots like a code block corner. */
		compact?: boolean;
	}

	let { text, label = 'Copy', compact = false }: Props = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// No clipboard on insecure origins, and Safari rejects it when the document is not
			// focused. Nothing useful to do here, so leave the button in its resting state.
			return;
		}

		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1600);
	}

	onDestroy(() => clearTimeout(timer));
</script>

<button
	type="button"
	onclick={copy}
	aria-label={copied ? 'Copied' : label}
	class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-background/60 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground {compact
		? 'h-7 w-7'
		: 'h-8 px-2.5'}"
>
	{#if copied}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="m20 6-11 11-5-5" />
		</svg>
		{#if !compact}Copied{/if}
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<rect width="13" height="13" x="9" y="9" rx="2" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
		{#if !compact}{label}{/if}
	{/if}
</button>
