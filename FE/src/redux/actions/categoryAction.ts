import { PayloadAction } from '@reduxjs/toolkit';

const addCategoryAction = (state: any, action: PayloadAction<any>) => {
	state.categories.push({
		...action.payload,
		open: false,
	});
};

const onChangeEventAction = (state: any, action: PayloadAction<any>) => {
	state.categories.map((category: any) => {
		if (category.id === action.payload.id) {
			category.name = action.payload.name;
		}
		return category;
	});
};

const editCategoryAction = (state: any, action: PayloadAction<string>) => {
	const index = state.categories.findIndex(
		(category: any) => category.id === action.payload
	);
	const category = state.categories[index];

	if (category) {
		category.open = !category.open;
	}
};

const deleteCategoryAction = (state: any, action: PayloadAction<string>) => {
	state.categories = state.categories.filter(
		(category: any) => category.id !== action.payload
	);
};

export {
	addCategoryAction,
	onChangeEventAction,
	editCategoryAction,
	deleteCategoryAction,
};
