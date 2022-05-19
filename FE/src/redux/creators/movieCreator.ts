import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	reset,
	resetFileInput,
	onChangeInputEvent,
	onChangeFileInputEvent,
	updateMovie,
	prefillMovieForm,
} from 'redux/reducers/movieReducer';
import MovieService from 'components/features/Movie/movie.service';
import GenreService from 'components/features/Genre/genre.service';
import PersonService from 'components/features/Person/person.service';
import { MOVIE_CREATOR } from 'redux/types/actionCreators';
import { getImageFileByUrl } from 'shared/utils/common';
import {
	MovieLanguage,
	MovieAgeRating,
	MovieFormFileds,
} from 'components/features/Movie/movie.enum';

const movieService = MovieService;
const genreService = GenreService;
const personService = PersonService;

const resetCreator = () => (dispatch: any) => {
	dispatch(resetFileInput());
	dispatch(reset());
};

const onChangeEventCreator = (payload: any) => (dispatch: any) => {
	payload.isInputFileField
		? dispatch(onChangeFileInputEvent(payload))
		: dispatch(onChangeInputEvent(payload));
};

const getMovieFormDataCreator = createAsyncThunk(
	MOVIE_CREATOR.GET_FORM_DATA,
	async (_, thunkAPI) => {
		try {
			const persons = await personService.getAllPersons();
			const genres = await genreService.getGenres();
			const originCountries = await movieService.getOriginCountries();
			const actors = persons;
			const directors = persons;
			const audioLanguages = Object.values(MovieLanguage);
			const subtitleLanguages = Object.values(MovieLanguage);
			const ageRating = Object.values(MovieAgeRating);

			return {
				genres,
				originCountries,
				actors,
				directors,
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

const addMovieCreator = createAsyncThunk(
	MOVIE_CREATOR.ADD,
	async (_, thunkAPI) => {
		try {
			const { movie } = (thunkAPI.getState() as any).movieReducer;

			const formData = Object.keys(movie).reduce((formData, name) => {
				formData.append(name, movie[name]);
				return formData;
			}, new FormData());

			await movieService.addMovie(formData);

			return movie.rusTitle;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось добавить фильм');
		}
	}
);

const getMovieByIdCreator = createAsyncThunk(
	MOVIE_CREATOR.GET_BY_ID,
	async (movieId: string, thunkAPI) => {
		try {
			return movieService.getMovieById(movieId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные о фильме');
		}
	}
);

const deleteMovieCreator = createAsyncThunk(
	MOVIE_CREATOR.DELETE,
	async (movieId: string, thunkAPI) => {
		try {
			return movieService.deleteMovie(movieId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить фильм');
		}
	}
);

const updateMovieCreator = createAsyncThunk(
	MOVIE_CREATOR.UPDATE,
	async (movieId: string, thunkAPI) => {
		try {
			const { movie } = (thunkAPI.getState() as any).movieReducer;

			const formData = Object.keys(movie).reduce((formData, name) => {
				if (name !== MovieFormFileds.ID) {
					formData.append(name, movie[name]);
				}
				return formData;
			}, new FormData());

			return await movieService.updateMovie(movieId, formData);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось обновить данные о фильме');
		}
	}
);

const setImageFilesCreator = createAsyncThunk(
	MOVIE_CREATOR.SET_IMAGES,
	async (_, thunkAPI) => {
		try {
			const { movie } = (thunkAPI.getState() as any).movieReducer;
			const url = `data:image/*;base64,${movie.background}`;

			return await getImageFileByUrl(url);
		} catch (e) {
			return thunkAPI.rejectWithValue(
				'Не удалось подгрузить изображения фильма'
			);
		}
	}
);

const prefillMovieFormCreator = () => (dispatch: any) => {
	dispatch(prefillMovieForm());
	dispatch(updateMovie());
	dispatch(setImageFilesCreator());
};

export {
	resetCreator,
	onChangeEventCreator,
	getMovieFormDataCreator,
	addMovieCreator,
	getMovieByIdCreator,
	deleteMovieCreator,
	updateMovieCreator,
	setImageFilesCreator,
	prefillMovieFormCreator,
};
