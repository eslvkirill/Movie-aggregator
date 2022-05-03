import { createAsyncThunk } from '@reduxjs/toolkit';
import FilmService from 'components/feature/Film/film.service';
import GenreService from 'components/feature/Genre/genre.service';
import {
	reset,
	resetFileInput,
	onChangeInputEvent,
	onChangeFileInputEvent,
} from 'redux/reducers/filmFormReducer';
import { FILM_CREATOR } from 'redux/types/actionCreators';
import {
	FilmLanguage,
	FilmAgeRating,
} from 'components/feature/Film/FilmForm/filmForm.enum';

const filmService = FilmService;
const genreService = GenreService;

const resetCreator = () => (dispatch: any) => {
	dispatch(resetFileInput());
	dispatch(reset());
};

const onChangeEventCreator = (payload: any) => (dispatch: any) => {
	payload.isInputFileField
		? dispatch(onChangeFileInputEvent(payload))
		: dispatch(onChangeInputEvent(payload));
};

const getFilmFormDataCreator = createAsyncThunk(
	FILM_CREATOR.GET_FORM_DATA,
	async (_, thunkAPI) => {
		try {
			const genres = await genreService.getGenres();
			const originCountries = await filmService.getOriginCountries();
			const audioLanguages = Object.values(FilmLanguage);
			const subtitleLanguages = Object.values(FilmLanguage);
			const ageRating = Object.values(FilmAgeRating);

			return {
				genres,
				originCountries,
				audioLanguages,
				subtitleLanguages,
				ageRating,
			};
		} catch (e) {
			return thunkAPI.rejectWithValue(
				'Не удалось загрузить данные для создания фильма'
			);
		}
	}
);

const addFilmCreator = createAsyncThunk(
	FILM_CREATOR.ADD,
	async (_, thunkAPI) => {
		try {
			const { film } = (thunkAPI.getState() as any).filmFormReducer;

			const formData = Object.keys(film).reduce((formData, name) => {
				formData.append(name, film[name]);
				return formData;
			}, new FormData());

			await filmService.addFilm(formData);

			return film.rusTitle;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось добавить фильм');
		}
	}
);

const getFilmByIdCreator = createAsyncThunk(
	FILM_CREATOR.GET_BY_ID,
	async (movieId: string, thunkAPI) => {
		try {
			return filmService.getFilmById(movieId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные о фильме');
		}
	}
);

export {
	resetCreator,
	onChangeEventCreator,
	getFilmFormDataCreator,
	addFilmCreator,
	getFilmByIdCreator,
};
