import { HEADER_TYPE, REQUEST } from '../constants/api';

class Api {
	public readonly url: string[];
	public readonly requestURL!: any;
	public readonly config!: any;

	constructor(url: string[] = []) {
		this.url = url;
		this.requestURL = (url: string[]) => [...this.url, ...url].join('/');
		this.config = (
			data: any,
			method: string,
			isFormData?: boolean,
			isLogin?: boolean
		) => ({
			method,
			headers: Api.setHeader(isFormData, isLogin),
			body: Api.setBody(data, isFormData, isLogin),
		});
	}

	get = async <T>(url: string[]): Promise<T> =>
		(await fetch(this.requestURL(url))).json();

	post = async <T>(
		url: string[],
		data: any,
		isFormData?: boolean,
		isRegistration?: boolean,
		isLogin?: boolean,
		method: string = REQUEST.POST
	): Promise<T> => {
		const response = await fetch(
			this.requestURL(url),
			this.config(data, method, isFormData, isLogin)
		);

		if (!response.ok) {
			throw Error('Bad request: ' + response.json());
		}

		return isFormData || isLogin || isRegistration ? response : response.json();
	};

	put = async (
		url: string[],
		data: any,
		method: string = REQUEST.PUT
	): Promise<Response> =>
		fetch(this.requestURL(url), this.config(data, method));

	delete = async (url: string[]): Promise<Response> =>
		fetch(this.requestURL(url), { method: REQUEST.DELETE });

	private static setHeader(isFormData?: boolean, isLogin?: boolean) {
		const headers: { Accept: string; ['Content-type']?: string } = {
			Accept: HEADER_TYPE.DEFAULT,
		};

		if (!isFormData) {
			headers['Content-type'] = isLogin
				? HEADER_TYPE.URL_ENCODED
				: HEADER_TYPE.DEFAULT;
		}

		return headers;
	}

	private static setBody(data: any, isFormData?: boolean, isLogin?: boolean) {
		return isLogin ? encodeURI(data) : isFormData ? data : JSON.stringify(data);
	}
}

export default Api;
