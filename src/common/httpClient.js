import { storageKey } from "../constant/storagekey";

const httpClient = (headers,endpoint, method = "GET", data) => {
	return axios({
			headers:headers,
			method: method,
			url: `${storageKey.API}/${endpoint}`,
			data: data
	});
}

export default httpClient;