import { cartConstant } from "../constant/cart.constant";


const initialState = {
	idCart: 0,
	newsCarts: [],
	totalPriceOfCart: 0
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case cartConstant.GET_CART:
			return {
				...state,
				idCart: action.data.idCart,
				newsCarts: action.data.newsCarts,
				totalPriceOfCart: action.data.totalPriceOfCart
			}
		default:
			return state
	}
}

export default cartReducer;