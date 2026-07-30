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
		autocomplete: AutoFill;
		ariaLabel: string;
		autofocus: boolean;
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
		placeholder,
		autocomplete,
		ariaLabel,
		autofocus
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

	async function replaceDigit(target: HTMLInputElement, digit: string) {
		const newCodes = [...codes];
		newCodes[index] = digit;
		codes = newCodes;
		value = digit;

		await tick();
		// `value` is set as a one way attribute, so retyping the digit a box already holds
		// changes no state and re-renders nothing, leaving the browser's two character
		// string sitting in the box.
		if (target.value !== digit) target.value = digit;
		shiftFocus();
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const digits = target.value.replace(/[^0-9]/g, '');

		if (digits.length === 0) {
			value = '';
			const newCodes = [...codes];
			newCodes[index] = '';
			codes = newCodes;
			return;
		}

		// A single typed character belongs to this box alone. When the box already holds a
		// digit the browser reports both, and spreading that pair would push the old digit's
		// neighbour out and corrupt the code.
		const existing = codes[index] ?? '';
		const typed = (event as InputEvent).data?.replace(/[^0-9]/g, '') ?? '';
		const replacement =
			typed.length === 1
				? typed
				: existing && digits.length === 2
					? digits[0] === existing
						? digits[1]
						: digits[0]
					: '';

		if (replacement) {
			replaceDigit(target, replacement);
			return;
		}

		// Mobile browsers fire `input` (not `paste`) when pasting, so this path must also
		// distribute multi-char values across subsequent inputs.
		distributeDigits(digits);
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
		if (!autofocus || index !== 0) return;

		const timer = setTimeout(() => input?.focus(), 250);

		// Cancelling matters when `autofocus` is bound to state: a wizard step that closes
		// inside the delay would otherwise pull the caret back out of wherever it moved to.
		return () => clearTimeout(timer);
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
	{autocomplete}
	aria-label={ariaLabel}
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
