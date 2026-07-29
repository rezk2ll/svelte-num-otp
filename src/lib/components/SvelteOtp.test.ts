import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SvelteOtp from './SvelteOtp.svelte';

describe('SvelteOtp', () => {
	it('should render 6 inputs by default', () => {
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox');
		expect(inputs).toHaveLength(6);
	});

	it('should render custom number of inputs', () => {
		render(SvelteOtp, { numOfInputs: 4 });
		const inputs = screen.getAllByRole('textbox');
		expect(inputs).toHaveLength(4);
	});

	it('should automatically focus next input when typing a digit', async () => {
		const user = userEvent.setup();
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		await user.type(inputs[0], '1');

		// Check that focus moved to second input
		expect(document.activeElement).toBe(inputs[1]);
	});

	it('should display typed values in inputs', async () => {
		const user = userEvent.setup();
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		await user.type(inputs[0], '1');
		await user.type(inputs[1], '2');
		await user.type(inputs[2], '3');

		expect(inputs[0].value).toBe('1');
		expect(inputs[1].value).toBe('2');
		expect(inputs[2].value).toBe('3');
	});

	it('should handle paste and distribute values across inputs', async () => {
		const user = userEvent.setup();
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		inputs[0].focus();
		await user.paste('123456');

		expect(inputs[0].value).toBe('1');
		expect(inputs[1].value).toBe('2');
		expect(inputs[2].value).toBe('3');
		expect(inputs[3].value).toBe('4');
		expect(inputs[4].value).toBe('5');
		expect(inputs[5].value).toBe('6');
	});

	it('should distribute multi-char input when pasted on mobile (input event without paste event)', async () => {
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		inputs[0].focus();
		await fireEvent.input(inputs[0], { target: { value: '123456' } });

		expect(inputs[0].value).toBe('1');
		expect(inputs[1].value).toBe('2');
		expect(inputs[2].value).toBe('3');
		expect(inputs[3].value).toBe('4');
		expect(inputs[4].value).toBe('5');
		expect(inputs[5].value).toBe('6');
	});

	it('should distribute multi-char input starting from a middle input', async () => {
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		inputs[2].focus();
		await fireEvent.input(inputs[2], { target: { value: '9876' } });

		expect(inputs[0].value).toBe('');
		expect(inputs[1].value).toBe('');
		expect(inputs[2].value).toBe('9');
		expect(inputs[3].value).toBe('8');
		expect(inputs[4].value).toBe('7');
		expect(inputs[5].value).toBe('6');
	});

	it('should only accept numeric values', async () => {
		const user = userEvent.setup();
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		await user.type(inputs[0], 'abc123');

		// Should only have first digit since focus shifts
		expect(inputs[0].value).toBe('1');
		expect(inputs[1].value).toBe('2');
		expect(inputs[2].value).toBe('3');
	});

	it('should ask every input for the one-time code', () => {
		render(SvelteOtp);
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		// Every one of them, not just the first: Safari fills a single box when
		// the others opt out.
		expect(inputs.map((input) => input.getAttribute('autocomplete'))).toEqual(
			Array(6).fill('one-time-code')
		);
	});

	it('should let the autocomplete be overridden', () => {
		render(SvelteOtp, { autocomplete: 'off' });
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		expect(inputs.map((input) => input.getAttribute('autocomplete'))).toEqual(Array(6).fill('off'));
	});

	it('should give each input a distinct accessible name', () => {
		render(SvelteOtp, { numOfInputs: 4 });
		const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

		expect(inputs.map((input) => input.getAttribute('aria-label'))).toEqual([
			'Digit 1 of 4',
			'Digit 2 of 4',
			'Digit 3 of 4',
			'Digit 4 of 4'
		]);
	});

	it('should let the accessible name be translated', () => {
		render(SvelteOtp, {
			numOfInputs: 3,
			ariaLabel: (index: number, total: number) => `Chiffre ${index} sur ${total}`
		});

		expect(screen.getByLabelText('Chiffre 2 sur 3')).toBe(
			(screen.getAllByRole('textbox') as HTMLInputElement[])[1]
		);
	});
});
