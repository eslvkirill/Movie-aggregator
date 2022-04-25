import { HEADERS, REQUESTS } from '../constants/api';

class Api {
	public readonly url!: string[];
	public readonly requestURL!: any;
	public readonly config!: any;

	constructor(url: string[]) {
		this.url = url;
		this.requestURL = (url: string[]) => [...this.url, ...url].join('/');
		this.config = (data: any, method: string) => ({
			method,
			headers: HEADERS,
			body: JSON.stringify(data),
		});
	}

	get = async <T>(url: string[]): Promise<T> =>
		(await fetch(this.requestURL(url))).json();

	post = async <T>(
		url: string[],
		data: any,
		method: string = REQUESTS.POST
	): Promise<T> =>
		(await fetch(this.requestURL(url), this.config(data, method))).json();

	put = async (
		url: string[],
		data: any,
		method: string = REQUESTS.PUT
	): Promise<Response> =>
		fetch(this.requestURL(url), this.config(data, method));

	delete = async (url: string[]): Promise<Response> =>
		fetch(this.requestURL(url), { method: REQUESTS.DELETE });
}

export default Api;
