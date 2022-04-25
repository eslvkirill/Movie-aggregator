import {
	createDefaultInput,
	createCustomizeInput,
} from 'shared/form-controls/input/defaultInput';
import { createColorInput } from 'shared/form-controls/input/colorInput';
import { createDefaultFileInput } from 'shared/form-controls/input/fileInput';

export const inputState = {
	rusTitle: createDefaultInput(
		'Введите название на русском языке',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	engTitle: createDefaultInput(
		'Название на языке оригинала',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	tagline: createDefaultInput(
		'Введите слоган фильма',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	plot: createDefaultInput(
		'Опишите краткий сюжет',
		'Поле не может быть пустым'
	),
	year: createCustomizeInput(
		{
			type: 'number',
			placeholder: 'Введите год выхода фильма',
			errorMessage: '*Год выхода фильма должен быть реальным',
		},
		{
			required: true,
			number: true,
			minLength: 4,
			maxLength: 4,
			minValue: 1888,
		}
	),
	time: createCustomizeInput(
		{
			type: 'time',
			placeholder: 'Продолжительность:',
			errorMessage: '*Время должно быть реальным',
		},
		{
			required: true,
			minValue: '00:01',
			maxValue: '12:00',
		}
	),
	trailerUrl: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку трейлера с YouTube',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://youtube.com/',
		},
		{ required: true, minLength: 1, youTube: true }
	),
	kinopoiskUrl: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку на Kinopoisk',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://www.kinopoisk.ru/',
		},
		{ required: true, minLength: 1, kinopoisk: true }
	),
	imdbUrl: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку на IMDb',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://www.imdb.com/',
		},
		{ required: true, minLength: 1, IMDb: true }
	),
	pageColor1: createColorInput('Основной цвет оформления:'),
	pageColor2: createColorInput('Побочный цвет оформления:'),
	poster: createDefaultFileInput(
		'Постер фильма',
		'Файл должен быть картинкой, не превышающей размер 1Мб',
		1
	),
	background: createDefaultFileInput(
		'Фон страницы фильма',
		'Файл должен быть картинкой, не превышающей размер 1Мб',
		2
	),
};
