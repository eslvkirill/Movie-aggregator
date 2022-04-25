import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';

export const selectState = {
	genres: createDefaultSelect(
		'Укажите жанры фильма',
		'Жанр фильма должен быть указан'
	),
	actors: createDefaultSelect(
		'Выберите актёров',
		'Укажите хотя бы одного актёра'
	),
	directors: createDefaultSelect(
		'Выберите режиссёров',
		'Укажите хотя бы одного режиссёра'
	),
	countries: createDefaultSelect(
		'Выберите страны производства',
		'Укажите хотя-бы одну страну производства'
	),
	audio: createDefaultSelect(
		'Выберите языки аудиодорожек',
		'У фильма должна быть хотя-бы одна аудиодорожка'
	),
	subtitles: createDefaultSelect(
		'Выберите языки субтитров',
		'У фильма должен быть хотя-бы один язык для субтитров'
	),
	ageRating: createDefaultSelect(
		'Выберите возрастной рэйтинг',
		'У фильма должен быть возрастной рейтинг',
		false,
		true
	),
};
