import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieFormFileds } from 'components/feature/Movie/movie.enum';
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
	resetFileInputAction,
} from 'redux/actions/movie/formActions';
import {
	addMovieCreator,
	getMovieByIdCreator,
	getMovieFormDataCreator,
} from 'redux/creators/movieCreator';
import { inputState } from 'redux/initial-state/movieFormState/input';
import { selectState } from 'redux/initial-state/movieFormState/select';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	formControls: {
		inputControls: inputState,
		selectControls: selectState,
	},
	movie: {},
	isFormValid: false,
	notificationMessage: '',
	loading: true,
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getMovieFormDataCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					Object.keys(action.payload).map((fieldName) => {
						return (state.formControls.selectControls[fieldName].options =
							action.payload[fieldName].map((control: any, index: number) => {
								const isGenreField = fieldName === MovieFormFileds.genres;

								return {
									label: isGenreField ? control.name : control,
									value: isGenreField ? control.id : index,
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
} = movieReducer.actions;

export default movieReducer.reducer;
