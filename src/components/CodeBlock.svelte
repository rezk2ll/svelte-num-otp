<script module lang="ts">
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import xml from 'highlight.js/lib/languages/xml';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('xml', xml);
</script>

<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	interface Props {
		code: string;
		lang?: 'xml' | 'javascript';
	}

	let { code, lang = 'xml' }: Props = $props();

	/* eslint-disable svelte/no-at-html-tags --
	   The markup rendered below comes from hljs.highlight, which escapes the source before
	   wrapping it in spans. Every caller passes a string literal written in this repo, so
	   there is no user input anywhere in the path. */
	const highlighted = $derived(hljs.highlight(code, { language: lang }).value);
</script>

<div class="relative">
	<div class="absolute right-3 top-3 z-10">
		<CopyButton text={code} label="Copy code" compact />
	</div>
	<!-- tabindex makes the overflow reachable: a long line has no focusable child of its own,
	     so without it a keyboard user cannot scroll to the end of it. The a11y rule below is
	     the general case; a scrollable region is the documented exception to it.
	     The ring has to be inset: every caller wraps this in `overflow-hidden`, which would
	     clip an offset ring away entirely and leave the focus stop invisible. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre
		tabindex="0"
		class="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6 focus-visible:ring-inset focus-visible:ring-offset-0"><code
			>{@html highlighted}</code
		></pre>
</div>
