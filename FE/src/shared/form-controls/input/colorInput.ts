import { InputValidation } from './input.interface';

export const createColorInput = (
	placeholder: string,
	validation: InputValidation = { required: true, minLength: 1 }
) => ({
	placeholder,
	validation,
	valid: !validation,
	touched: false,
	autoComplete: 'on',
	type: 'color',
	errorMessage: '*Выберите цвет',
	value: '#bd5a31',
});
