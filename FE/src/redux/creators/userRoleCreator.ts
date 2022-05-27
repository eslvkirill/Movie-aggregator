import { createAsyncThunk } from '@reduxjs/toolkit';
import UserRoleService from 'components/features/UserRole/userRole.service';
import { onChangeRole } from 'redux/reducers/userRoleReducer';
import { USER_ROLE_CREATOR } from 'redux/types/actionCreators';

const service = UserRoleService;

const setUserSearchCreator = createAsyncThunk(
	USER_ROLE_CREATOR.SET_VALUE,
	async (_, thunkAPI) => {
		try {
			const { value } = (thunkAPI.getState() as any).userRoleReducer;

			return await service.setUserValue(value);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

const getUserDataCreator = createAsyncThunk(
	USER_ROLE_CREATOR.GET_DATA,
	async (userId: string, thunkAPI) => {
		try {
			return await service.getUserDataById(userId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

const updateUserRoleCreator = createAsyncThunk(
	USER_ROLE_CREATOR.UPDATE,
	async (data: any, thunkAPI) => {
		try {
			const { userId, body } = data;

			return await service.updateUserRole(userId, body);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

export { setUserSearchCreator, getUserDataCreator, updateUserRoleCreator };
