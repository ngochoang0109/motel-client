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

const addDate = (strDate, numDate) => {
	console.log(strDate)
	if (strDate.length===0 || numDate === 0) {
		return ''
	}
	const [day, month,year] = strDate.split('/');
	let date = new Date(`${year}-${month}-${day}`);
	console.log(date.getDay())
	date.setDate(date.getDay()+parseInt(numDate))
	console.log(date)
	const strReturn=`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
	return strReturn;
}


export const formatCommon = {
	formatNumberic,
	combineComponentOfAddress,
	getVideoIdFromUrlYoutube,
	formatStringToNewLineInTexarea,
	formatDate,
	addDate
}