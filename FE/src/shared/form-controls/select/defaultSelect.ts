import { SelectConfig, SelectValidation } from './select.interface';

const createCustomizeSelect = (
	config: SelectConfig,
	validation: SelectValidation
) => ({
	...config,
	validation,
	valid: !validation,
	touched: false,
	isSearchable: true,
	isClearable: true,
	value: '',
	options: [],
});

export const createDefaultSelect = (
	placeholder: string,
	errorMessage?: string,
	isMulti: boolean = true,
	closeMenuOnSelect: boolean = false
) =>
	createCustomizeSelect(
		{
			placeholder,
			errorMessage: `* ${errorMessage}`,
			isMulti,
			closeMenuOnSelect,
		},
		{ select: true }
	);
