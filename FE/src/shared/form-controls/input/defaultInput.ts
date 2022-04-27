import { InputConfig, InputValidation } from './input.interface';

const createCustomizeInput = (
	config: InputConfig,
	validation: InputValidation
) => ({
	...config,
	validation,
	valid: !validation,
	touched: false,
	autoComplete: 'off',
	type: 'text',
	value: '',
});

const createDefaultInput = (
	placeholder: string,
	errorMessage: string,
	maxLength: number = 255,
	minLength: number = 1
) =>
	createCustomizeInput(
		{
			placeholder,
			errorMessage: `* ${errorMessage}`,
		},
		{ required: true, maxLength, minLength }
	);

export { createCustomizeInput, createDefaultInput };
