export interface PropDoc {
	name: string;
	type: string;
	fallback: string;
	description: string;
}

export const props: PropDoc[] = [
	{
		name: 'value',
		type: 'string',
		fallback: "''",
		description: 'The code itself. Bindable, and always the digits currently in the boxes.'
	},
	{
		name: 'numOfInputs',
		type: 'number',
		fallback: '6',
		description: 'How many boxes to render.'
	},
	{
		name: 'separator',
		type: 'string',
		fallback: "''",
		description: 'Character drawn between the boxes.'
	},
	{
		name: 'onlyShowMiddleSeparator',
		type: 'boolean',
		fallback: 'false',
		description: 'Draw the separator once, in the middle. Needs an even number of boxes.'
	},
	{
		name: 'placeholder',
		type: 'string',
		fallback: "''",
		description: 'Spread one character per box, so "------" places a dash in each of six.'
	},
	{
		name: 'autocomplete',
		type: 'AutoFill',
		fallback: "'one-time-code'",
		description:
			'Autofill hint set on every box. iOS and Android only offer the received code when each box asks for it.'
	},
	{
		name: 'autofocus',
		type: 'boolean',
		fallback: 'true',
		description:
			'Focus the first box on mount. Turn it off when the code box is not the point of the screen.'
	},
	{
		name: 'ariaLabel',
		type: '(index: number, total: number) => string',
		fallback: '(i, total) => `Digit ${i} of ${total}`',
		description: 'Builds the accessible name of each box. Override it to translate.'
	},
	{
		name: 'disableDefaultStyle',
		type: 'boolean',
		fallback: 'false',
		description: 'Drop the built-in styling, including the flex row, and start from nothing.'
	},
	{
		name: 'wrapperClass',
		type: 'string',
		fallback: "''",
		description: 'Class added to the wrapper element.'
	},
	{
		name: 'inputClass',
		type: 'string',
		fallback: "''",
		description: 'Class added to every box.'
	},
	{
		name: 'separatorClass',
		type: 'string',
		fallback: "''",
		description: 'Class added to every separator.'
	},
	{
		name: 'wrapperStyle',
		type: 'string',
		fallback: "''",
		description: 'Inline style applied to the wrapper element.'
	},
	{
		name: 'inputStyle',
		type: 'string',
		fallback: "''",
		description: 'Inline style applied to every box.'
	},
	{
		name: 'separatorStyle',
		type: 'string',
		fallback: "''",
		description: 'Inline style applied to every separator.'
	}
];
