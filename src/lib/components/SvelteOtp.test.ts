import { render, screen } from '@testing-library/svelte';
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
});
