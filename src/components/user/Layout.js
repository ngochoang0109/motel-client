import { Fragment, useEffect } from "react";
import Register from "../../page/Register/Register";
import Header from "../common/Header/Header";
import { Routes, Route } from 'react-router-dom';
import Login from './../../page/Login/Login';
import Process from "../common/Process/Process";
import PrivateRoute from "../../common/PrivateRoute";
import CreatePost from "../../page/CreatePost/CreatePost";
import { useDispatch } from "react-redux";
import { AuthService } from "../../service/AuthService";
import { authentication } from "../../action/authentication";

const Layout = () => {
	const dispatch=useDispatch()
	useEffect(() => {
	  if (AuthService.getTokenOfLocalStorage()) {
		 dispatch(authentication.loginSuccess())
	  } else {
		 dispatch(authentication.logout())
	  }
	}, [])
	return (
		<Fragment>
			<Process></Process>
			<Header></Header>
			<Routes>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="trang-chu/tao-bai-viet"
					element={
						<PrivateRoute>
							<CreatePost />
						</PrivateRoute>
					}>
				</Route>

			</Routes>
		</Fragment>
	)
}

export default Layout;