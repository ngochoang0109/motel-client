import headerCommon from "../common/header.common";
import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";

const getCurrentUser=()=>{
	const headers = headerCommon();
	return httpClient(headers, storageKey.API, 'user/infor', 'GET', {}).then((response) => {
		return response.data;
	})
}

export const userService={
	getCurrentUser
}