enum MovieFormFileds {
	ID = 'id',
	RUS_TITLE = 'rusTitle',
	ENG_TITLE = 'engTitle',
	TAGLINE = 'tagline',
	DESCRIPTION = 'description',
	YEAR = 'year',
	DURATION = 'duration',
	TRAILER_URL = 'trailerUrl',
	KINOPOISK_URL = 'kinopoiskUrl',
	IMDB_URL = 'imdbUrl',
	PRIMARY_PAGE_COLOR = 'primaryPageColor',
	SECONDARY_PAGE_COLOR = 'secondaryPageColor',
	POSTER = 'poster',
	BACKGROUND = 'background',
	GENRES = 'genres',
	DISPLAY_GENRES = 'displayGenres',
	ACTORS = 'actors',
	DIRECTORS = 'directors',
	ORIGIN_COUNTRIES = 'originCountries',
	AUDIO_LANGUAGES = 'audioLanguages',
	SUBTITLE_LANGUAGES = 'subtitleLanguages',
	AGE_RATING = 'ageRating',
	EXTERNAL_AGGREGATORS_INFO = 'externalAggregatorsInfo',
	AVERAGE_RATINGS = 'averageRatings',
	TOTAL_RATING = 'totalRating',
	OSCARS = 'oscars',
	USER_RATINGS = 'userRatings',
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
