import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.PERSON;

const PersonService = {
	getPerson: (personId: string) => api.get([endpoint, personId]),

	deletePerson: (personId: string) => api.delete([endpoint, personId]),
};

export default PersonService;
