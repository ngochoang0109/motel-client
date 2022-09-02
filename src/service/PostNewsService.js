import headerCommon from "../common/header.common";
import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";


const getTypeOfAcc=()=>{
	return httpClient({},storageKey.API, 'auth/get-type-of-accomodation', 'GET', {});
}

const getCurrentUserInfor=()=>{
	return httpClient(headerCommon(),storageKey.API,`current-user`,'GET', {})
				.then((response)=>{
					return response.data
				})
}

const getExpenses=()=>{
	return httpClient({},storageKey.API,'auth/get-type-of-post','GET',{}).then((response)=>{
		return response.data;
	})
}

const getDiscountOfExpense=(id)=>{
	return httpClient({},storageKey.API,`auth/get-discount-of-expense?id=${id}`,'GET',{}).then((response)=>{
		return response.data;
	})
}

export const PostNewsService = {
	getTypeOfAcc,
	getCurrentUserInfor,
	getExpenses,
	getDiscountOfExpense
}