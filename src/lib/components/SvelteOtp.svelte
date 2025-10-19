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
		onlyShowMiddleSeparator = false
	}: Props = $props();

	let codes = $state<string[]>([]);
	let inputs = $state<(HTMLInputElement | null)[]>([]);
	let lastValue = $state('');

	// Initialize
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
			codes = [
				...value.slice(0, numOfInputs).split(''),
				...Array(Math.max(0, numOfInputs - value.length)).fill('')
			];
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
