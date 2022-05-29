import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.CATEGORIES;

const CategoryService = {
	getCategories: (userId: string) =>
		api.get<any[]>([endpoint, ENDPOINT.OWNER, userId]),

	addCategory: (data: string) => api.post<string>([endpoint], data),

	editCategory: (categoryId: string, data: any) =>
		api.put([endpoint, categoryId], data),

	deleteCategory: (categoryId: string) => api.delete([endpoint, categoryId]),

	addMovieIntoCategory: (categoryId: string, movieId: string) =>
		api.post<string>([endpoint, categoryId, ENDPOINT.ITEMS, movieId], '', true),

	getCategoryMovies: (categoryId: string) =>
		api.get<any[]>([endpoint, categoryId, ENDPOINT.ITEMS]),

	deleteMovieInCategory: (categoryId: string, movieId: string) =>
		api.delete([endpoint, categoryId, ENDPOINT.ITEMS, movieId]),
};

export default CategoryService;
