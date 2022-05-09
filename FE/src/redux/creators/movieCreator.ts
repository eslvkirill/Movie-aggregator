import { createAsyncThunk } from '@reduxjs/toolkit';
import MovieService from 'components/features/Movie/movie.service';
import GenreService from 'components/features/Genre/genre.service';
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
} from 'components/features/Movie/movie.enum';

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
			const actors = [
				{
					id: '56dd36b4-10fa-46a3-81b3-0a4c0b742c22',
					name: 'Брэд Питт',
				},
				{
					id: '0cd236c1-8a73-4a25-ae17-d3b37ebb2016',
					name: 'Том Круз',
				},
			];
			const directors = [
				{
					id: 'a0453ea7-61f1-4080-977d-6c3fa428bd98',
					name: 'Уэс Андерсон',
				},
			];
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

export {
	resetCreator,
	onChangeEventCreator,
	getMovieFormDataCreator,
	addMovieCreator,
	getMovieByIdCreator,
};
