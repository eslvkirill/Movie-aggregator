import { PayloadAction } from '@reduxjs/toolkit';
import { validate, validateInputs } from 'shared/utils/validation';

const onChangeInputEventAction = (state: any, action: PayloadAction<any>) => {
	const { formControls } = state;
	const { event, stateName, controlName } = action.payload;

	const stateControl = formControls[stateName];
	const control = stateControl[controlName];

	control.value = event.target.value;
	control.touched = true;
	control.valid = validate(control.value, control.validation);

	stateControl[controlName] = control;

	state.isFormValid = validateInputs(stateControl);
};

export { onChangeInputEventAction };
