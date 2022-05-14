import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);
const endpoint = ENDPOINT.PERSON;

const PersonService = {
	addPerson: (data: any) => api.post([endpoint], data, true),

	getPerson: (personId: string) => api.get([endpoint, personId]),

	getAllPersons: () => api.get([endpoint]),

	deletePerson: (personId: string) => api.delete([endpoint, personId]),

	updatePerson: (personId: string, data: any) =>
		api.put([endpoint].concat(personId), data, true),
};

export default PersonService;
