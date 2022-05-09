import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';

export const selectState = {
	[MovieFormFileds.genres]: createDefaultSelect(
		'Укажите жанры фильма',
		'Жанр фильма должен быть указан'
	),
	// [MovieFormFileds.actors]: createDefaultSelect(
	// 	'Выберите актёров',
	// 	'Укажите хотя бы одного актёра'
	// ),
	// [MovieFormFileds.directors]: createDefaultSelect(
	// 	'Выберите режиссёров',
	// 	'Укажите хотя бы одного режиссёра'
	// ),
	[MovieFormFileds.originCountries]: createDefaultSelect(
		'Выберите страны производства',
		'Укажите хотя-бы одну страну производства'
	),
	[MovieFormFileds.audioLanguages]: createDefaultSelect(
		'Выберите языки аудиодорожек',
		'У фильма должна быть хотя-бы одна аудиодорожка'
	),
	[MovieFormFileds.subtitleLanguages]: createDefaultSelect(
		'Выберите языки субтитров',
		'У фильма должен быть хотя-бы один язык для субтитров'
	),
	[MovieFormFileds.ageRating]: createDefaultSelect(
		'Выберите возрастной рэйтинг',
		'У фильма должен быть возрастной рейтинг',
		false,
		true
	),
};
