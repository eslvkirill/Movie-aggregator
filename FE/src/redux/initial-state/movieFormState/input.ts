import {
	createDefaultInput,
	createCustomizeInput,
} from 'shared/form-controls/input/defaultInput';
import { createColorInput } from 'shared/form-controls/input/colorInput';
import { createDefaultFileInput } from 'shared/form-controls/input/fileInput';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';

export const inputState = {
	[MovieFormFileds.rusTitle]: createDefaultInput(
		'Введите название на русском языке',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	[MovieFormFileds.engTitle]: createDefaultInput(
		'Название на языке оригинала',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	[MovieFormFileds.tagline]: createDefaultInput(
		'Введите слоган фильма',
		'Поле не должно быть пустым и превышать 255 символов'
	),
	[MovieFormFileds.description]: createDefaultInput(
		'Опишите краткий сюжет',
		'Поле не может быть пустым',
		2000
	),
	[MovieFormFileds.year]: createCustomizeInput(
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
	[MovieFormFileds.duration]: createCustomizeInput(
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
	[MovieFormFileds.trailerUrl]: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку трейлера с YouTube',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://youtube.com/',
		},
		{ required: true, minLength: 1, youTube: true }
	),
	[MovieFormFileds.kinopoiskUrl]: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку на Kinopoisk',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://www.kinopoisk.ru/',
		},
		{ required: true, minLength: 1, kinopoisk: true }
	),
	[MovieFormFileds.imdbUrl]: createCustomizeInput(
		{
			placeholder: 'Вставьте ссылку на IMDb',
			errorMessage:
				'*Поле не может быть пустым и должно быть с https://www.imdb.com/',
		},
		{ required: true, minLength: 1, IMDb: true }
	),
	[MovieFormFileds.primaryPageColor]: createColorInput(
		'Основной цвет оформления:'
	),
	[MovieFormFileds.secondaryPageColor]: createColorInput(
		'Побочный цвет оформления:'
	),
	[MovieFormFileds.poster]: createDefaultFileInput(
		'Постер фильма',
		'Файл должен быть картинкой, не превышающей размер 1Мб',
		1
	),
	[MovieFormFileds.background]: createDefaultFileInput(
		'Фон страницы фильма',
		'Файл должен быть картинкой, не превышающей размер 1Мб',
		2
	),
};
