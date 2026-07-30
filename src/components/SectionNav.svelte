<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		sections: { id: string; label: string }[];
	}

	let { sections }: Props = $props();

	// Nothing is current until a section reaches the band under the header.
	let active = $state('');

	onMount(() => {
		const visible = new Set<string>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target.id);
					else visible.delete(entry.target.id);
				}

				// `sections` is in document order, so the first one still in the band is the
				// topmost. Going through a set rather than the entry list matters twice: entry
				// order is not specified, so reading the last one can mark a section the reader
				// has scrolled past, and tracking exits is what lets the nav go quiet again
				// once everything is above or below the band.
				active = sections.find((section) => visible.has(section.id))?.id ?? '';
			},
			// The band starts where `scroll-padding-top` puts an anchored heading, so the
			// section you jump to is the one that lights up.
			{ rootMargin: '-88px 0px -70% 0px' }
		);

		for (const section of sections) {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		}

		return () => observer.disconnect();
	});
</script>

<nav aria-label="On this page" class="sticky top-24">
	<p class="eyebrow mb-3">On this page</p>
	<ul class="space-y-1 border-l border-border">
		{#each sections as section (section.id)}
			<li>
				<a
					href="#{section.id}"
					aria-current={active === section.id ? 'true' : undefined}
					class="-ml-px block border-l py-1 pl-4 text-sm transition-colors {active === section.id
						? 'border-foreground font-medium text-foreground'
						: 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					{section.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
