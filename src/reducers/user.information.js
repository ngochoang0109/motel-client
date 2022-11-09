import { authenticationConstant } from "../constant/Authentication.constant";

const initialState = {
	id: 0,
	username: "",
	fullname: "",
	phone: "",
	address: "",
	avartar: "",
	email:""
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case authenticationConstant.GET_CURRENT_USER:
			return {
				...state,
				id: action.data.id,
				username: action.data.username,
				fullname: action.data.fullname,
				phone: action.data.phone,
				address: action.data.address,
				avartar: action.data.avartar,
				email:action.data.email
			}
		default:
			return state
	}
}

export default userReducer;