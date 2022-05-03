import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from 'components/features/Genre/genre.interface';
import { GenreState } from 'redux/types/genre.interface';
import {
	addGenreAction,
	onChangeEventAction,
	editGenreAction,
	deleteGenreAction,
} from 'redux/actions/genreActions';
import { getGenresCreator } from 'redux/creators/genreCreator';
import { REDUCER } from '../types/reducers';

const initialState: GenreState = {
	genres: [],
	isLoading: true,
	error: '',
};

const genreReducer = createSlice({
	name: REDUCER.GENRE,
	initialState,
	reducers: {
		addGenre: addGenreAction,
		onChangeEvent: onChangeEventAction,
		editGenre: editGenreAction,
		deleteGenre: deleteGenreAction,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getGenresCreator.fulfilled.type,
				(state, action: PayloadAction<Genre[]>) => {
					const genres = action.payload;
					genres.map((genre: Genre) => (genre.open = false));

					state.isLoading = false;
					state.genres = genres;
				}
			)
			.addCase(getGenresCreator.pending.type, (state: GenreState) => {
				state.isLoading = true;
			})
			.addCase(
				getGenresCreator.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = true;
					state.error = action.payload;
				}
			);
	},
});

export const { addGenre, onChangeEvent, editGenre, deleteGenre } =
	genreReducer.actions;

export default genreReducer.reducer;
