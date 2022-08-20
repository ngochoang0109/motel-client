import { combineReducers } from 'redux'
import controllMessage from './controllMessage'
import authenticated from './authenticated'
import { authentication } from '../action/authentication'
import controllDropDownModal from './controllDropDownModal'

const appReducer = combineReducers({
    controllMessage,
    authenticated,
    controllDropDownModal
})

const rootReducer = (state, action) => {
    if (action.type === authentication.logout) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer