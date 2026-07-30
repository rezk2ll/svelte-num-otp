<script lang="ts" generics="Id extends string">
	interface Props {
		items: { id: Id; label: string }[];
		active: Id;
		/** Package manager names read better in the same face as the command under them. */
		mono?: boolean;
	}

	let { items, active = $bindable(), mono = false }: Props = $props();
</script>

<!--
	Plain buttons rather than role="tab". The tablist contract also wants a role="tabpanel"
	per tab, aria-controls pointing at it, and roving tabindex with arrow-key focus. Claiming
	the role without those announces a relationship to a screen reader that the markup cannot
	honour, and leaves arrow keys dead for anyone who has learned the pattern.
-->
<div class="flex items-center gap-1">
	{#each items as item (item.id)}
		<button
			type="button"
			aria-pressed={active === item.id}
			onclick={() => (active = item.id)}
			class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors hover:text-foreground {mono
				? 'font-mono'
				: ''} {active === item.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}"
		>
			{item.label}
		</button>
	{/each}
</div>
