import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api();
const userEndpoint = [URL, API, VERSION, ENDPOINT.USERS];

const UserService = {
	login: (login: string | number, password: string | number) =>
		api.post<string>(
			[ENDPOINT.LOGIN],
			`login=${login}&password=${password}`,
			false,
			false,
			true
		),

	registration: (data: any) =>
		api.post<string>(userEndpoint, data, false, true),

	getUserInfo: () => api.get([...userEndpoint, ENDPOINT.INFO]),

	setUserValue: (value: string) =>
		api.get([
			...userEndpoint.slice(0, -1),
			ENDPOINT.SEARCH,
			`${ENDPOINT.USERS}?query=${value}`,
		]),

	getUserDataById: (userId: string) => api.get([...userEndpoint, userId]),

	updateUserRole: (userId: string, data: any) =>
		api.post([...userEndpoint, userId, ENDPOINT.ROLES], data),

	getUserGradeHistory: (userId: string) =>
		api.get([...userEndpoint, userId, ENDPOINT.RATINGS]),
};

export default UserService;
