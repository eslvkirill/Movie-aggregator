interface ValidProperties {
	valid: boolean;
	touched: boolean;
	shouldValidate: boolean;
}

const validateEmail = (email: string) => {
	const re = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
	return re.test(String(email).toLowerCase());
};

const validateYouTubeUrl = (youTube: string) => {
	const regexp =
		/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;
	return regexp.test(String(youTube).toLowerCase());
};

const validateIMDbUrl = (IMDb: string) => {
	const regexp =
		/http(?:s?):\/\/(?:www\.)?imdb.com\/title\/tt[\d]+\/?[\w?=_\-&]*/;
	return regexp.test(String(IMDb).toLowerCase());
};

const validateKinopoiskUrl = (kinopoisk: string) => {
	const regexp = /http(?:s?):\/\/(?:www\.)?kinopoisk.ru\/film\/[\d]+\/?/;
	return regexp.test(String(kinopoisk).toLowerCase());
};

export const isInvalid = ({
	valid,
	touched,
	shouldValidate,
}: ValidProperties) => !valid && shouldValidate && touched;

export const validate = (value: any, validation: any = null) => {
	if (!validation) {
		return true;
	}

	let isValid: boolean | number = true;

	if (validation.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (validation.email) {
		isValid = validateEmail(value) && isValid;
	}

	if (validation.minLength) {
		isValid = value.length >= validation.minLength && isValid;
	}

	if (validation.maxLength) {
		isValid = value.length <= validation.maxLength && isValid;
	}

	if (validation.minValue) {
		isValid = value >= validation.minValue && isValid;
	}

	if (validation.maxValue) {
		isValid = value <= validation.maxValue && isValid;
	}

	if (validation.price) {
		isValid = parseInt(value) && value >= 0 && isValid;
	}

	if (validation.number) {
		isValid = parseInt(value) && isValid;
	}

	if (validation.youTube) {
		isValid = validateYouTubeUrl(value) && isValid;
	}

	if (validation.IMDb) {
		isValid = validateIMDbUrl(value) && isValid;
	}

	if (validation.kinopoisk) {
		isValid = validateKinopoiskUrl(value) && isValid;
	}

	if (validation.select) {
		isValid =
			value !== null &&
			(Object.keys(value).length !== 0 || value.length >= 1) &&
			isValid;
	}

	if (validation.imageFile) {
		isValid =
			(value.type === 'image/png' ||
				value.type === 'image/jpg' ||
				value.type === 'image/jpeg' ||
				value.type === 'image/gif' ||
				value.type === 'image/webp' ||
				value.type === 'image/svg') &&
			value.size < 10485760 &&
			isValid;
	}

	return isValid;
};

export const validateForm = (formControls: any) => {
	let isFormValid = true;

	Object.keys(formControls).forEach((name) => {
		for (const control in formControls[name]) {
			isFormValid =
				formControls[name][control].valid &&
				formControls[name][control].value !== '' &&
				isFormValid;
		}
	});

	return isFormValid;
};

export function validateInputs(formControls: any) {
	let isFormValid = true;

	Object.keys(formControls).forEach((name) => {
		isFormValid =
			formControls[name].valid &&
			formControls[name].value !== '' &&
			isFormValid;
	});

	return isFormValid;
}
