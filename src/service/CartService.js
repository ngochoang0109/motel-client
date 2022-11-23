import headerCommon from "../common/header.common"
import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";

const deletedPostOfCart = (cartId, postId) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`cart-management/deleted-item/${cartId}/${postId}`,
		'POST', {}).then((response) => {
			console.log(response.data)
			return response.data;
		})
}

const updateItemOfCart = (updateItemCart, cartId, postId) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`cart-management/update-item-of-cart/${cartId}/${postId}`,
		'POST', updateItemCart).then((response) => {
			return response.data;
		})
}

const updateItemsOfCart = (updateItemCart, cartId, postId) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`cart-management/update-items-of-cart/${cartId}`,
		'POST', updateItemCart).then((response) => {
			return response.data;
		})
}

const createPayment = (cartId) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`payment/create-payment/${cartId}`,
		'POST', {}).then((response) => {
			return response.data;
		})
}

const getPaymentById = (paymentId) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`payment/get-payment/${paymentId}`,
		'GET', {}).then((response) => {
			return response.data;
		})
}

const getUrlVnpay = (vnPay) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		"payment/pay-vnpay",
		'POST', { paymentId: vnPay.paymentId, bankCode: vnPay.bankCode, ipUser: vnPay.ipUser }).then((response) => {
			return response.data;
		})
}

const checkUpdatePayment = (paymentId, payDate, responseCode) => {
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		`payment/update-payment-vnpay?paymentId=${paymentId}&payDate=${payDate}&responseCode=${responseCode}`,
		'POST', {}).then((response) => {
			return response.data;
		})
}

const getHistoryPayment = () =>{
	const headers = headerCommon();
	return httpClient(headers, storageKey.API,
		'payment/history',
		'GET', {}).then((response) => {
			return response.data;
		})
}

export const CartService = {
	deletedPostOfCart,
	updateItemOfCart,
	updateItemsOfCart,
	createPayment,
	getPaymentById,
	getUrlVnpay,
	checkUpdatePayment,
	getHistoryPayment
}