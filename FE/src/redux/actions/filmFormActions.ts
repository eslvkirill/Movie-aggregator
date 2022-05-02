import { PayloadAction } from '@reduxjs/toolkit';
import { FilmFormFileds } from 'components/feature/Film/FilmForm/filmForm.enum';
import { validate, validateForm } from 'shared/utils/validation';

const onChangeInputEventAction = (state: any, action: PayloadAction<any>) => {
	const { film, formControls } = state;
	const { value, controlName } = action.payload;
	const { inputControls } = formControls;
	const control = { ...inputControls[controlName] };

	control.value = value;
	control.touched = true;
	control.valid = validate(control.value, control.validation);

	film[controlName] = control.value;

	if (controlName === FilmFormFileds.trailerUrl) {
		film[controlName] = control.value.replace(/watch\?v=/g, 'embed/');
	}

	inputControls[controlName] = control;
	state.isFormValid = validateForm(formControls);
};

const onChangeFileInputEventAction = (
	state: any,
	action: PayloadAction<any>
) => {
	const { formControls, film } = state;
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

	film[controlName] = value;
	state.isFormValid = validateForm(formControls);
};

const onChangeSelectEventAction = (state: any, action: PayloadAction<any>) => {
	const { film, formControls } = state;
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
		// eslint-disable-next-line prefer-destructuring
		film[controlName] = Object.values(control.value)[0];
		// [ film[controlName] ] = Object.values(control.value);
	}

	if (controlName && control.isMulti && control.value) {
		const isCreationedFields = [
			FilmFormFileds.genres,
			FilmFormFileds.actors,
			FilmFormFileds.directors,
		].includes(controlName);

		const controlValueLabel = isCreationedFields ? 'value' : 'label';

		film[controlName] = control.value.map(
			(selectValue: any) => selectValue[controlValueLabel]
		);
	}

	selectControls[controlName] = control;
	state.isFormValid = validateForm(formControls);
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
