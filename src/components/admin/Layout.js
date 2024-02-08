import { Fragment, useEffect, useState } from "react";
import Process from "../common/Process/Process";
import Container from "./../common/Container/Container";
import { AuthService } from "../../service/AuthService"
import { useDispatch } from "react-redux";
import { authentication } from "../../action/authentication";
import { message } from "../../action/message";
import { Routes, Route, useNavigate } from 'react-router-dom';
import MenuBarUser from "./MenuBarUser";
import DiscountMng from "../../page/admin/DiscountMng/DiscountMng";
import NewsMng from "../../page/admin/NewsMng/NewsMng";
import UserMng from "../../page/admin/UserMng/UserMng";
import UserInfor from "../../page/admin/UserInfor/UserInfor";

const Layout = () => {

	const [checkRole, setCheckRole] = useState(false)
	const dispatch = useDispatch()
	const nav= useNavigate()

	useEffect(() => {
		if (AuthService.getTokenOfLocalStorage()) {
			dispatch(authentication.loginSuccess())
			const index = AuthService.getRoles().findIndex((el) => {
				return el === 'ROLE_ADMIN'
			})
			if (index != -1) {
				setCheckRole(true)
			} else {
				showMessage()
			}
		} else {
			showMessage()
			dispatch(authentication.logout())
		}
	}, [])

	const showMessage = () => {
		dispatch(message.error(true, "Không có quyền truy cập"))
		setTimeout(() => {
			nav("/")
		}, 3000);
	}

	return (
		<Fragment>
			<Process></Process>
			<Container>
				<MenuBarUser></MenuBarUser>
				{checkRole ?
					<Routes>
						<Route path="/discount-management" element={<DiscountMng></DiscountMng>}></Route>
						<Route path="/news-management" element={<NewsMng></NewsMng>}></Route>
						<Route path="/account-management" element={<UserMng></UserMng>}></Route>
						<Route path="/account-management/form" element={<UserInfor></UserInfor>}></Route>
					</Routes>
					: null}
			</Container>
		</Fragment>
	)
}

export default Layout;