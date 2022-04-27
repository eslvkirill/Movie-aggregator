import { PayloadAction } from '@reduxjs/toolkit';
import { Genre } from 'components/feature/Genre/genre.interface';
import { GenreState } from '../types/genre.interface';

const addGenreAction = (state: GenreState, action: PayloadAction<Genre>) => {
	state.genres.push({
		...action.payload,
		open: false,
	});
};

const onChangeEventAction = (
	state: GenreState,
	action: PayloadAction<Genre>
) => {
	state.genres.map((genre: Genre) => {
		if (genre.id === action.payload.id) {
			genre.name = action.payload.name;
		}
		return genre;
	});
};

const editGenreAction = (state: GenreState, action: PayloadAction<string>) => {
	const index = state.genres.findIndex(
		(genre: Genre) => genre.id === action.payload
	);
	const genre = state.genres[index];

	if (genre) {
		genre.open = !genre.open;
	}
};

const deleteGenreAction = (
	state: GenreState,
	action: PayloadAction<string>
) => {
	state.genres = state.genres.filter(
		(genre: Genre) => genre.id !== action.payload
	);
};

export {
	addGenreAction,
	onChangeEventAction,
	editGenreAction,
	deleteGenreAction,
};
