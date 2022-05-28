import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_CREATOR } from 'redux/types/actionCreators';
import { fillDataFromControls } from 'shared/utils/common';
import UserService from 'components/features/User/user.service';

const service = UserService;

const loginCreator = createAsyncThunk(
	USER_CREATOR.LOGIN,
	async (_, thunkAPI) => {
		try {
			const { loginState } = (thunkAPI.getState() as any).userReducer
				.formControls;
			const { login, password }: any = fillDataFromControls(loginState);

			await service.login(login, password);

			return await service.getUserInfo();
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось войти в систему');
		}
	}
);

const registrationCreator = createAsyncThunk(
	USER_CREATOR.REGISTRATION,
	async (_, thunkAPI) => {
		try {
			const { registrationState } = (thunkAPI.getState() as any).userReducer
				.formControls;

			await service.registration(fillDataFromControls(registrationState));

			return await service.getUserInfo();
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось войти в систему');
		}
	}
);

const setUserSearchCreator = createAsyncThunk(
	USER_CREATOR.SET_ROLE,
	async (_, thunkAPI) => {
		try {
			const { value } = (thunkAPI.getState() as any).userReducer;

			return await service.setUserValue(value);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

const getUserDataCreator = createAsyncThunk(
	USER_CREATOR.GET_DATA,
	async (userId: string, thunkAPI) => {
		try {
			return await service.getUserDataById(userId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

const updateUserRoleCreator = createAsyncThunk(
	USER_CREATOR.UPDATE_ROLE,
	async (data: any, thunkAPI) => {
		try {
			const { userId, body } = data;

			return await service.updateUserRole(userId, body);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

const getUserGradeHistoryCreator = createAsyncThunk(
	USER_CREATOR.GRADE_HISTORY,
	async (userId: string, thunkAPI) => {
		try {
			return await service.getUserGradeHistory(userId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Ничего не найдено');
		}
	}
);

export {
	loginCreator,
	registrationCreator,
	setUserSearchCreator,
	getUserDataCreator,
	updateUserRoleCreator,
	getUserGradeHistoryCreator,
};
