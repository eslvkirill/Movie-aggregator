import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);

const MovieService = {
	getOriginCountries: () => api.get([ENDPOINT.COUNTRIES]),

	addMovie: (data: any) => api.post([ENDPOINT.MOVIES], data, true),

	getMovieById: (movieId: string) => api.get([ENDPOINT.MOVIES, movieId]),

	deleteMovie: (movieId: string) => api.post([ENDPOINT.MOVIES, movieId]),

	updateMovie: (movieId: string, data: any) =>
		api.put([ENDPOINT.MOVIES].concat(movieId), data, true),

	getMovieCategories: (movieId: string) =>
		api.get([ENDPOINT.CATEGORIES, ENDPOINT.CHECK, movieId]),
};

export default MovieService;
