import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_CREATOR } from 'redux/types/actionCreators';
import AuthService from 'components/feature/Auth/auth.service';

const service = AuthService;

const loginCreator = createAsyncThunk(
	AUTH_CREATOR.LOGIN,
	async (_, thunkAPI) => {
		try {
			const { loginState } = (thunkAPI.getState() as any).authReducer
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
	AUTH_CREATOR.REGISTRATION,
	async (_, thunkAPI) => {
		try {
			const { registrationState } = (thunkAPI.getState() as any).authReducer
				.formControls;

			const response = await service.registration(
				fillDataFromControls(registrationState)
			);

			return await service.getUserInfo();
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось войти в систему');
		}
	}
);

// TODO: вынести в utils
const fillDataFromControls = (control: any) => {
	return Object.keys(control).reduce((authData: any, controlName: string) => {
		authData[controlName] = control[controlName].value;

		return authData;
	}, {});
};

export { loginCreator, registrationCreator };
