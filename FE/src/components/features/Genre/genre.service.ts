import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';
import { Genre } from './genre.interface';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.GENRES;

const GenreService = {
	getGenres: () => api.get<Genre[]>([endpoint]),

	addGenre: (data: string) => api.post<string>([endpoint], data),

	editGenre: (genreId: string, data: any) => api.put([endpoint, genreId], data),

	deleteGenre: (genreId: string) => api.delete([endpoint, genreId]),
};

export default GenreService;
