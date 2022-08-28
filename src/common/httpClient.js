import axios from 'axios';

const httpClient = (headers,host,endpoint, method = "GET", data) => {
	return axios({
			headers:headers,
			method: method,
			url: `${host}/${endpoint}`,
			data: data
	});
}

export default httpClient;