<script lang="ts">
	import OtpItem from './OtpItem.svelte';

	interface Props {
		numOfInputs?: number;
		value?: string;
		separator?: string;
		disableDefaultStyle?: boolean;
		inputClass?: string;
		wrapperClass?: string;
		separatorClass?: string;
		inputStyle?: string;
		wrapperStyle?: string;
		separatorStyle?: string;
		placeholder?: string;
		onlyShowMiddleSeparator?: boolean;
		autocomplete?: AutoFill;
		ariaLabel?: (index: number, total: number) => string;
		autofocus?: boolean;
	}

	let {
		numOfInputs = 6,
		value = $bindable(''),
		separator = '',
		disableDefaultStyle = false,
		inputClass = '',
		wrapperClass = '',
		separatorClass = '',
		inputStyle = '',
		wrapperStyle = '',
		separatorStyle = '',
		placeholder = '',
		onlyShowMiddleSeparator = false,
		// iOS and Android only offer a received code when every input asks for it.
		// Marking just the first fills that one box and leaves the rest empty.
		autocomplete = 'one-time-code',
		ariaLabel = (index, total) => `Digit ${index} of ${total}`,
		// Kept on by default so existing usage is unchanged. Turn it off when the code box
		// is not the reason the screen exists, or when several of them share a page.
		autofocus = true
	}: Props = $props();

	function spread(source: string, count: number): string[] {
		return [
			...source.slice(0, count).split(''),
			...Array(Math.max(0, count - source.length)).fill('')
		];
	}

	// Seeded here rather than by the effect below. Effects do not run on the server, so
	// building `codes` in one left the each-block empty and shipped markup with no inputs
	// in it at all: nothing to see before hydration, and nothing at all without JS.
	// Capturing only the initial numOfInputs is deliberate; the effect below tracks changes.
	// svelte-ignore state_referenced_locally
	let codes = $state<string[]>(spread(value, numOfInputs));
	// svelte-ignore state_referenced_locally
	let inputs = $state<(HTMLInputElement | null)[]>(Array(numOfInputs).fill(null));
	let lastValue = $state(value);

	// Resize when numOfInputs changes
	$effect(() => {
		if (codes.length !== numOfInputs) {
			codes = Array(numOfInputs).fill('');
			inputs = Array(numOfInputs).fill(null);
		}
	});

	// Sync from external value changes
	$effect(() => {
		if (value !== lastValue && value !== codes.join('')) {
			lastValue = value;
			codes = spread(value, numOfInputs);
		}
	});

	// Sync to parent value
	$effect(() => {
		const newValue = codes.join('');
		if (newValue !== value) {
			lastValue = newValue;
			value = newValue;
		}
	});

	const placeholders = $derived(
		placeholder.length < numOfInputs
			? [...placeholder.split(''), ...Array(numOfInputs - placeholder.length).fill('')]
			: placeholder.split('')
	);
</script>

<div class={`${disableDefaultStyle ? '' : 'wrapper'} ${wrapperClass}`} style={wrapperStyle}>
	{#each codes as _, i (i)}
		<OtpItem
			bind:input={inputs[i]}
			bind:value={codes[i]}
			index={i}
			bind:codes
			{inputs}
			nostyle={disableDefaultStyle}
			className={inputClass}
			style={inputStyle}
			placeholder={placeholders[i]}
			{autocomplete}
			{autofocus}
			ariaLabel={ariaLabel(i + 1, numOfInputs)}
		/>
		{#if separator && i !== codes.length - 1 && (!onlyShowMiddleSeparator || (onlyShowMiddleSeparator && i === codes.length / 2 - 1 && numOfInputs % 2 === 0))}
			<span class={separatorClass} style={separatorStyle}>{separator}</span>
		{/if}
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
