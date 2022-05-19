import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import { REGEXP } from 'shared/constants/common';

interface ValidProperties {
	valid: boolean;
	touched: boolean;
	shouldValidate: boolean;
}

const validateEmail = (email: string) =>
	REGEXP.EMAIL.test(String(email).toLowerCase());

const validateYouTubeUrl = (youTube: string) =>
	REGEXP.YOU_TUBE.VALIDATION.test(String(youTube).toLowerCase());

const validateIMDbUrl = (IMDb: string) =>
	REGEXP.IMDB.test(String(IMDb).toLowerCase());

const validateKinopoiskUrl = (kinopoisk: string) =>
	REGEXP.KINOPOISK.test(String(kinopoisk).toLowerCase());

const isInvalid = ({ valid, touched, shouldValidate }: ValidProperties) =>
	!valid && shouldValidate && touched;

const validate = (value: any, validation: any = null) => {
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
		const maxImageSize = 10485760;
		const image = 'image/';
		const validTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

		const isImageValidType = validTypes
			.map((type) => image + type)
			.includes(value.type);

		isValid = isImageValidType && value.size < maxImageSize && isValid;
	}

	return isValid;
};

const validateForm = (formControls: any) => {
	let isFormValid = true;

	Object.keys(formControls).forEach((name) => {
		for (const control in formControls[name]) {
			isFormValid =
				isFormValid &&
				formControls[name][control]?.value !== '' &&
				formControls[name][control]?.valid;
		}

		if (isFormValid === undefined) {
			isFormValid = true;
		}
	});

	return isFormValid;
};

function validateInputs(formControls: any) {
	let isFormValid = true;

	Object.keys(formControls).forEach((name) => {
		isFormValid =
			!(
				[MovieFormFileds.BACKGROUND, MovieFormFileds.POSTER] as string[]
			).includes(name) &&
			formControls[name].valid &&
			formControls[name].value !== '' &&
			isFormValid;
	});

	return isFormValid;
}

export { isInvalid, validate, validateForm, validateInputs };
