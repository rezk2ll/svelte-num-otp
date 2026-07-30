<script lang="ts">
	import type { Snippet } from 'svelte';
	import CodeBlock from './CodeBlock.svelte';
	import TabStrip from './TabStrip.svelte';

	interface Props {
		children: Snippet;
		code: string;
		/** Rendered under the preview, e.g. the value the example is bound to. */
		status?: Snippet;
		/**
		 * `paper` puts the preview on a light surface. The component's own default styling is a
		 * 1px black border, which would disappear against the dark theme.
		 */
		surface?: 'default' | 'paper';
	}

	let { children, code, status, surface = 'default' }: Props = $props();

	type Tab = 'preview' | 'code';

	const tabs: { id: Tab; label: string }[] = [
		{ id: 'preview', label: 'Preview' },
		{ id: 'code', label: 'Code' }
	];

	let tab = $state<Tab>('preview');
</script>

<div class="overflow-hidden rounded-xl border border-border bg-card">
	<div class="flex items-center justify-between gap-3 border-b border-border px-2.5 py-2">
		<TabStrip items={tabs} bind:active={tab} />
		{#if surface === 'paper'}
			<span class="eyebrow pr-1">on white</span>
		{/if}
	</div>

	<!-- The preview stays mounted rather than being swapped out, so switching tabs never
	     resets what you typed. The code panel below holds a constant string, so it does not
	     need the same treatment and is better off not being rendered until asked for. -->
	<div class:hidden={tab !== 'preview'}>
		<div
			class="flex min-h-[8rem] flex-col items-center justify-center gap-4 overflow-x-auto p-6 sm:px-10 sm:py-8 {surface ===
			'paper'
				? 'bg-zinc-100 text-zinc-900'
				: ''}"
		>
			{@render children()}
			{#if status}
				<p class="font-mono text-xs opacity-60">{@render status()}</p>
			{/if}
		</div>
	</div>

	{#if tab === 'code'}
		<CodeBlock {code} />
	{/if}
</div>
