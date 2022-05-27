import { API, ENDPOINT, URL, VERSION } from 'shared/constants/api';
import Api from 'shared/utils/api';

const api = new Api([URL, API, VERSION, ENDPOINT.USERS]);

const UserRoleService = {
	setUserValue: (value: string) =>
		api.get([`${ENDPOINT.SEARCH}?query=${value}`]),

	getUserDataById: (userId: string) => api.get([userId]),

	updateUserRole: (userId: string, data: any) =>
		api.post([userId, ENDPOINT.ROLES], data),
};

export default UserRoleService;
