import { inputConstant } from "../../../constant/inputConstant"

const addInputBox = (id) => {
	return {
		type: inputConstant.ADD_INPUT_BOX,
		show: false,
		id: id
	}
}

// close or open modal drop down list
const controllModal = (type,showModal, id) => {
	let status = false
	if (!showModal) {
		status = true
	}
	return {
		type: type,
		show: status,
		id: id
	}
}

export const InputBoxAction = {
	addInputBox,
	controllModal
}