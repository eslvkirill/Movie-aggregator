import { createSlice } from '@reduxjs/toolkit';
import {
	onChangeFileInputEventAction,
	onChangeInputEventAction,
	onChangeSelectEventAction,
	resetFileInputAction,
} from 'redux/actions/filmFormActions';
import { inputState } from 'redux/initial-state/filmFormState/input';
import { selectState } from 'redux/initial-state/filmFormState/select';
import { REDUCER } from '../types/reducers';

const initialState: any = {
	formControls: {
		inputControls: inputState,
		selectControls: selectState,
	},
	film: {},
	isFormValid: false,
};

const filmFormReducer = createSlice({
	name: REDUCER.FILM_FORM,
	initialState,
	reducers: {
		onChangeInputEvent: onChangeInputEventAction,
		onChangeFileInputEvent: onChangeFileInputEventAction,
		onChangeSelectEvent: onChangeSelectEventAction,
		reset: () => initialState,
		resetFileInput: resetFileInputAction,
	},
});

export const {
	onChangeInputEvent,
	onChangeFileInputEvent,
	onChangeSelectEvent,
	reset,
	resetFileInput,
} = filmFormReducer.actions;

export default filmFormReducer.reducer;
