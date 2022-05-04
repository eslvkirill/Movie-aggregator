import { TextareaConfig, TextareaValidation } from './textarea.interface';

const createCustomizeTextarea = (
	config: TextareaConfig,
	validation: TextareaValidation
) => ({
	...config,
	validation,
	valid: !validation,
	touched: false,
	autoComplete: 'off',
	value: '',
});

const createDefaultTextarea = (
	placeholder: string,
	errorMessage: string,
	minLength: number = 1,
	type: string = 'text'
) =>
	createCustomizeTextarea(
		{
			type,
			placeholder,
			errorMessage: `* ${errorMessage}`,
		},
		{ required: true, minLength }
	);

export { createCustomizeTextarea, createDefaultTextarea };
