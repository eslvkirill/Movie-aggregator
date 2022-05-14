import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	onChangeFileInputEventAction,
	onChangeInputEventAction,
	onChangeTextareaEventAction,
	prefillPersonFormAction,
	setMoviesByTypeAction,
	updatePersonAction,
} from 'redux/actions/personAction';
import {
	deletePersonCreator,
	getPersonCreator,
	setImageFilesCreator,
} from 'redux/creators/personCreator';
import { inputState } from 'redux/initial-state/personState/input';
import { textareaState } from 'redux/initial-state/personState/textarea';
import { REDUCER } from '../types/reducers';

const initialState = {
	formControls: {
		inputControls: inputState,
		textareaControls: textareaState,
	},
	person: {} as any,
	movies: {
		actor: [],
		director: [],
	} as any,
	visibleMovies: [],
	isLoading: true,
	isRedirect: false,
	isFormValid: false,
	isEdit: false,
	error: '',
};

const personReducer = createSlice({
	name: REDUCER.PERSON,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		onChangeFileInputEvent: onChangeFileInputEventAction,
		onChangeTextareaEvent: onChangeTextareaEventAction,
		setMoviesByType: setMoviesByTypeAction,
		reset: () => initialState,
		makePersonEditable: (state) => {
			state.isEdit = true;
		},
		prefillPersonForm: prefillPersonFormAction,
		updatePerson: updatePersonAction,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getPersonCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					const { name, biography, image, id } = action.payload;
					const { roles } = action.payload;

					state.isLoading = false;
					state.person = { name, biography, image, id };
					state.movies = roles;

					state.visibleMovies = state.movies.actor.length
						? state.movies.actor
						: state.movies.director;
				}
			)
			.addCase(
				getPersonCreator.pending.type,
				(state: any, action: PayloadAction<any>) => {
					state.isLoading = true;
					state.isRedirect = false;
				}
			)
			.addCase(
				getPersonCreator.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = false;
					state.isRedirect = true;
					state.error = action.payload;
				}
			)
			.addCase(
				setImageFilesCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.person.image =
						state.formControls.inputControls.image.value || action.payload;
				}
			)
			.addCase(deletePersonCreator.fulfilled.type, (state) => {
				state.isRedirect = true;
				state.isLoading = false;
				state.person = {};
				state.visibleMovies = [];
			});
	},
});

export const {
	setMoviesByType,
	onChangeInputEvent,
	onChangeFileInputEvent,
	onChangeTextareaEvent,
	reset,
	makePersonEditable,
	prefillPersonForm,
	updatePerson,
} = personReducer.actions;

export default personReducer.reducer;
