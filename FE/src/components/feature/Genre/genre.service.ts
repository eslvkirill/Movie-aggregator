import { API, ENDPOINTS, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';
import { Genre } from './genre.interface';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINTS.GENRES;

const GenreService = {
	getGenres: async () => api.get<Genre[]>([endpoint]),

	addGenre: async (data: string) => api.post<string>([endpoint], data),

	editGenre: async (genreId: string, data: any) =>
		api.put([endpoint, genreId], data),

	deleteGenre: async (genreId: string) => api.delete([endpoint, genreId]),
};

export default GenreService;
