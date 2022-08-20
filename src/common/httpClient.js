import axios from 'axios';
import { storageKey } from './../constant/storageKey';

const httpClient = (headers,host,endpoint, method = "GET", data) => {
	return axios({
			headers:headers,
			method: method,
			url: `${host}/${endpoint}`,
			data: data
	});
}

export default httpClient;