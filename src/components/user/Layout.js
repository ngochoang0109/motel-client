import { Fragment } from "react";
import Register from "../../page/Register/Register";
import Header from "../common/Header/Header";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './../../page/Login/Login';
import Process from "../common/Process/Process";
import PrivateRoute from "../../common/PrivateRoute";
import CreatePost from "../../page/CreatePost/CreatePost";
import Container from "./../common/Container/Container";
import NewsManagement from "../../page/NewsManagement/NewsManagement";
import ShowNewsInfor from "../../page/ShowNewsInfor/ShowNewsInfor";
import CartPage from "../../page/CartPage/CartPage";
import PaymentComfirm from "../../page/PaymentConfirm/PaymentConfirm";

const Layout = () => {

	return (
		<Fragment>
			<Process></Process>
			<Header></Header>
			<Container>
				<Routes>
					<Route path="/register" element={<Register></Register>}></Route>
					<Route path="/login" element={<Login></Login>}></Route>
					<Route path="/" element={<Navigate to="/trang-chu" replace></Navigate>}></Route>
					<Route path="/trang-chu" element={<ShowNewsInfor></ShowNewsInfor>}></Route>
					<Route path="/nha-nguyen-can" element={<ShowNewsInfor></ShowNewsInfor>}></Route>
					<Route path="/can-ho-chung-cu" element={<ShowNewsInfor></ShowNewsInfor>}></Route>
					<Route path="/phong-tro" element={<ShowNewsInfor></ShowNewsInfor>}></Route>
					<Route path="trang-chu/tao-bai-viet"
						element={
							<PrivateRoute>
								<CreatePost />
							</PrivateRoute>
						}>
					</Route>
					<Route path="trang-chu/quan-ly-bai-viet"
						element={
							<PrivateRoute>
								<NewsManagement />
							</PrivateRoute>
						}>
					</Route>
					<Route path="trang-chu/quan-ly-bai-viet/thanh-toan/:idPost"
						element={
							<PrivateRoute>
								<PaymentComfirm />
							</PrivateRoute>
						}>
					</Route>
					<Route path="trang-chu/quan-ly-bai-viet/gio-tin"
						element={
							<PrivateRoute>
								<CartPage />
							</PrivateRoute>
						}>
					</Route>
				</Routes>
			</Container>

		</Fragment>
	)
}

export default Layout;