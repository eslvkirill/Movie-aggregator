import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginState } from 'redux/initial-state/authState/login';
import { onChangeInputEventAction } from 'redux/actions/authActions';
import { loginCreator, registrationCreator } from 'redux/creators/authCreator';
import { StateName } from 'components/features/Auth/auth.enum';
import { registrationState } from '../initial-state/authState/registration';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	formControls: {
		[StateName.login]: loginState,
		[StateName.registration]: registrationState,
	},
	isFormValid: false,
	isLoading: false,
	user: JSON.parse(localStorage.getItem('userInfo') as string) || {},
	error: '',
};

const authReducer = createSlice({
	name: REDUCER.AUTH,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		reset: () => initialState,
		logout: (state) => {
			localStorage.removeItem('userInfo');
			state.user = {};
			// TODO: Оставлять пользователя на той странице, на которой он находится
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				loginCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false;
					state.user = action.payload;
					localStorage.setItem('userInfo', JSON.stringify(state.user));
					state.formControls = initialState.formControls;
					state.isFormValid = initialState.isFormValid;
				}
			)
			.addCase(loginCreator.pending.type, (state) => {
				state.isLoading = true;
			})
			.addCase(
				loginCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					state.isFormValid = true;
					state.isLoading = false;
					state.error = action.payload;
				}
			)
			.addCase(
				registrationCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.user = action.payload;
					localStorage.setItem('userInfo', JSON.stringify(state.user));
				}
			)
			.addCase(
				registrationCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					console.log(action);
					// state = initialState;
					state.error = action.payload;
				}
			);
	},
});

export const { onChangeInputEvent, reset, logout } = authReducer.actions;

export default authReducer.reducer;
