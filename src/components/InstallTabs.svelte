<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import TabStrip from './TabStrip.svelte';

	const managers = [
		{ id: 'npm', command: 'npm install svelte-num-otp' },
		{ id: 'pnpm', command: 'pnpm add svelte-num-otp' },
		{ id: 'yarn', command: 'yarn add svelte-num-otp' },
		{ id: 'bun', command: 'bun add svelte-num-otp' }
	];

	const tabs = managers.map(({ id }) => ({ id, label: id }));

	let activeId = $state(managers[0].id);
	const active = $derived(managers.find((manager) => manager.id === activeId) ?? managers[0]);
</script>

<div class="overflow-hidden rounded-xl border border-border bg-card">
	<div class="border-b border-border px-2.5 py-2">
		<TabStrip items={tabs} bind:active={activeId} mono />
	</div>
	<div class="flex items-center gap-3 px-4 py-3">
		<code class="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm">
			<span class="select-none text-muted-foreground">$</span>
			{active.command}
		</code>
		<CopyButton text={active.command} label="Copy command" compact />
	</div>
</div>
