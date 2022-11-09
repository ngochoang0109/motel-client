import { cartConstant } from "../constant/cart.constant";


const initialState = {
	idCart: 0,
	newsCarts: [],
	totalPriceOfCart: 0
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case cartConstant.GET_CART:
			console.log(action.data)
			const arr = action.data.newsCarts.map((el) => {
				return el.checked = false
			})
			return {
				...state,
				idCart: action.data.idCart,
				newsCarts: action.data.newsCarts,
				totalPriceOfCart: arr
			}
		case cartConstant.UPDATE_CART:
			let newsUpdated = state.newsCarts
			let itemUpdated = {}
			let totalPrice = 0
			const indexItem = state.newsCarts.findIndex((el) => {
				return el.id === action.data.id
			})

			if (indexItem > -1) {
				itemUpdated = state.newsCarts[indexItem]
				itemUpdated[Object.keys(action.data)[1]] = action.data[Object.keys(action.data)[1]]
				console.log(itemUpdated)
				// update cost of news on the cart
				let amountItem = itemUpdated.numDate * itemUpdated.expenseDatasource.cost
				const discountAmount = (amountItem * itemUpdated.discountDatasource.percent) / 100
				if (discountAmount > itemUpdated.discountDatasource.price) {
					amountItem = amountItem - itemUpdated.discountDatasource.price
				} else {
					amountItem = amountItem - discountAmount
				}
				itemUpdated.totalAmount = amountItem
				newsUpdated[indexItem] = itemUpdated
			}
			newsUpdated.forEach((el) => {
				return totalPrice = totalPrice + el.totalAmount
			})
			console.log(newsUpdated)
			return {
				...state,
				newsCarts: newsUpdated,
				totalPriceOfCart: totalPrice
			}
		case cartConstant.DELETED_ITEM:
			const arrDeteled = state.newsCarts.filter((el) => {
				return el.id != action.data
			})
			return {
				...state,
				newsCarts: arrDeteled
			}
		default:
			return state
	}
}

export default cartReducer;