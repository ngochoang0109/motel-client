import { inputConstant } from "../constant/inputConstant";

const initialState = [];

const controllDropDownModal = (state = initialState, action) => {

	switch (action.type) {
		case inputConstant.ADD_INPUT_BOX:
			let idAlreadyExists = state.some((value) => {
				return value.id === action.id
			});
			if (!idAlreadyExists) {
				return [...state, {
					show: action.show,
					id: action.id
				}]
			}
			return state
		case inputConstant.CHANGE_STATUS:
			console.log("CHANGE_STATUS")
			let updateState = []
			state.map((value) => {
				if (value.id === action.id) {
					value.show = action.show
				}else{
					value.show=false
				}
				updateState.push(value)
			})
			return updateState
		default:
			return state
	}
}

export default controllDropDownModal;