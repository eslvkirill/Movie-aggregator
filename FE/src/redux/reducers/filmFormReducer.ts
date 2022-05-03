import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmFormFileds } from 'components/feature/Film/FilmForm/filmForm.enum';
import {
	setAggregatorsRatingsOnGeneralViewAction,
	sortAggregatorsAction,
	setDefaultFieldsAppearanceAction,
	setBackgroundAction,
} from 'redux/actions/film/appearanceActions';
import {
	onChangeFileInputEventAction,
	onChangeInputEventAction,
	onChangeSelectEventAction,
	resetFileInputAction,
} from 'redux/actions/film/formActions';
import {
	addFilmCreator,
	getFilmByIdCreator,
	getFilmFormDataCreator,
} from 'redux/creators/filmFormCreator';
import { inputState } from 'redux/initial-state/filmFormState/input';
import { selectState } from 'redux/initial-state/filmFormState/select';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	formControls: {
		inputControls: inputState,
		selectControls: selectState,
	},
	film: {},
	isFormValid: false,
	notificationMessage: '',
	loading: true,
};

const filmFormReducer = createSlice({
	name: REDUCER.FILM_FORM,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		onChangeFileInputEvent: onChangeFileInputEventAction,
		onChangeSelectEvent: onChangeSelectEventAction,
		reset: () => initialState,
		resetFileInput: resetFileInputAction,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getFilmFormDataCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					Object.keys(action.payload).map((fieldName) => {
						return (state.formControls.selectControls[fieldName].options =
							action.payload[fieldName].map((control: any, index: number) => {
								const isGenreField = fieldName === FilmFormFileds.genres;

								return {
									label: isGenreField ? control.name : control,
									value: isGenreField ? control.id : index,
								};
							}));
					});
				}
			)
			.addCase(
				addFilmCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.notificationMessage = action.payload;
				}
			)
			.addCase(
				addFilmCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					state.notificationMessage = action.payload;
				}
			)
			.addCase(
				getFilmByIdCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.film = action.payload;
					state.loading = false;

					const aggregators = state.film.externalAggregatorsInfo;

					setAggregatorsRatingsOnGeneralViewAction(aggregators);
					sortAggregatorsAction(aggregators);
					setDefaultFieldsAppearanceAction(state.film);
					setBackgroundAction(state.film.background);
				}
			);
	},
});

export const {
	onChangeInputEvent,
	onChangeFileInputEvent,
	onChangeSelectEvent,
	reset,
	resetFileInput,
} = filmFormReducer.actions;

export default filmFormReducer.reducer;
