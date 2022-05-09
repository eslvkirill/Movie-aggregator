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
	value: '',
});

const createDefaultInput = (
	placeholder: string,
	errorMessage: string = 'Поле не должно быть пустым',
	maxLength: number = 255,
	minLength: number = 1,
	type: string = 'text'
) =>
	createCustomizeInput(
		{
			type,
			placeholder,
			errorMessage: `* ${errorMessage}`,
		},
		{ required: true, maxLength, minLength }
	);

export { createCustomizeInput, createDefaultInput };
