import { current, PayloadAction } from '@reduxjs/toolkit';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import { REGEXP } from 'shared/constants/common';
import {
	validate,
	validateForm,
	validateInputs,
} from 'shared/utils/validation';

const onChangeInputEventAction = (state: any, action: PayloadAction<any>) => {
	const { movie, formControls } = state;
	const { value, controlName } = action.payload;
	const { inputControls } = formControls;
	const control = { ...inputControls[controlName] };

	control.value = value;
	control.touched = true;
	control.valid = validate(control.value, control.validation);

	movie[controlName] = control.value;

	if (controlName === MovieFormFileds.trailerUrl) {
		movie[controlName] = control.value
			.replace(REGEXP.YOU_TUBE.URL.FULL, REGEXP.YOU_TUBE.REPLACER.FULL)
			.replace(REGEXP.YOU_TUBE.URL.SHORT, REGEXP.YOU_TUBE.REPLACER.SHORT);
	}

	inputControls[controlName] = control;

	state.isFormValid = validateInputs(inputControls);
};

const onChangeFileInputEventAction = (
	state: any,
	action: PayloadAction<any>
) => {
	const { formControls, movie } = state;
	const { value, controlName } = action.payload;
	const { inputControls } = formControls;
	const control = { ...inputControls[action.payload.controlName] };

	control.idSpan = controlName + control.id;

	const span = document.getElementById(control.idSpan) as HTMLElement;

	if (value) {
		control.valid = validate(value, control.validation);
		span.textContent = value.name;
		span.style.color = '#c76c04';
		span.style.right = '17%';
	} else {
		control.valid = false;
		span.textContent = control.title;
		span.style.right = '19%';
		span.style.color = 'rgb(168, 145, 118)';
	}

	movie[controlName] = value;

	formControls.inputControls[controlName] = control;

	state.isFormValid = validateInputs(formControls.inputControls);
};

const onChangeSelectEventAction = (state: any, action: PayloadAction<any>) => {
	const { movie, formControls } = state;
	const { value, controlName } = action.payload;
	const { selectControls } = formControls;
	const control = { ...selectControls[controlName] };

	control.value = value;

	if (!control.value) {
		control.errorMessage = '';
	}

	control.valid = validate(control.value, control.validation);
	control.touched = true;

	if (controlName && !control.isMulti && control.value) {
		[movie[controlName]] = Object.values(control.value);
	}

	if (controlName && control.isMulti && control.value) {
		const isCreationedFields = [
			MovieFormFileds.genres,
			MovieFormFileds.actors,
			MovieFormFileds.directors,
		].includes(controlName);

		const controlValueLabel = isCreationedFields ? 'value' : 'label';

		movie[controlName] = control.value.map(
			(selectValue: any) => selectValue[controlValueLabel]
		);
	}

	selectControls[controlName] = control;

	state.isFormValid = validateInputs(formControls.selectControls);
};

const resetFileInputAction = (state: any) => {
	const { inputControls } = state.formControls;

	Object.keys(inputControls).map((controlName) => {
		const control = inputControls[controlName];

		control.idSpan = controlName + control.id;

		const span = document.getElementById(control.idSpan) as HTMLElement;

		if (control.type === 'file') {
			span.textContent = control.title;
			span.style.right = '19%';
			span.style.color = 'rgb(168, 145, 118)';
		}

		return inputControls;
	});
};

export {
	onChangeInputEventAction,
	onChangeFileInputEventAction,
	onChangeSelectEventAction,
	resetFileInputAction,
};
