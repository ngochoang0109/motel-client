import httpClient from "../common/httpClient"
import { storageKey } from "../constant/storageKey"

const getAllProvince = () => {
	return httpClient({
		'Content-Type': 'application/json',
		'token': storageKey.TOKEN_API_ADDRESS
	}, storageKey.API_ADDRESS, storageKey.ENDPOINT_PROVINCE_ADDRESS, 'GET', {}).then((response) => {
		let setState = []
		response.data.data.map((province) => {
			setState.push({
				id: province.ProvinceID,
				name: province.NameExtension[1]
			})
		})
		return setState
	})
}

const getAllDistricByProvinceId = (provinceId) => {
	return httpClient({
		'Content-Type': 'application/json',
		'token': storageKey.TOKEN_API_ADDRESS
	}, storageKey.API_ADDRESS, `${storageKey.ENDPOINT_DISTRICT_ADDRESS}${provinceId}`, 'GET', {}).then((response) => {
		let setState = []
		response.data.data.map((district) => {
			let name = ''
			if (district.NameExtension) {
				name = district.NameExtension[0]
			}
			if (name.length !== 0) {
				setState.push({
					id: district.DistrictID,
					name: name
				})
			}
		})
		return setState
	})
}

const getAllWardByDistrictId = (districtId) => {
	return httpClient({
		'Content-Type': 'application/json',
		'token': storageKey.TOKEN_API_ADDRESS
	}, storageKey.API_ADDRESS, `${storageKey.ENDPOINT_WARD_ADDRESS}${districtId}`, 'GET', {}).then((response) => {
		let setState = []
		response.data.data.map((ward) => {
			setState.push({
				id: ward.WardCode,
				name: ward.NameExtension[0]
			})
		})
		return setState
	})
}

const checkDistrictOfProvince = (provinceId, districtName) => {
	getAllDistricByProvinceId(provinceId).then((districts) => {
		districts.map((district) => {
			if (district.name === districtName) {
				return true
			}
		})
		return false
	})
}

const getDistrictById = async (provinceId, districtId) => {
	let strDistrict=''
	await getAllDistricByProvinceId(provinceId).then((districts) => {
		const index = districts.findIndex(el => el.id === districtId)
		if (index !== -1) {
			strDistrict= districts[index]
		}
	})
	return strDistrict
}

const getLocationFromAddress = (strQuery) => {
	return httpClient({}, storageKey.HEADER_URL_GOOGLE_API, `${strQuery}${storageKey.FOOTER_URL_GOOGLE_API}`, 'GET', {})
		.then((response) => {
			return response.data
		})
}

const getProvinceById = async (provinceId) => {
	let strProvince=''
	await getAllProvince().then((provinces)=>{
		const index=provinces.findIndex(el=>el.id===provinceId)
		if (index !== -1) {
			strProvince= provinces[index]
		}
	})
	return strProvince
}


export const AddressApiService = {
	getAllProvince,
	getAllDistricByProvinceId,
	checkDistrictOfProvince,
	getAllWardByDistrictId,
	getLocationFromAddress,
	getDistrictById,
	getProvinceById
}