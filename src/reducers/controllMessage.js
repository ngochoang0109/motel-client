import { messageConstant } from "../constant/messageConstant";

const initialState = {
	type: "",
	show: false,
	message: ""
};

const controllMessage = (state = initialState, action) => {

	switch (action.type) {
		case messageConstant.MESSAGE_SUCCESSFULY:
			return {
				...state,
				type: action.type,
				show: action.show,
				message: action.message
			}
		case messageConstant.MESSAGE_INFORMATION:
			return {
				...state,
				type: action.type,
				show: action.show,
				message: action.message
			}
		case messageConstant.MESSAGE_ERRO:
			return {
				...state,
				type: action.type,
				show: action.show,
				message: action.message
			}
		case messageConstant.BUTTON_CLOSE:
			return {
				...state,
				type: action.type,
				show: action.show,
				message: action.message
			}
		default:
			return state
	}


}

export default controllMessage;