import { formatCommon } from "../common/format.common";
import headerCommon from "../common/header.common";
import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";


const getTypeOfAcc = () => {
	return httpClient({}, storageKey.API, 'auth/get-type-of-accomodation', 'GET', {});
}

const getCurrentUserInfor = () => {
	return httpClient(headerCommon(), storageKey.API, `current-user`, 'GET', {})
		.then((response) => {
			return response.data
		})
}

const getExpenses = () => {
	return httpClient({}, storageKey.API, 'auth/get-type-of-post', 'GET', {}).then((response) => {
		return response.data;
	})
}

const getDiscountOfExpense = (id) => {
	return httpClient({}, storageKey.API, `auth/get-discount-of-expense?id=${id}`, 'GET', {}).then((response) => {
		return response.data;
	})
}

const sendRequestPostNews = (postNews, cost, typesOfAcc) => {
	const headers = headerCommon();
	let formData = new FormData();
	typesOfAcc.map((el) => {
		if (el.name === postNews.typesOfAcc) {
			postNews.typesOfAcc = el.id
			return
		}
	})
	postNews.price = formatCommon.convertStringNumricToNumber(postNews.price)

	const jsonPostNews = JSON.stringify({
		expense:cost.typeOfPost,
		title: postNews.title,
		description: postNews.description,
		videos:postNews.videos.map((el)=>{
			return formatCommon.getVideoIdFromUrlYoutube(el)
		}),
		totalAmount:postNews.totalAmount
	})
	const blobPostNews = new Blob([jsonPostNews], {
		type: 'application/json'
	});
	formData.append("postNews", blobPostNews);


	const jsonAccomodationInfor = JSON.stringify({
		typesOfAcc: postNews.typesOfAcc,
		airConditioner: postNews.airConditioner,
		province: postNews.province,
		district: postNews.district,
		ward: postNews.ward,
		street: postNews.street,
		area: postNews.area,
		price: postNews.price,
		numOfBed: postNews.numOfBed,
		numOfToilet: postNews.numOfToilet,
		numOfFloor: postNews.numOfFloor,
		floorNumber: postNews.floorNumber,
		furniture: postNews.furniture,
		internet: postNews.internet,
		parking: postNews.parking,
		balcony: postNews.balcony,
		airConditioner: postNews.airConditioner,
		heater: postNews.heater,
		tower: postNews.tower,
		directionHouse: postNews.directionHouse,
		directionBalcony: postNews.directionBalcony
	})
	const blobAccomodationInfor = new Blob([jsonAccomodationInfor], {
		type: 'application/json'
	});

	formData.append("accomodationInfor", blobAccomodationInfor);

	const jsonCost = JSON.stringify(cost)
	const blobCost = new Blob([jsonCost], {
		type: 'application/json'
	});
	formData.append("costCalculate", blobCost);

	for (let i = 0; i < postNews.images.length; i++) {
		formData.append("images", postNews.images[i]);
	}
	return httpClient(headers, storageKey.API, `post-news/create`, 'POST', formData).then((response) => {
		return response.data;
	})
}

export const PostNewsService = {
	getTypeOfAcc,
	getCurrentUserInfor,
	getExpenses,
	getDiscountOfExpense,
	sendRequestPostNews
}