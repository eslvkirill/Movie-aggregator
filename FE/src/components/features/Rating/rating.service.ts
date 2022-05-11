import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.RATINGS;

const RatingService = {
	setRating: (data: any) => api.post([endpoint], data),

	// editGenre: (genreId: string, data: any) => api.put([endpoint, genreId], data),

	// deleteGenre: (genreId: string) => api.delete([endpoint, genreId]),
};

export default RatingService;
