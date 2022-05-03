import { createAsyncThunk } from '@reduxjs/toolkit';
import GenreService from 'components/features/Genre/genre.service';
import { Genre } from 'components/features/Genre/genre.interface';
import { addGenre, deleteGenre, editGenre } from 'redux/reducers/genreReducer';
import { GENRE_CREATOR } from 'redux/types/actionCreators';

const service = GenreService;

const getGenresCreator = createAsyncThunk(
	GENRE_CREATOR.GET_ALL,
	async (_, thunkAPI) => {
		try {
			return await service.getGenres();
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные');
		}
	}
);

const addGenreCreator = createAsyncThunk(
	GENRE_CREATOR.ADD,
	async (genreName: string, thunkAPI) => {
		try {
			const response = await service.addGenre(genreName);

			return thunkAPI.dispatch(addGenre({ id: response, name: genreName }));
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось добавить данные');
		}
	}
);

const editGenreCreator = createAsyncThunk(
	GENRE_CREATOR.EDIT,
	async (genreId: string, thunkAPI) => {
		try {
			const genre = (thunkAPI.getState() as any).genreReducer.genres.find(
				(genre: Genre) => genre.id === genreId
			);

			await service.editGenre(genreId, { name: genre.name });

			return thunkAPI.dispatch(editGenre(genreId));
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить данные');
		}
	}
);

const deleteGenreCreator = createAsyncThunk(
	GENRE_CREATOR.DELETE,
	async (genreId: string, thunkAPI) => {
		try {
			await service.deleteGenre(genreId);

			return thunkAPI.dispatch(deleteGenre(genreId));
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить данные');
		}
	}
);

export {
	getGenresCreator,
	addGenreCreator,
	editGenreCreator,
	deleteGenreCreator,
};
