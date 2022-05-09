import { createDefaultInput } from 'shared/form-controls/input/defaultInput';

export const inputState = {
	genre: createDefaultInput(
		'Введите новый жанр',
		'Название жанра должно быть длинее 2-x букв',
		255,
		3
	),
};
