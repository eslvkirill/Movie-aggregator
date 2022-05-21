import { createDefaultInput } from 'shared/form-controls/input/defaultInput';

export const inputState = {
	category: createDefaultInput(
		'Введите название новой категории',
		'Название категории должно быть длинее 2-x букв',
		255,
		3
	),
};
