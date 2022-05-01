const MAIN_CREATORS = {
	GENRE: 'genre/',
	AUTH: 'auth/',
};

const GENRE_CREATOR = {
	GET_ALL: `${MAIN_CREATORS.GENRE}getAll`,
	ADD: `${MAIN_CREATORS.GENRE}addGenre`,
	EDIT: `${MAIN_CREATORS.GENRE}editGenre`,
	DELETE: `${MAIN_CREATORS.GENRE}deleteGenre`,
};

const AUTH_CREATOR = {
	LOGIN: `${MAIN_CREATORS.AUTH}login`,
	REGISTRATION: `${MAIN_CREATORS.AUTH}registration`,
};

export { GENRE_CREATOR, AUTH_CREATOR };
