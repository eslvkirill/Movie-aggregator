import { createSlice } from '@reduxjs/toolkit';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	isModalOpen: false,
};

const authReducer = createSlice({
	name: REDUCER.BACKDROP,
	initialState,
	reducers: {
		closeModal: () => initialState,
		openModal: (state) => {
			state.isModalOpen = true;
		},
	},
});

export const { closeModal, openModal } = authReducer.actions;

export default authReducer.reducer;
