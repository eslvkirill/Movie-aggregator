interface InputConfig {
	placeholder: string;
	errorMessage: string;
}

interface InputValidation {
	required: boolean;
	maxLength: number;
	minLength: number;
}

const createInput = (config: InputConfig, validation: InputValidation) => ({
	...config,
	validation,
	valid: !validation,
	touched: false,
	autoComplete: 'off',
	type: 'text',
	value: '',
});

export const createNewInput = (
	placeholder: string,
	errorMessage: string,
	maxLength: number,
	minLength: number
) =>
	createInput(
		{
			placeholder,
			errorMessage: `* ${errorMessage}`,
		},
		{ required: true, maxLength, minLength }
	);
