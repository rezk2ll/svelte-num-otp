<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		input?: HTMLInputElement | null;
		index: number;
		value: string;
		codes: string[];
		inputs: (HTMLInputElement | null)[];
		nostyle: boolean;
		className: string;
		style: string;
		placeholder: string;
	}

	let {
		input = $bindable(null),
		index,
		value = $bindable(),
		codes = $bindable(),
		inputs,
		nostyle,
		className,
		style,
		placeholder
	}: Props = $props();

	function shiftFocus(forward = true) {
		if (forward) {
			if (index < inputs.length - 1 && inputs[index + 1]) {
				(inputs[index + 1] as HTMLInputElement).focus();
			}
		} else {
			if (index > 0 && inputs[index - 1]) {
				(inputs[index - 1] as HTMLInputElement).focus();
			}
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
		}

		if (event.key === 'ArrowRight' && index < inputs.length - 1 && inputs[index + 1]) {
			(inputs[index + 1] as HTMLInputElement).focus();
		} else if (event.key === 'ArrowLeft' && index > 0 && inputs[index - 1]) {
			(inputs[index - 1] as HTMLInputElement).focus();
		} else if (event.key === 'Backspace' && value === '') {
			shiftFocus(false);
		}
	}

	async function distributeDigits(digits: string) {
		const slice = digits.replace(/[^0-9]/g, '').slice(0, codes.length - index);
		if (slice.length === 0) return;

		const newCodes = [...codes];
		for (let i = 0; i < slice.length; i++) {
			newCodes[index + i] = slice[i];
		}
		codes = newCodes;
		value = slice[0];

		const focusAt = Math.min(index + slice.length, inputs.length - 1);
		await tick();
		inputs[focusAt]?.focus();
	}

	function handleInput(event: Event) {
		// Mobile browsers fire `input` (not `paste`) when pasting, so this path must also
		// distribute multi-char values across subsequent inputs.
		const target = event.target as HTMLInputElement;
		const inputValue = target.value.replace(/[^0-9]/g, '');

		if (inputValue.length === 0) {
			value = '';
			const newCodes = [...codes];
			newCodes[index] = '';
			codes = newCodes;
			return;
		}

		distributeDigits(inputValue);
	}

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const paste = event.clipboardData?.getData('text');
		if (!paste) return;
		distributeDigits(paste);
	}

	function validateNumericInput(event: KeyboardEvent) {
		if (
			!/^[0-9]$/.test(event.key) &&
			!event.ctrlKey &&
			!['Backspace', 'ArrowLeft', 'ArrowRight'].includes(event.key)
		) {
			event.preventDefault();
		}
	}

	$effect(() => {
		if (index === 0) {
			setTimeout(() => {
				input?.focus();
			}, 250);
		}
	});
</script>

<input
	class={`${nostyle ? '' : 'default-input'} ${className}`}
	bind:this={input}
	onkeydown={handleKeyDown}
	oninput={handleInput}
	onpaste={handlePaste}
	onkeypress={validateNumericInput}
	inputmode="numeric"
	pattern="[0-9]*"
	{style}
	{value}
	{placeholder}
/>

<style>
	.default-input {
		width: 30px;
		height: 40px;
		text-align: center;
		border: 1px solid black;
		margin: 0;
	}
</style>
