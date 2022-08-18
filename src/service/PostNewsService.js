import httpClient from "../common/httpClient";
import { storageKey } from "../constant/storageKey";


const getTypeOfAcc=()=>{
	return httpClient({},storageKey.API, 'auth/get-type-of-accomodation', 'GET', {});
}

export const PostNewsService = {
	getTypeOfAcc
}