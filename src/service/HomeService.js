import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";

const searchCard = (pageNo, pageSize, sort, mode, searchParam) => {
	let strParam = `?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&mode=${mode}
							&textSearch=${searchParam.textSearch}
							&type=${searchParam.type.value}&province=${searchParam.province.value}
							&district=${searchParam.district.value}&ward=${searchParam.ward.value}
							&priceFrom=${searchParam.priceFrom}&priceTo=${searchParam.priceTo}
							&areaFrom=${searchParam.areaFrom}&areaTo=${searchParam.areaTo}
							&numBeds=${searchParam.numbeds}&directionHouse=${searchParam.directionHouse}
							&media=${searchParam.media}`
	return httpClient({}, storageKey.API,
		`auth/menu-news${strParam}`, 'GET', {}).then((response) => {
			return response.data;
		})
}

const countByProvince = () => {
	return httpClient({}, storageKey.API,
		`auth/menu-news/total-news-province`, 'GET', {}).then((response) => {
			return response.data;
		})
}

export const HomeService = {
	searchCard,
	countByProvince
}