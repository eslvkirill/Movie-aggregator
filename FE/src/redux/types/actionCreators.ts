const MAIN_CREATORS = {
	GENRE: 'genre/',
};

const GENRE_CREATOR = {
	GET_ALL: `${MAIN_CREATORS.GENRE}getAll`,
	ADD: `${MAIN_CREATORS.GENRE}addGenre`,
	EDIT: `${MAIN_CREATORS.GENRE}editGenre`,
	DELETE: `${MAIN_CREATORS.GENRE}deleteGenre`,
};

export { GENRE_CREATOR };
