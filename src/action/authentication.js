import {authenticationConstant} from './../constant/authenticationConstant'

const loginSuccess = () => {
	return {
		type:authenticationConstant.LOGIN_SUCCESS,
		loggedIn: true
  }
}


const loginFailure = () => {
	return {
		type:authenticationConstant.LOGIN_FAILURE,
		loggedIn: false
  }
}

const logout = () => {
	return {
		type:authenticationConstant.LOGOUT,
		loggedIn: false
  }
}


export const authentication = {
	loginSuccess,
	loginFailure,
	logout
}