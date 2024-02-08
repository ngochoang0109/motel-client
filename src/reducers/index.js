import { combineReducers } from 'redux'
import controllMessage from './controllMessage'
import authenticated from './authenticated'
import { authentication } from '../action/authentication'
import controllDropDownModal from './controllDropDownModal'
import cartReducer from './cart.reducer'
import userReducer from './user.information'

const appReducer = combineReducers({
    controllMessage,
    authenticated,
    controllDropDownModal,
    cartReducer,
    userReducer
})

const rootReducer = (state, action) => {
    if (action.type === authentication.logout) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer