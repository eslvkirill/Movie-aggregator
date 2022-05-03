import { createAsyncThunk } from '@reduxjs/toolkit';
import MovieService from 'components/feature/Movie/movie.service';
import GenreService from 'components/feature/Genre/genre.service';
import {
	reset,
	resetFileInput,
	onChangeInputEvent,
	onChangeFileInputEvent,
} from 'redux/reducers/movieReducer';
import { MOVIE_CREATOR } from 'redux/types/actionCreators';
import {
	MovieLanguage,
	MovieAgeRating,
} from 'components/feature/Movie/movie.enum';

const movieService = MovieService;
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

const getMovieFormDataCreator = createAsyncThunk(
	MOVIE_CREATOR.GET_FORM_DATA,
	async (_, thunkAPI) => {
		try {
			const genres = await genreService.getGenres();
			const originCountries = await movieService.getOriginCountries();
			const audioLanguages = Object.values(MovieLanguage);
			const subtitleLanguages = Object.values(MovieLanguage);
			const ageRating = Object.values(MovieAgeRating);

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

export {
	resetCreator,
	onChangeEventCreator,
	getMovieFormDataCreator,
	addMovieCreator,
	getMovieByIdCreator,
};
