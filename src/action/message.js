import { messageConstant } from "../constant/messageConstant"

const information = (status) => {
	return {
		type: messageConstant.MESSAGE_INFORMATION,
		show: status,
		message: ""
	}
}

const successfully = (status, message) => {
	return {
		type: messageConstant.MESSAGE_SUCCESSFULY,
		show: status,
		message: message
	}
}

const error = (status, message) => {
	return {
		type: messageConstant.MESSAGE_ERRO,
		show: status,
		message: message
	}
}

const buttonCloseMessage = () => {
	return {
		type: messageConstant.BUTTON_CLOSE,
		show: false,
		message: ""
	}
}

export const message = {
	information,
	successfully,
	error,
	buttonCloseMessage
}