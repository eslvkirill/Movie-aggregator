import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from 'components/features/Category/category.service';
import {
	addCategory,
	deleteCategory,
	editCategory,
} from 'redux/reducers/categoryReducer';
import { CATEGORY_CREATOR } from 'redux/types/actionCreators';

const service = CategoryService;

const getCategoriesCreator = createAsyncThunk(
	CATEGORY_CREATOR.GET_ALL,
	async (userId: string, thunkAPI) => {
		try {
			return await service.getCategories(userId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные');
		}
	}
);

const addCategoryCreator = createAsyncThunk(
	CATEGORY_CREATOR.ADD,
	async (categoryName: string, thunkAPI) => {
		try {
			const response = await service.addCategory(categoryName);

			return thunkAPI.dispatch(
				addCategory({ id: response, name: categoryName })
			);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось добавить данные');
		}
	}
);

const editCategoryCreator = createAsyncThunk(
	CATEGORY_CREATOR.EDIT,
	async (categoryId: string, thunkAPI) => {
		try {
			const category = (
				thunkAPI.getState() as any
			).categoryReducer.categories.find(
				(category: any) => category.id === categoryId
			);

			await service.editCategory(categoryId, { name: category.name });

			return thunkAPI.dispatch(editCategory(categoryId));
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить данные');
		}
	}
);

const deleteCategoryCreator = createAsyncThunk(
	CATEGORY_CREATOR.DELETE,
	async (categoryId: string, thunkAPI) => {
		try {
			await service.deleteCategory(categoryId);

			return thunkAPI.dispatch(deleteCategory(categoryId));
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить данные');
		}
	}
);

export {
	getCategoriesCreator,
	addCategoryCreator,
	editCategoryCreator,
	deleteCategoryCreator,
};
