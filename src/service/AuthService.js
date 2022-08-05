import httpClient from "../common/httpClient"

const register = (userInfor) => {
	return httpClient({}, 'auth/register', 'POST', userInfor);
}

const login = (user) => {
	return httpClient({}, 'auth/login', 'POST', user);
}

const logout = () => {
	// remove user from local storage to log user out
	localStorage.removeItem('tokenUser');
}

const getTokenOfLocalStorage = () => {
	if (localStorage.getItem('tokenUser')) {
		let obj = JSON.parse(localStorage.getItem('tokenUser'));
		return obj.accessToken;
	}
	return false
}

export const AuthService = {
	register,
	login,
	logout,
	getTokenOfLocalStorage
}