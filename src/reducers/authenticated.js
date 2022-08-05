import { authenticationConstant } from "../constant/authenticationConstant";

const initialState = {
	isLogin: false
};

const authenticated = (state = initialState, action) => {
	switch (action.type) {
		case authenticationConstant.LOGIN_SUCCESS:
			return {
				...state,
				isLogin: action.loggedIn
			}
		case authenticationConstant.LOGIN_FAILURE:
			return {
				...state,
				isLogin: action.loggedIn
			}
		case authenticationConstant.LOGOUT:
			return {
				...state,
				isLogin: action.loggedIn
			}
		default:
			return state
	}

}

export default authenticated;