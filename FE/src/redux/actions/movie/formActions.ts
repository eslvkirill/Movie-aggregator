import { PayloadAction } from '@reduxjs/toolkit';
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

	if (controlName === MovieFormFileds.TRAILER_URL) {
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
	inputControls[controlName] = control;

	state.isFormValid = validateInputs(inputControls);
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
			MovieFormFileds.GENRES,
			MovieFormFileds.ACTORS,
			MovieFormFileds.DIRECTORS,
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

const prefillMovieFormAction = (state: any) => {
	const fileFields = [MovieFormFileds.POSTER, MovieFormFileds.BACKGROUND];
	const customFields = [
		MovieFormFileds.GENRES,
		MovieFormFileds.ACTORS,
		MovieFormFileds.DIRECTORS,
	];

	Object.keys(state.movie).map((movieField: any) => {
		Object.keys(state.formControls.inputControls).map((inputField: any) => {
			if (movieField === MovieFormFileds.EXTERNAL_AGGREGATORS_INFO) {
				state.movie[movieField].map((aggregator: any) => {
					if (aggregator.name === 'Kinopoisk') {
						state.formControls.inputControls[
							MovieFormFileds.KINOPOISK_URL
						].value = aggregator.url;
					} else if (aggregator.name === 'Imdb') {
						state.formControls.inputControls[MovieFormFileds.IMDB_URL].value =
							aggregator.url;
					}

					return state.formControls.inputControls;
				});
			} else if (
				movieField === MovieFormFileds.TRAILER_URL &&
				movieField === inputField
			) {
				state.formControls.inputControls[inputField].value = state.movie[
					movieField
				].replace('embed/', 'watch?v=');
			} else if (
				movieField === MovieFormFileds.DURATION &&
				movieField === inputField
			) {
				state.formControls.inputControls[inputField].value = state.movie[
					movieField
				]
					.replace(/[^+\d]/g, '')
					.replace(/\s/g, '')
					.replace(/(.{2})/g, '$1:')
					.slice(0, -1);
			} else if (
				!fileFields.includes(movieField) &&
				movieField === inputField
			) {
				state.formControls.inputControls[inputField].value =
					state.movie[movieField];
			} else if (fileFields.includes(movieField) && movieField === inputField) {
				const control = state.formControls.inputControls[inputField];

				control.idSpan = inputField + control.id;

				const span = document.getElementById(control.idSpan) as HTMLElement;
				span.textContent = 'Измените изображение';
				span.style.right = '19%';
				span.style.color = 'rgb(168, 145, 118)';
			}

			return state.formControls.inputControls;
		});

		Object.keys(state.formControls.selectControls).map((selectField: any) => {
			if (!customFields.includes(movieField) && movieField === selectField) {
				state.formControls.selectControls[selectField].value = state.movie[
					movieField
				]
					.split(',')
					.map((value: string, index: number) => ({
						label: value,
						value: index,
					}));
			} else if (
				customFields.includes(movieField) &&
				movieField === selectField
			) {
				state.formControls.selectControls[selectField].value = state.movie[
					movieField
				].map((person: any) => {
					person.value = person.id;
					person.label = person.name;

					delete person.id;
					delete person.name;

					return person;
				});
			}

			return state.formControls.selectControls;
		});

		return state.formControls;
	});
};

const updateMovieAction = (state: any) => {
	delete state.movie[MovieFormFileds.AVERAGE_RATINGS];
	delete state.movie[MovieFormFileds.OSCARS];
	delete state.movie[MovieFormFileds.USER_RATINGS];
	delete state.movie[MovieFormFileds.DISPLAY_GENRES];

	Object.keys(state.movie).map((movieField: any) => {
		const isCreationedFields = [
			MovieFormFileds.GENRES,
			MovieFormFileds.ACTORS,
			MovieFormFileds.DIRECTORS,
		].includes(movieField);

		if (movieField === MovieFormFileds.EXTERNAL_AGGREGATORS_INFO) {
			state.movie[movieField].map((aggregator: any) => {
				if (aggregator.name === 'Kinopoisk') {
					state.movie.kinopoiskUrl = aggregator.url;
				} else if (aggregator.name === 'Imdb') {
					state.movie.imdbUrl = aggregator.url;
				}

				return state.formControls.inputControls;
			});
		} else if (movieField === MovieFormFileds.DURATION) {
			state.movie[movieField] = state.movie[movieField]
				.replace(/[^+\d]/g, '')
				.replace(/\s/g, '')
				.replace(/(.{2})/g, '$1:')
				.concat('00');
		}

		const controlValueLabel = isCreationedFields ? 'value' : 'label';

		Object.keys(state.formControls.selectControls).map((selectField: any) => {
			if (movieField === selectField) {
				state.movie[movieField] = state.formControls.selectControls[
					movieField
				].value.map((selectValue: any) => selectValue[controlValueLabel]);

				if (movieField === MovieFormFileds.AGE_RATING)
					state.movie[movieField] = state.movie[movieField].join();
			}

			return state.movie;
		});

		return state.movie;
	});

	delete state.movie[MovieFormFileds.EXTERNAL_AGGREGATORS_INFO];
};

export {
	onChangeInputEventAction,
	onChangeFileInputEventAction,
	onChangeSelectEventAction,
	resetFileInputAction,
	prefillMovieFormAction,
	updateMovieAction,
};
