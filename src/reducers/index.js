import { combineReducers } from 'redux'
import controllMessage from './controllMessage'
import authenticated from './authenticated'
import { authentication } from '../action/authentication'

const appReducer = combineReducers({
    controllMessage,
    authenticated
})

const rootReducer = (state, action) => {
    if (action.type === authentication.logout) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer