import Input from 'components/shared/form-controls/Input/Input';
import { inputState } from './state';

export const renderInputs = (onInputChangeHandler: any) => {
	const inputControls = inputState;

	console.log(inputControls);

	return Object.keys(inputControls).map((controlName, index) => {
		const control = inputControls[controlName as keyof typeof inputControls];
		const { id, type, placeholder, value, accept, valid, touched, label, autoComplete, validation, errorMessage, title } = control;

		return (
			<Input
				key={controlName}
				id={controlName}
				className={controlName}
				idSpan={controlName + id}
				type={type}
				placeholder={placeholder}
				value={value}
				accept={accept}
				valid={valid}
				touched={touched}
				label={label}
				autoComplete={autoComplete}
				shouldValidate={!!validation}
				errorMessage={errorMessage}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChangeHandler(event, controlName)}
				// onClick={() => onAddFileClickHandler(controlName)}
				title={title}
			/>
		);
	});
};