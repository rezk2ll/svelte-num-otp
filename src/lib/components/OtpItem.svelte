<script lang="ts">
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

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value.replace(/[^0-9]/g, '');

		if (inputValue.length > 0) {
			const newValue = inputValue[0];
			value = newValue;
			// Trigger reactivity by creating new array
			const newCodes = [...codes];
			newCodes[index] = newValue;
			codes = newCodes;
			// Clear extra characters and shift focus
			target.value = newValue;
			setTimeout(() => shiftFocus(), 0);
		} else {
			value = '';
			const newCodes = [...codes];
			newCodes[index] = '';
			codes = newCodes;
		}
	}

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const paste = event.clipboardData?.getData('text');
		if (!paste) return;

		const numericPasteValue = paste.replace(/[^0-9]/g, '').slice(0, codes.length - index);
		
		// Update current input
		if (numericPasteValue.length > 0) {
			value = numericPasteValue[0];
		}

		// Update subsequent inputs
		for (let i = 1; i < numericPasteValue.length; i++) {
			if (index + i < codes.length) {
				codes[index + i] = numericPasteValue[i];
			}
		}

		const newFocusIndex = Math.min(index + numericPasteValue.length, inputs.length - 1);
		setTimeout(() => {
			if (newFocusIndex >= 0 && newFocusIndex < inputs.length && inputs[newFocusIndex]) {
				(inputs[newFocusIndex] as HTMLInputElement).focus();
			}
		}, 0);
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
