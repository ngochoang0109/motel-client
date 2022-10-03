import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";

const getMenuNewsCard = (pageNo, pageSize, sort, mode, type) => {
	return httpClient({}, storageKey.API,
		`auth/menu-news-all/${type ? type : ''}?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`, 'GET', {}).then((response) => {
			return response.data;
		})
}

const searchCard = (pageNo, pageSize, sort, mode, searchParam) => {
	let strParam = `?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&mode=${mode}
							&type=${searchParam.type.value}&province=${searchParam.province.value}
							&district=${searchParam.district.value}&ward=${searchParam.ward.value}
							&priceFrom=${searchParam.priceFrom}&priceTo=${searchParam.priceTo}
							&areaFrom=${searchParam.areaFrom}&areaTo=${searchParam.areaTo}`
	console.log(strParam)
	return httpClient({}, storageKey.API,
		`auth/menu-news${strParam}`, 'GET', {}).then((response) => {
			return response.data;
		})
}

export const HomeService = {
	getMenuNewsCard,
	searchCard
}