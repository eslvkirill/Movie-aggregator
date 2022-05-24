import { createAsyncThunk } from '@reduxjs/toolkit';
import { SEARCH_CREATOR } from 'redux/types/actionCreators';
import SearchService from 'components/features/Search/search.service';

const service = SearchService;

const setSearchValueCreator = createAsyncThunk(
	SEARCH_CREATOR.SET_VALUE,
	async (_, thunkAPI) => {
		try {
			const { value } = (thunkAPI.getState() as any).searchReducer;

			const response: any = await service.setValue(value);

			return response.movies;
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

export { setSearchValueCreator };
