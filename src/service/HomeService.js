import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";

const getMenuNewsCard=(pageNo, pageSize, sort, mode)=>{
	return httpClient({}, storageKey.API, `auth/menu-news?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`, 'GET', {}).then((response) => {
		return response.data;
	})
}

export const HomeService={
	getMenuNewsCard
}