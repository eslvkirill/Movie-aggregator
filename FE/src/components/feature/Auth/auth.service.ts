import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api();
const usersEndpoint = [URL, API, VERSION, ENDPOINT.USERS];

const AuthService = {
	login: (login: string | number, password: string | number) =>
		api.post<string>(
			[ENDPOINT.LOGIN],
			`login=${login}&password=${password}`,
			false,
			true
		),

	registration: (data: any) => api.post<string>(usersEndpoint, data, true),

	getUserInfo: () => api.get(usersEndpoint.concat(ENDPOINT.INFO)),
};

export default AuthService;
