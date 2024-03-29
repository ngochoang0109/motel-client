import moment from "moment"

const formatNumberic = (price) => {
	let resutl = price.toString().replace(/[^0-9]/g, '')
	return (resutl || resutl === 0) ? resutl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
}

const convertStringNumricToNumber = (strNumberic) => {
	let resutl = strNumberic.toString().replace(/[^0-9]/g, '')
	return parseFloat(resutl);
}

const combineComponentOfAddress = (province, district, ward, street) => {
	return `${street.length === 0 ? (ward.length === 0 ? (district.length === 0 ? (province.length === 0 ? `` : `${province}`)
		: `${district}, ${province}`)
		: `${ward}, ${district}, ${province}`)
		: `${street}, ${ward}, ${district}, ${province}`}`
}
/*input: String contains url youtube*/
const getVideoIdFromUrlYoutube = (urls) => {
	if (urls) {
		return urls.split("v=")[1].split("&")[0];
	}
	return '';
}

const formatDate = () => {
	return 'DD/MM/YYYY'
}

const addDate = (initDate, numDate) => {
	const copy = new Date(initDate)
	copy.setDate(copy.getDate() + numDate)
	return moment(copy).format(formatCommon.formatDate());
}

function getDifferenceInDays(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

function getDifferenceInHours(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.round(diffInMs / (1000 * 60 * 60));
}

function getDifferenceInMinutes(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.round(diffInMs / (1000 * 60));
}

function getDifferenceInSeconds(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return Math.round(diffInMs / 1000);
}

const getResultDiffDate = (date1, date2) => {
	if (getDifferenceInSeconds(date1, date2) < 60) {
		return `${getDifferenceInSeconds(date1, date2)} giây`
	}
	else if (getDifferenceInMinutes(date1, date2) < 60) {
		return `${getDifferenceInMinutes(date1, date2)} phút`
	}
	else if (getDifferenceInHours(date1, date2) < 24) {
		return `${getDifferenceInHours(date1, date2)} giờ`
	}
	else if (getDifferenceInDays(date1, date2) < 10) {
		return `${getDifferenceInDays(date1, date2)} ngày`
	}
	else {
		return moment(date1).format(formatCommon.formatDate());
	}
}

const formatWithTimeDate = (initDate) => {
	const copy = new Date(initDate)
	return moment(copy).format('HH:mm DD/MM/YYYY');
}

const getQueryStringParams = query => {
	return query ? (/^[?#]/.test(query) ? query.slice(1) : query)
		.split('&')
		.reduce((params, param) => {
			let [key, value] = param.split('=');
			params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
			return params;
		}, {}
		)
		: {}
};

function disabledDate(current) {
	const temp = new Date(current._i)
	temp.setDate(temp.getDate() - 1)
	return current && current.valueOf() < temp;
}

const convertPriceToStringVn = (price) => {
	let strPrice = '' + price.toString()
	if (strPrice.length >= 7 && strPrice.length <= 9) {
		if (strPrice.length == 7) {
			return `${strPrice[0]} triệu`
		}
		if (strPrice.length == 8) {
			return `${strPrice[0]}${strPrice[1]} triệu`
		}
		if (strPrice.length == 9) {
			return `${strPrice[0]}${strPrice[1]}${strPrice[2]} triệu`
		}
	}
}

const phoneNumberFormat = (phoneNumberString) => {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return ' ' + match[1] + ' ' + match[2] + ' ' + match[3];
	}
	return null;
}

export const formatCommon = {
	formatNumberic,
	combineComponentOfAddress,
	getVideoIdFromUrlYoutube,
	formatDate,
	addDate,
	getResultDiffDate,
	convertStringNumricToNumber,
	getVideoIdFromUrlYoutube,
	formatWithTimeDate,
	getQueryStringParams,
	disabledDate,
	convertPriceToStringVn,
	phoneNumberFormat
}