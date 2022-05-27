import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
	getUserDataCreator,
	setUserSearchCreator,
	updateUserRoleCreator,
} from 'redux/creators/userRoleCreator';
import { USER_ROLES } from 'shared/constants/common';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	users: [],
	userInfo: {},
	value: '',
	isLoading: true,
	error: '',
	isChecked: false,
};

const userRoleReducer = createSlice({
	name: REDUCER.USER_ROLE,
	initialState,
	reducers: {
		reset: () => initialState,
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
			);
	},
});

export const { reset, onChange, onChangeRole } = userRoleReducer.actions;

export default userRoleReducer.reducer;
