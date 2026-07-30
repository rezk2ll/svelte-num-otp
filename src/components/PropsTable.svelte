<script lang="ts">
	import { props } from './api';
</script>

<!-- The table is wider than a phone and holds nothing focusable, so the scroll container
     needs to take focus itself for the Default and Description columns to be reachable. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	tabindex="0"
	role="region"
	aria-label="Component props"
	class="overflow-x-auto rounded-xl border border-border bg-card"
>
	<table class="w-full min-w-[44rem] border-collapse text-left text-sm">
		<thead>
			<tr class="border-b border-border">
				<th class="eyebrow px-4 py-3 font-normal">Prop</th>
				<th class="eyebrow px-4 py-3 font-normal">Type</th>
				<th class="eyebrow px-4 py-3 font-normal">Default</th>
				<th class="eyebrow px-4 py-3 font-normal">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each props as prop (prop.name)}
				<tr class="border-b border-border last:border-0 hover:bg-muted/40">
					<td class="whitespace-nowrap px-4 py-3 font-mono text-[0.8125rem] font-medium">
						{prop.name}
					</td>
					<td class="whitespace-nowrap px-4 py-3 font-mono text-[0.8125rem] text-muted-foreground">
						{prop.type}
					</td>
					<td class="whitespace-nowrap px-4 py-3 font-mono text-[0.8125rem] text-muted-foreground">
						{prop.fallback}
					</td>
					<td class="px-4 py-3 leading-6 text-muted-foreground">{prop.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
