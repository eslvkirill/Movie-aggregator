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
	user: {},
	error: '',
};

const authReducer = createSlice({
	name: REDUCER.AUTH,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				loginCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.user = action.payload;
				}
			)
			.addCase(
				loginCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					state.isFormValid = true;
					state.error = action.payload;
				}
			)
			.addCase(
				registrationCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.user = action.payload;
				}
			)
			.addCase(
				registrationCreator.rejected.type,
				(state, action: PayloadAction<any>) => {
					// state = initialState;
					state.error = action.payload;
				}
			);
	},
});

export const { onChangeInputEvent, reset } = authReducer.actions;

export default authReducer.reducer;
