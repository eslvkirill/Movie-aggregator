interface SelectConfig {
	placeholder: string;
	errorMessage: string;
	isMulti?: boolean;
	closeMenuOnSelect?: boolean;
}

interface SelectValidation {
	select: boolean;
}

export type { SelectConfig, SelectValidation };
