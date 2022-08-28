import { inputConstant } from "../../../constant/InputConstant"

const addInputBox = (id) => {
	return {
		type: inputConstant.ADD_INPUT_BOX,
		show: false,
		id: id
	}
}

// close or open modal drop down list
const controllInput = (type,showModal, id) => {
	return {
		type: type,
		show: showModal = !showModal,
		id: id
	}
}

export const InputBoxAction = {
	addInputBox,
	controllInput
}