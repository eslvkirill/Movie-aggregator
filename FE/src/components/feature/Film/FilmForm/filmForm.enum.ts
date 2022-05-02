enum FilmFormFileds {
	rusTitle = 'rusTitle',
	engTitle = 'engTitle',
	tagline = 'tagline',
	description = 'description',
	year = 'year',
	duration = 'duration',
	trailerUrl = 'trailerUrl',
	kinopoiskUrl = 'kinopoiskUrl',
	imdbUrl = 'imdbUrl',
	pageColor1 = 'pageColor1',
	pageColor2 = 'pageColor2',
	poster = 'poster',
	background = 'background',
	genres = 'genres',
	actors = 'actors',
	directors = 'directors',
	originCountries = 'originCountries',
	audioLanguages = 'audioLanguages',
	subtitleLanguages = 'subtitleLanguages',
	ageRating = 'ageRating',
}

enum FilmLanguage {
	russian = 'Русский',
	english = 'Английский',
	french = 'Французский',
	italian = 'Итальянский',
	german = 'Немецкий',
	korean = 'Корейский',
	spanish = 'Испанский',
}

enum FilmAgeRating {
	PG_13 = '12+',
	R = '16+',
	NC_17 = '18+',
}

export { FilmFormFileds, FilmLanguage, FilmAgeRating };
