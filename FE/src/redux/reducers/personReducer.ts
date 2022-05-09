import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMoviesByTypeAction } from 'redux/actions/personAction';
import {
	deletePersonCreator,
	getPersonCreator,
} from 'redux/creators/personCreator';
import { REDUCER } from '../types/reducers';

const initialState = {
	person: {} as any,
	movies: {
		actor: [],
		director: [],
	} as any,
	visibleMovies: [],
	isLoading: true,
	error: '',
};

const personReducer = createSlice({
	name: REDUCER.PERSON,
	initialState,
	reducers: {
		setMoviesByType: setMoviesByTypeAction,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getPersonCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					const { name, biography, image } = action.payload;
					const { roles } = action.payload;

					state.isLoading = false;
					state.person = { name, biography, image };
					state.movies = roles;

					state.visibleMovies = state.movies.actor.length
						? state.movies.actor
						: state.movies.director;
				}
			)
			.addCase(getPersonCreator.pending.type, (state: any) => {
				state.isLoading = true;
			})
			.addCase(
				getPersonCreator.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = false;
					state.error = action.payload;
				}
			)
			.addCase(
				deletePersonCreator.fulfilled.type,
				(state, action: PayloadAction<string>) => {
					state.person = {};
					state.visibleMovies = [];
				}
			);
	},
});

export const { setMoviesByType } = personReducer.actions;

export default personReducer.reducer;
