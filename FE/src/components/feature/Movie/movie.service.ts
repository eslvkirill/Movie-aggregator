import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);

const MovieService = {
	getOriginCountries: () => api.get([ENDPOINT.COUNTRIES]),

	addMovie: (data: any) => api.post([ENDPOINT.MOVIES], data, true),

	getMovieById: (movieId: string) => api.get([ENDPOINT.MOVIES].concat(movieId)),
};

export default MovieService;
