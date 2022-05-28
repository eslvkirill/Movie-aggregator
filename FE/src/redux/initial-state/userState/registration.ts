import {
	createCustomizeInput,
	createDefaultInput,
} from 'shared/form-controls/input/defaultInput';

export const registrationState = {
	firstName: createDefaultInput(
		'Имя',
		'Имя должен быть длиной от 2-х до 50-ти букв',
		50,
		2
	),
	lastName: createDefaultInput(
		'Фамилия',
		'Фамилия должна быть длиной от 2-х до 100-ти букв',
		100,
		2
	),
	username: createDefaultInput(
		'Имя пользователя',
		'Имя пользователя должно быть длиной от 3-х до 100-та символов',
		100,
		3
	),
	email: createCustomizeInput(
		{
			type: 'email',
			placeholder: 'Email адрес',
			errorMessage: 'Почта должна быть вида ivanov@yandex.ru',
		},
		{
			required: true,
			email: true,
			minLength: 0,
			maxLength: 255,
		}
	),
	password: createDefaultInput(
		'Пароль',
		'Пароль должен быть длиной от 6-ти символов',
		255,
		6,
		'password'
	),
};
