import { Fragment } from "react";
import Register from "../../page/Register/Register";
import Header from "../common/Header/Header";
import { Routes, Route } from 'react-router-dom';
import Login from './../../page/Login/Login';
import Process from "../common/Process/Process";
import PrivateRoute from "../../common/PrivateRoute";
import CreatePost from "../../page/CreatePost/CreatePost";
import Container from "./../common/Container/Container";

const Layout = () => {

	return (
		<Fragment>
			<Process></Process>
			<Header></Header>
			<Container>
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
			</Container>

		</Fragment>
	)
}

export default Layout;