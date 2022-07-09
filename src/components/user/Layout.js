import { Fragment } from "react";
import Register from "../../page/Register/Register";
import Header from "../common/Header/Header";
import { Routes, Route } from 'react-router-dom';
import Login from './../../page/Login/Login';

const Layout=()=>{

	const isLogin=false;

	return(
		<Fragment>
			<Header isLogin={isLogin}></Header>
			<Routes>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
			</Routes>
		</Fragment>
	)
}

export default Layout;