import { current, PayloadAction } from '@reduxjs/toolkit';
import { validate, validateInputs } from 'shared/utils/validation';

const setMoviesByTypeAction = (
	state: any,
	action?: PayloadAction<string | undefined>
) => {
	action?.payload &&
		state.movies[action.payload].length &&
		(state.visibleMovies = state.movies[action.payload]);
};

const onChangeInputEventAction = (state: any, action: PayloadAction<any>) => {
	const { person, formControls } = state;
	const { value, controlName } = action.payload;
	const { inputControls } = formControls;
	const control = { ...inputControls[controlName] };

	control.value = value;
	control.touched = true;
	control.valid = validate(control.value, control.validation);

	person[controlName] = control.value;
	inputControls[controlName] = control;

	state.isFormValid = validateInputs(inputControls);
};

const onChangeFileInputEventAction = (
	state: any,
	action: PayloadAction<any>
) => {
	const { formControls, person } = state;
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

	person[controlName] = value;
	inputControls[controlName] = control;

	state.isFormValid = validateInputs(inputControls);
};

const onChangeTextareaEventAction = (
	state: any,
	action: PayloadAction<any>
) => {
	const { person, formControls } = state;
	const { value, controlName } = action.payload;
	const { textareaControls } = formControls;
	const control = { ...textareaControls[controlName] };

	control.value = value;
	control.touched = true;
	control.valid = validate(control.value, control.validation);

	textareaControls[controlName] = control;
	person[controlName] = control.value;

	state.isFormValid = validateInputs(textareaControls);
};

const prefillPersonFormAction = (state: any) => {
	const nameParts = state.person.name.split(' ');
	state.formControls.inputControls.firstName.value =
		nameParts[nameParts.length - 1];
	state.formControls.inputControls.lastName.value = nameParts.pop();
	state.formControls.inputControls.image.title = 'Измените изображение';

	state.formControls.textareaControls.biography.value = state.person.biography;

	delete state.person.name;
};

const updatePersonAction = (state: any) => {
	state.person.firstName = state.formControls.inputControls.firstName.value;
	state.person.lastName = state.formControls.inputControls.lastName.value;
	state.person.biography = state.formControls.textareaControls.biography.value;
};

export {
	setMoviesByTypeAction,
	onChangeInputEventAction,
	onChangeFileInputEventAction,
	onChangeTextareaEventAction,
	prefillPersonFormAction,
	updatePersonAction,
};
