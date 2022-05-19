import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';

export const selectState = {
	[MovieFormFileds.GENRES]: createDefaultSelect(
		'Укажите жанры фильма',
		'Жанр фильма должен быть указан'
	),
	[MovieFormFileds.ACTORS]: createDefaultSelect(
		'Выберите актёров',
		'Укажите хотя бы одного актёра'
	),
	[MovieFormFileds.DIRECTORS]: createDefaultSelect(
		'Выберите режиссёров',
		'Укажите хотя бы одного режиссёра'
	),
	[MovieFormFileds.ORIGIN_COUNTRIES]: createDefaultSelect(
		'Выберите страны производства',
		'Укажите хотя-бы одну страну производства'
	),
	[MovieFormFileds.AUDIO_LANGUAGES]: createDefaultSelect(
		'Выберите языки аудиодорожек',
		'У фильма должна быть хотя-бы одна аудиодорожка'
	),
	[MovieFormFileds.SUBTITLE_LANGUAGES]: createDefaultSelect(
		'Выберите языки субтитров',
		'У фильма должен быть хотя-бы один язык для субтитров'
	),
	[MovieFormFileds.AGE_RATING]: createDefaultSelect(
		'Выберите возрастной рэйтинг',
		'У фильма должен быть возрастной рейтинг',
		false,
		true
	),
};
