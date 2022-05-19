const URL = 'http://localhost:3000';
const API = 'api';
const VERSION = 'v1';

const ENDPOINT = {
	GENRES: 'genres',
	LOGIN: '/login',
	USERS: 'users',
	INFO: 'info',
	MOVIES: 'movies',
	COUNTRIES: 'countries',
	PERSON: 'people',
	RATINGS: 'ratings',
};

const REQUEST = {
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

const HEADER_TYPE = {
	DEFAULT: 'application/json',
	URL_ENCODED: 'application/x-www-form-urlencoded',
};

export { URL, API, VERSION, ENDPOINT, REQUEST, HEADER_TYPE };
