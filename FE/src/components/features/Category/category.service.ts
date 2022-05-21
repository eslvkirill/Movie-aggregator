import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.CATEGORIES;

const CategoryService = {
	getCategories: (userId: string) =>
		api.get<any[]>([endpoint.concat(`/owner/${userId}`)]),

	addCategory: (data: string) => api.post<string>([endpoint], data),

	editCategory: (categoryId: string, data: any) =>
		api.put([endpoint, categoryId], data),

	deleteCategory: (categoryId: string) => api.delete([endpoint, categoryId]),
};

export default CategoryService;
