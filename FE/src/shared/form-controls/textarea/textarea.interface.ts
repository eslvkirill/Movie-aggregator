interface TextareaConfig {
	placeholder: string;
	errorMessage: string;
	type?: string;
}

interface TextareaValidation {
	required: boolean;
	minLength?: number;
}

export type { TextareaConfig, TextareaValidation };
