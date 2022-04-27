interface InputConfig {
	placeholder: string;
	errorMessage: string;
	type?: string;
}

interface InputValidation {
	required: boolean;
	maxLength?: number;
	minLength?: number;
	number?: boolean;
	minValue?: number | string;
	maxValue?: string;
	youTube?: boolean;
	kinopoisk?: boolean;
	IMDb?: boolean;
}

export type { InputConfig, InputValidation };
