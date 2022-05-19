import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = (movieId: string, ratingId?: string) => [
	`${ENDPOINT.MOVIES}/${movieId}/${ENDPOINT.RATINGS}${
		ratingId ? '/' + ratingId : ''
	}`,
];

const RatingService = {
	addRating: (movieId: string, data: any) => api.post(endpoint(movieId), data),

	updateRating: (movieId: string, ratingId: string, data: any) =>
		api.put(endpoint(movieId, ratingId), data, false, true),

	deleteRating: (movieId: string, ratingId: string) =>
		api.delete(endpoint(movieId, ratingId)),
};

export default RatingService;
