const REGEXP = {
	EMAIL: /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/,
	IMDB: /http(?:s?):\/\/(?:www\.)?imdb.com\/title\/tt[\d]+\/?[\w?=_\-&]*/,
	KINOPOISK: /http(?:s?):\/\/(?:www\.)?kinopoisk.ru\/film\/[\d]+\/?/,
	YOU_TUBE: {
		VALIDATION:
			/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/,
		URL: {
			FULL: /watch\?v=/g,
			SHORT: /\.be/g,
		},
		REPLACER: {
			FULL: 'embed/',
			SHORT: 'be.com/embed',
		},
	},
};

const USER_ROLES = {
	USER: 'USER',
	ADMIN: 'ADMIN',
	CRITIC: 'CRITIC',
};

const USER_OPERATIONS = {
	GRANT: 'GRANT',
	REVOKE: 'REVOKE',
};

export { REGEXP, USER_ROLES, USER_OPERATIONS };
