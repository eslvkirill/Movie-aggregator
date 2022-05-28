import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginState } from 'redux/initial-state/userState/login';
import { onChangeInputEventAction } from 'redux/actions/userActions';
import {
	getUserDataCreator,
	getUserGradeHistoryCreator,
	loginCreator,
	registrationCreator,
	setUserSearchCreator,
} from 'redux/creators/userCreator';
import { StateName } from 'components/features/User/Auth/auth.enum';
import { registrationState } from '../initial-state/userState/registration';
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
	users: [],
	userInfo: {},
	value: '',
	gradeHistoryMovies: {},
};

const userReducer = createSlice({
	name: REDUCER.USER,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		reset: () => initialState,
		logout: (state) => {
			localStorage.removeItem('userInfo');
			state.user = {};
			// TODO: Оставлять пользователя на той странице, на которой он находится
		},
		resetRoles: (state) => {
			state.users = [];
			state.userInfo = {};
			state.value = '';
		},
		onChange: (state, action: PayloadAction<any>) => {
			state.value = action.payload;
		},
		onChangeRole: (state: any, action: PayloadAction<any>) => {
			const { role } = action.payload;
			const { checked } = action.payload;

			checked
				? state.userInfo.roles.push(role)
				: (state.userInfo.roles = state.userInfo.roles.filter(
						(value: any) => value !== role
				  ));
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
					// state = initialState;
					state.error = action.payload;
				}
			)
			.addCase(
				setUserSearchCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.users = action.payload;
					state.isLoading = false;
				}
			)
			.addCase(setUserSearchCreator.pending.type, (state) => {
				state.isLoading = true;
			})
			.addCase(
				setUserSearchCreator.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = true;
					state.error = action.payload;
				}
			)
			.addCase(
				getUserDataCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.userInfo = action.payload;
					state.users = [];
					state.value = '';
				}
			)
			.addCase(
				getUserGradeHistoryCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.gradeHistoryMovies = action.payload.map((movieItem: any) => ({
						...movieItem.ratedMovie,
						ratingDate: movieItem.ratingDate,
						userRating: movieItem.userRating,
					}));

					console.log(state.gradeHistoryMovies);
				}
			);
	},
});

export const {
	onChangeInputEvent,
	reset,
	logout,
	onChange,
	onChangeRole,
	resetRoles,
} = userReducer.actions;

export default userReducer.reducer;
