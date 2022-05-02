import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';
import { FilmFormFileds } from 'components/feature/Film/FilmForm/filmForm.enum';

export const selectState = {
	[FilmFormFileds.genres]: createDefaultSelect(
		'Укажите жанры фильма',
		'Жанр фильма должен быть указан'
	),
	// [FilmFormFileds.actors]: createDefaultSelect(
	// 	'Выберите актёров',
	// 	'Укажите хотя бы одного актёра'
	// ),
	// [FilmFormFileds.directors]: createDefaultSelect(
	// 	'Выберите режиссёров',
	// 	'Укажите хотя бы одного режиссёра'
	// ),
	[FilmFormFileds.originCountries]: createDefaultSelect(
		'Выберите страны производства',
		'Укажите хотя-бы одну страну производства'
	),
	[FilmFormFileds.audioLanguages]: createDefaultSelect(
		'Выберите языки аудиодорожек',
		'У фильма должна быть хотя-бы одна аудиодорожка'
	),
	[FilmFormFileds.subtitleLanguages]: createDefaultSelect(
		'Выберите языки субтитров',
		'У фильма должен быть хотя-бы один язык для субтитров'
	),
	[FilmFormFileds.ageRating]: createDefaultSelect(
		'Выберите возрастной рэйтинг',
		'У фильма должен быть возрастной рейтинг',
		false,
		true
	),
};
