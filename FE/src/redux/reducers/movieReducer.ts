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
	addMovieIntoCategoryCreator,
	deleteMovieInCategoryCreator,
} from 'redux/creators/categoryCreator';
import {
	addMovieCreator,
	getMovieByIdCreator,
	getMovieCategoriesCreator,
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
	isLoading: true,
	isEdit: false,
	categories: [],
	containsCategories: [],
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
		resetCategories: (state) => {
			state.categories = [];
			state.containsCategories = [];
		},
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
										MovieFormFileds.GENRES,
										MovieFormFileds.ACTORS,
										MovieFormFileds.DIRECTORS,
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
			.addCase(
				setImageFilesCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.movie.background =
						state.formControls.inputControls.background.value || action.payload;
					state.movie.poster =
						state.formControls.inputControls.poster.value || action.payload;
				}
			)
			.addCase(
				getMovieByIdCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.movie = action.payload;
					state.isLoading = false;
					state.isEdit = false;

					const aggregators = state.movie.externalAggregatorsInfo;

					setAggregatorsRatingsOnGeneralViewAction(aggregators);
					sortAggregatorsAction(aggregators);
					setDefaultFieldsAppearanceAction(state.movie);
					setBackgroundAction(state.movie.background);
				}
			)
			.addCase(
				getMovieCategoriesCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.categories = action.payload.map((category: any) => ({
						label: category.categoryName,
						value: category.categoryId,
					}));

					action.payload.map((category: any) => {
						if (category.contains) {
							state.containsCategories.push({
								label: category.categoryName,
								value: category.categoryId,
							});
						}

						return state.containsCategories;
					});
				}
			)
			.addCase(
				addMovieIntoCategoryCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.containsCategories.push(action.payload);
				}
			)
			.addCase(
				deleteMovieInCategoryCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.containsCategories = state.containsCategories.filter(
						(category: any) => category.value !== action.payload
					);
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
	resetCategories,
} = movieReducer.actions;

export default movieReducer.reducer;
