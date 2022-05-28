import { createSlice } from '@reduxjs/toolkit';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	isModalOpen: false,
};

const backdropReducer = createSlice({
	name: REDUCER.BACKDROP,
	initialState,
	reducers: {
		closeModal: () => initialState,
		openModal: (state) => {
			state.isModalOpen = true;
		},
	},
});

export const { closeModal, openModal } = backdropReducer.actions;

export default backdropReducer.reducer;
