import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import {
	setAggregatorsRatingsOnGeneralViewAction,
	sortAggregatorsAction,
	setDefaultFieldsAppearanceAction,
	setBackgroundAction,
} from 'redux/actions/movie/appearanceActions';
import {
	onChangeFileInputEventAction,
	onChangeInputEventAction,
	onChangeSelectEventAction,
	prefillMovieFormAction,
	resetFileInputAction,
	updateMovieAction,
} from 'redux/actions/movie/formActions';
import {
	addMovieCreator,
	getMovieByIdCreator,
	getMovieFormDataCreator,
	setImageFilesCreator,
} from 'redux/creators/movieCreator';
import { inputState } from 'redux/initial-state/movieFormState/input';
import { selectState } from 'redux/initial-state/movieFormState/select';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	formControls: {
		inputControls: inputState,
		selectControls: selectState,
	},
	movie: {
		primaryPageColor: '#bd5a31',
		secondaryPageColor: '#bd5a31',
	},
	isFormValid: false,
	notificationMessage: '',
	loading: true,
	isEdit: false,
};

const movieReducer = createSlice({
	name: REDUCER.MOVIE,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		onChangeFileInputEvent: onChangeFileInputEventAction,
		onChangeSelectEvent: onChangeSelectEventAction,
		reset: () => initialState,
		resetFileInput: resetFileInputAction,
		makeMovieEditable: (state) => {
			state.isEdit = true;
		},
		prefillMovieForm: prefillMovieFormAction,
		updateMovie: updateMovieAction,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getMovieFormDataCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					Object.keys(action.payload).map((fieldName) => {
						return (state.formControls.selectControls[fieldName].options =
							action.payload[fieldName].map((control: any, index: number) => {
								const isCustomField = (
									[
										MovieFormFileds.genres,
										MovieFormFileds.actors,
										MovieFormFileds.directors,
									] as string[]
								).includes(fieldName);

								return {
									label: isCustomField ? control.name : control,
									value: isCustomField ? control.id : index,
								};
							}));
					});
				}
			)
			.addCase(
				addMovieCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.notificationMessage = action.payload;
				}
			)
			.addCase(
				addMovieCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					state.notificationMessage = action.payload;
				}
			)
			// .addCase(
			// 	updateMovieCreator.fulfilled.type,
			// 	(state, action: PayloadAction<any>) => {
			// 		console.log(state, action);
			// 	}
			// )
			.addCase(
				setImageFilesCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.movie.background =
						state.formControls.inputControls.background.value || action.payload;
					state.movie.poster =
						state.formControls.inputControls.background.value || action.payload; // TODO: state.formControls.inputControls.poster
				}
			)
			.addCase(
				getMovieByIdCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.movie = action.payload;
					state.loading = false;

					const aggregators = state.movie.externalAggregatorsInfo;

					setAggregatorsRatingsOnGeneralViewAction(aggregators);
					sortAggregatorsAction(aggregators);
					setDefaultFieldsAppearanceAction(state.movie);
					setBackgroundAction(state.movie.background);
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
	makeMovieEditable,
	prefillMovieForm,
	updateMovie,
} = movieReducer.actions;

export default movieReducer.reducer;
