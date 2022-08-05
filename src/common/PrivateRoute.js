import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from '../action/message';
import { messageConstant } from '../constant/messageConstant';



const PrivateRoute=({ children })=> {

    const {authUser } = useSelector(state => state.authenticated.isLogin);

    const dispatch=useDispatch()
    
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        dispatch(message.error(true, messageConstant.msgAutheticatedFalse))
        return null
    }

    // authorized so return child components
    return children;
}
export default PrivateRoute