import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION]);

const SearchService = {
	setValue: (value: string) => api.get([`${ENDPOINT.SEARCH}?query=${value}`]),
};

export default SearchService;
