const createFileInput = (config: any, validation: any) => ({
	...config,
	validation,
	valid: !validation,
	touched: false,
	autoComplete: 'on',
	value: '',
	type: 'file',
	accept: 'image/*',
	idSpan: '',
});

export const createDefaultFileInput = (
	title: string,
	errorMessage: string,
	id: number = 0
) =>
	createFileInput(
		{ id, title, errorMessage: `*${errorMessage}` },
		{ required: false, imageFile: true }
	);
