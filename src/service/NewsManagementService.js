import headerCommon from "../common/header.common";
import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";
import { AddressApiService } from "./AddressApiService";

const getAllPostOfUser = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-all-of-user?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getWaittingApproved = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-waitting-approved?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getNewsRejected = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-news-reject?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getDontPayment = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-dont-payment?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getWaittingShowOfUser = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-waitting-show?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getNewsShowOfUser = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-news-showing?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getNewsHiddenOfUser = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-news-hidden?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getNewsExpriedOfUser = (pageNo, pageSize, sort, mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`news-management/get-news-expried?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getNewsByTextSearch = async (pageNo, pageSize, sort, mode, status, textSearh, fillterParam) => {
	const headers = headerCommon();
	const strDistricts = []
	const strProvinces = []
	// await fillterParam.province.forEach((el) => {
	// 	AddressApiService.getProvinceById(el).then(data => strProvinces.push(data.name))
	// })
	// if (fillterParam.province.length === 1) {
	// 	fillterParam.district.forEach((el) => {
	// 		AddressApiService.getDistrictById(fillterParam.province[0], el).then(data => strDistricts.push(data.name))
	// 	})
	// }
	// fillterParam.province = strProvinces
	// fillterParam.district = strDistricts
	// console.log(fillterParam)
	return httpClient(headers, storageKey.API,
		`news-management/get-news-text-search?pageNo=${pageNo}&pageSize=${pageSize}&$sort=${sort}&mode=${mode}&status=${status}&textSearch=${textSearh}`,
		'GET', fillterParam).then((response) => {
			return response.data;
		})
}

const getAllNews = (mode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'admin/news-management-list-data?mode=' + mode, 'GET', {}).then((response) => {
		return response.data;
	})
}

const approvedNews = (id) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'admin/news-management-list-data/approved-news?id=' + id, 'POST', {}).then((response) => {
		return response.data;
	})
}

const rejectedNews = (id) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'admin/news-management-list-data/reject-news?id=' + id, 'POST', {}).then((response) => {
		return response.data;
	})
}

const insertReason = (formData) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'admin/news-management-list-data/send-reason', 'POST', formData).then((response) => {
		return response.data;
	})
}

const showReason = (id) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 
		'admin/news-management-list-data/show-reason?id='+id, 
		'GET',{}).then((response) => {
		return response.data;
	})
}

const addNewsToCart = (idNews) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 
		'news-management/add-item-to-cart?idNews='+idNews, 
		'POST',{}).then((response) => {
		return response.data;
	})
}

const getCartOfUser=()=>{
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 
		'news-management/get-cart', 
		'GET',{}).then((response) => {
		console.log(response.data)
		return response.data;
	})
}

export const NewsManagementService = {
	getAllPostOfUser,
	getWaittingApproved,
	getNewsRejected,
	getDontPayment,
	getWaittingShowOfUser,
	getNewsShowOfUser,
	getNewsHiddenOfUser,
	getNewsExpriedOfUser,
	getNewsByTextSearch,
	getAllNews,
	approvedNews,
	rejectedNews,
	insertReason,
	showReason,
	addNewsToCart,
	getCartOfUser
}