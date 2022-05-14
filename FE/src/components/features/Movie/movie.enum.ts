enum MovieFormFileds {
	id = 'id',
	rusTitle = 'rusTitle',
	engTitle = 'engTitle',
	tagline = 'tagline',
	description = 'description',
	year = 'year',
	duration = 'duration',
	trailerUrl = 'trailerUrl',
	kinopoiskUrl = 'kinopoiskUrl',
	imdbUrl = 'imdbUrl',
	primaryPageColor = 'primaryPageColor',
	secondaryPageColor = 'secondaryPageColor',
	poster = 'poster',
	background = 'background',
	genres = 'genres',
	displayGenres = 'displayGenres',
	actors = 'actors',
	directors = 'directors',
	originCountries = 'originCountries',
	audioLanguages = 'audioLanguages',
	subtitleLanguages = 'subtitleLanguages',
	ageRating = 'ageRating',
	externalAggregatorsInfo = 'externalAggregatorsInfo',
	averageRatings = 'averageRatings',
	oscars = 'oscars',
	userRatings = 'userRatings',
}

enum MovieLanguage {
	russian = 'Русский',
	english = 'Английский',
	french = 'Французский',
	italian = 'Итальянский',
	german = 'Немецкий',
	korean = 'Корейский',
	spanish = 'Испанский',
}

enum MovieAgeRating {
	PG_13 = '12+',
	R = '16+',
	NC_17 = '18+',
}

export { MovieFormFileds, MovieLanguage, MovieAgeRating };
