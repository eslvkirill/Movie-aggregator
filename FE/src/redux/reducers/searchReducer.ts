import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setSearchValueCreator } from 'redux/creators/searchCreator';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	movies: [],
	value: '',
	isLoading: true,
	error: '',
};

const searchReducer = createSlice({
	name: REDUCER.SEARCH,
	initialState,
	reducers: {
		reset: () => initialState,
		onChange: (state, action) => {
			console.log(action);
			state.value = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				setSearchValueCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.movies = action.payload;
					state.isLoading = false;
				}
			)
			.addCase(setSearchValueCreator.pending.type, (state) => {
				state.isLoading = true;
			})
			.addCase(
				setSearchValueCreator.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = true;
					state.error = action.payload;
				}
			);
	},
});

export const { reset, onChange } = searchReducer.actions;

export default searchReducer.reducer;
