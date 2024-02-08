import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authentication } from '../action/authentication';
import { message } from '../action/message';
import { messageConstant } from '../constant/messageConstant';
import { AuthService } from '../service/AuthService';



const PrivateRoute = ({ children }) => {

	const dispatch = useDispatch()

	useEffect(() => {
		if (AuthService.getTokenOfLocalStorage()) {
			dispatch(authentication.loginSuccess())
		} else {
			dispatch(authentication.logout())
		}
	}, [])

	if (!AuthService.getTokenOfLocalStorage()) {
		dispatch(message.error(true, messageConstant.msgAutheticatedFalse))
		return <Fragment></Fragment>
	}

	// authorized so return child components
	return children;
}
export default PrivateRoute