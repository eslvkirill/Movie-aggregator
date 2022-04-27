import {
	reset,
	resetFileInput,
	onChangeInputEvent,
	onChangeFileInputEvent,
} from 'redux/reducers/filmFormReducer';

export const resetCreator = () => (dispatch: any) => {
	dispatch(resetFileInput());
	dispatch(reset());
};

export const onChangeEventCreator = (payload: any) => (dispatch: any) => {
	payload.isInputFileField
		? dispatch(onChangeFileInputEvent(payload))
		: dispatch(onChangeInputEvent(payload));
};
