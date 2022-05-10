import { createDefaultInput } from 'shared/form-controls/input/defaultInput';

const defaultMaxLength = 255;

export const loginState = {
	login: createDefaultInput(
		'Имя пользователя или Email адрес',
		'Минимальная длина поля 3 символа',
		defaultMaxLength,
		3
	),
	password: createDefaultInput(
		'Пароль',
		'Пароль должен быть длиной от 6-ти символов',
		defaultMaxLength,
		4,
		'password'
	),
};
