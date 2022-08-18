import httpClient from "../common/httpClient"
import { storageKey } from "../constant/storageKey"

const getAllProvince = () => {
	return httpClient({
		'Content-Type': 'application/json',
		'token': storageKey.TOKEN_API_ADDRESS
	}, storageKey.API_ADDRESS, storageKey.ENDPOINT_PROVINCE_ADDRESS, 'GET',{}).then((response) => {
		let setState = []
		response.data.data.map((province) => {
			setState.push({
				id: province.ProvinceID,
				name: province.NameExtension[2]
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
			let name=''
			if(district.NameExtension){
				name=district.NameExtension[0]
			}
			setState.push({
				id: district.DistrictID,
				name: name
			})
		})
		return setState
	})
}

const getAllWardByDistrictId = (districtId) => {
	return httpClient({
		'Content-Type': 'application/json',
		'token': storageKey.TOKEN_API_ADDRESS
	}, storageKey.API_ADDRESS,`${storageKey.ENDPOINT_WARD_ADDRESS}${districtId}`, 'GET', {}).then((response) => {
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

const checkDistrictOfProvince=(provinceId, districtName)=>{
	const districts=getAllDistricByProvinceId(provinceId)
	districts.map((district)=>{
		if(district.name===districtName){
			return true
		}
	})
	return false
}

export const AddressApiService = {
	getAllProvince,
	getAllDistricByProvinceId,
	checkDistrictOfProvince,
	getAllWardByDistrictId
}