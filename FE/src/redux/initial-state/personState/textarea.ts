import { createDefaultTextarea } from 'shared/form-controls/textarea/defaultTextarea';

export const textareaState = {
	biography: createDefaultTextarea(
		'Введите биографические данные человека',
		'Поле не должно быть пустым'
	),
};
