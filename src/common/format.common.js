import moment from "moment"

const formatNumberic = (price) => {
	let resutl = price.toString().replace(/[^0-9]/g, '')
	return (resutl || resutl === 0) ? resutl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
}

const convertStringNumricToNumber=(strNumberic)=>{
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
	copy.setDate(initDate.getDate() + numDate)
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
		return formatDate(date1);
	}
}

const formatWithTimeDate = (initDate) => {
	const copy = new Date(initDate)
	return moment(copy).format('mm:HH DD/MM/YYYY');
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
	formatWithTimeDate
}