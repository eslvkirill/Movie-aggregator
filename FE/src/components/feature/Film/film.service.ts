import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);

const FilmService = {
	getOriginCountries: () => api.get([ENDPOINT.COUNTRIES]),

	addFilm: (data: any) => api.post([ENDPOINT.MOVIES], data, true),
};

export default FilmService;
