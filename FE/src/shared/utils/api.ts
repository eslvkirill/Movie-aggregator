import { HEADER_TYPE, REQUEST } from '../constants/api';

class Api {
	public readonly url: string[];
	public readonly requestURL!: any;
	public readonly config!: any;

	constructor(url: string[] = []) {
		this.url = url;
		this.requestURL = (url: string[]) => [...this.url, ...url].join('/');
		this.config = (data: any, method: string, isAuth?: boolean) => ({
			method,
			headers: {
				Accept: HEADER_TYPE.DEFAULT,
				'Content-Type': isAuth ? HEADER_TYPE.AUTH : HEADER_TYPE.DEFAULT,
			},
			body: isAuth ? encodeURI(data) : JSON.stringify(data),
		});
	}

	get = async <T>(url: string[]): Promise<T> =>
		(await fetch(this.requestURL(url))).json();

	post = async <T>(
		url: string[],
		data: any,
		isFormData?: boolean,
		isAuth?: boolean,
		method: string = REQUEST.POST
	): Promise<T> => {
		const response = await fetch(
			this.requestURL(url),
			this.config(data, method, isAuth)
		);

		if (!response.ok) {
			throw Error('Bad request: ' + response.status);
		}

		return isAuth || isFormData ? response : response.json();
	};

	put = async (
		url: string[],
		data: any,
		method: string = REQUEST.PUT
	): Promise<Response> =>
		fetch(this.requestURL(url), this.config(data, method));

	delete = async (url: string[]): Promise<Response> =>
		fetch(this.requestURL(url), { method: REQUEST.DELETE });
}

export default Api;
