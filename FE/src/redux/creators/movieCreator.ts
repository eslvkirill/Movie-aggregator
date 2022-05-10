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
					id: '1237cbb9-8f97-43a6-9ac3-791f5ab97f02',
					name: 'Брэд Питт',
				},
				{
					id: '174fb052-3d64-475e-a96a-ed7185ef6b01',
					name: 'Том Круз',
				},
				{
					id: '1943ab5b-3b18-49d5-b76a-35854400e3fb',
					name: 'Том Круз',
				},
				{
					id: '259b7b07-daf5-4dae-b13d-56c91d1fed1e',
					name: 'Том Круз',
				},
				{
					id: '839daa6f-5cec-44f3-a7c7-e8836e728c3e',
					name: 'Том Круз',
				},
				{
					id: '8d18d3fa-e239-456f-bc37-5911a4f7aa6d',
					name: 'Том Круз',
				},
			];
			const directors = [
				{
					id: '96bc15a5-ad37-4cf2-b885-a21a48356d54',
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
