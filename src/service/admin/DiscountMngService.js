import headerCommon from "../../common/header.common";
import httpClient from "../../common/httpClient";
import { storageKey } from "../../constant/storageKey";

const getAllDiscount = () => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'discount-management-get-all', 'GET', {}).then((response) => {
		return response.data;
	})
}

const getExpense = () => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'discount-management-get-expense', 'GET', {}).then((response) => {
		console.log(response.data)
		return response.data;
	})
}


const createDiscount = (formData) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'discount-management-create', 'POST', formData).then((response) => {
		return response.data;
	})
}

export const DiscountMngService = {
	getAllDiscount,
	createDiscount,
	getExpense
}