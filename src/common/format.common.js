import moment from "moment"

const formatNumberic = (price) => {
	let resutl = price.toString().replace(/[^0-9]/g, '')
	return (resutl || resutl === 0) ? resutl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
}


const combineComponentOfAddress = (province, district, ward, street) => {
	return `${street.length === 0 ? (ward.length === 0 ? (district.length === 0 ? (province.length === 0 ? `` : `${province}`)
		: `${district}, ${province}`)
		: `${ward}, ${district}, ${province}`)
		: `${street}, ${ward}, ${district}, ${province}`}`
}
/*input: String contains url youtube*/
const getVideoIdFromUrlYoutube = (urls) => {
	const str = 'llll;one,two.three four';
	const result = str.split(/[;,.\s]/);
}

const formatStringToNewLineInTexarea = (arrStr) => {
	let finalStr = ''
	arrStr.map((str) => {
		return finalStr = finalStr + `${str}\r\n`
	})
	return finalStr
}

const formatDate = () => {
	return 'DD/MM/YYYY'
}

const addDate = (initDate, numDate) => {
	const copy = new Date(initDate)
	copy.setDate(initDate.getDate() + numDate)
	console.log(copy)
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
	console.log(date1, date2)
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
		return formatDate(date1);
	}
}


export const formatCommon = {
	formatNumberic,
	combineComponentOfAddress,
	getVideoIdFromUrlYoutube,
	formatStringToNewLineInTexarea,
	formatDate,
	addDate,
	getResultDiffDate
}