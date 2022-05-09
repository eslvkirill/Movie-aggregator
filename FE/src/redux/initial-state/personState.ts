import { createDefaultInput } from 'shared/form-controls/input/defaultInput';
import { createDefaultFileInput } from 'shared/form-controls/input/fileInput';

export const inputState = {
	firstName: createDefaultInput('Введите имя человека'),
	lastName: createDefaultInput('Введите фамилию человека'),
	biography: createDefaultInput(
		'Введите биографические данные человека',
		'Поле не должно быть пустым',
		1000
	),
	image: createDefaultFileInput(
		'Фото человека',
		'Файл должен быть картинкой, не превышающей размер 1Мб'
	),
};
