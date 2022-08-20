const formatNumberic = (price) => {
	let resutl=price.toString().replace(/[^0-9]/g, '')
	return (resutl || resutl === 0) ? resutl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
}



export const formatCommon = {
	formatNumberic
}