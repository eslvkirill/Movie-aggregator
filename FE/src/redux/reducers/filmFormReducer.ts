import { createSlice, current } from '@reduxjs/toolkit';
import {
	onChangeFileInputEventAction,
	onChangeInputEventAction,
	onChangeSelectEventAction,
	resetFileInputAction,
} from 'redux/actions/filmFormActions';
import { inputState } from '../../components/feature/Film/FilmForm/form-controls/input/state';
import { selectState } from '../../components/feature/Film/FilmForm/form-controls/select/state';
import { REDUCERS } from '../types/reducers';

const initialState: any = {
	formControls: {
		inputControls: inputState,
		selectControls: selectState,
	},
	film: {},
	isFormValid: false,
};

const filmFormReducer = createSlice({
	name: REDUCERS.FILM_FORM,
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
