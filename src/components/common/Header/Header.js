import './Header.css'
import heater from './../../../assets/heart.png'
import hotel from './../../../assets/hotel.png'
import notification from './../../../assets/notification.png'
import arrow from './../../../assets/arrow.png'
import user from './../../../assets/user.png'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from '../../../service/AuthService'
import { authentication } from '../../../action/authentication'
import { message } from '../../../action/message'
import { messageConstant } from '../../../constant/messageConstant'

const Header = () => {

	const [showControll, setShowControll] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isLogin = useSelector(state => state.authenticated.isLogin)

	const logOut = () => {
		AuthService.logout()
		dispatch(message.successfully(true, 'Đăng xuất thành công'))
		dispatch(authentication.logout())
		setShowControll('')
		navigate('/trang-chu',{replace:true})
	}

	const markPostnHandler = () => {
		if (isLogin) {
			dispatch(message.error(true, messageConstant.msgAutheticatedFalse))
		}
	}

	const notificationHandler = () => {
		if (isLogin) {
			dispatch(message.error(true, messageConstant.msgAutheticatedFalse))
		}
	}

	const checkAuthenticated = () => {
		if (!isLogin) {
			dispatch(message.error(true, messageConstant.msgAutheticatedFalse))
		} else {
			navigate('trang-chu/tao-bai-viet', { replace: true })
		}
	}

	const showPopupOver = () => {
		setShowControll('show')
	}

	const closePopupOver = () => {
		setShowControll('')
	}

	return (<div className="nav">
		<div className="nav-content">
			<header className="full-menu header nohome js__menu-bar hover-menu">
				<div className="menu-bar pushmenu pushmenu-right floating--right">
					<div className="control-menu">
						<div className="login-group">
							<div className="notification" id="notiSave" onClick={markPostnHandler}>
								<div className="all-btn">
									<a className="btn btn-se-ghost--md btn-icon--md iconNotiSave">
										<img className="icon-heart" src={heater} />
									</a>
								</div>
							</div>
						</div>
						<div className="login-group">
							<div className="notification" id="notiSave" onClick={notificationHandler}>
								<div className="all-btn">
									<a className="btn btn-se-ghost--md btn-icon--md iconNotiSave">
										<img className="icon-heart nqv" src={notification} />
										<i className="mnu-notify-icon-unread nqv">7</i>
									</a>
								</div>
							</div>
						</div>
						{isLogin ? < div id="divUserStt">
							<div className="user-avatar">
								<div className="user-non-avatar text-avatar-type1 "
									onMouseEnter={showPopupOver}>
									<img className="nqv" src={user} />
								</div>
							</div>
							<div className="menuUser">
								<ul className="dropdown-user">
									<li style={{ paddingLeft: '0px !important', paddingBottom: '10px !important' }} className="lv0">
										<div
											onMouseEnter={showPopupOver}
											className="user-name" >Tran Ngoc Hoang
											<img style={{ paddingLeft: '6px' }}
												src={arrow} width={16} /> </div>
										<div onMouseLeave={closePopupOver}>
											<ul className={`menu-user-child ${showControll}`}>
												<li className="subMenuUser">
													<a href="/quan-ly-bai-viet" className="haslink">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
															<path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<path d="M4.5 13C5.32843 13 6 12.3284 6 11.5C6 10.6716 5.32843 10 4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<path d="M4.5 20C5.32843 20 6 19.3284 6 18.5C6 17.6716 5.32843 17 4.5 17C3.67157 17 3 17.6716 3 18.5C3 19.3284 3.67157 20 4.5 20Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<path d="M8.5 4.5H20.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<path d="M8.5 11.5H20.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<path d="M8.5 18.5H20.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
														<span>Quản lý tin đăng</span>
													</a>
												</li>
												<li className="subMenuUser">
													<a href="/trang-ca-nhan/uspg-changeinfo" className="haslink">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
															<path d="M12 3.75C10.2051 3.75 8.75 5.20507 8.75 7C8.75 8.79493 10.2051 10.25 12 10.25C13.7949 10.25 15.25 8.79493 15.25 7C15.25 5.20507 13.7949 3.75 12 3.75ZM7.25 7C7.25 4.37665 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.37665 16.75 7C16.75 9.62335 14.6234 11.75 12 11.75C9.37665 11.75 7.25 9.62335 7.25 7ZM3.25 19C3.25 16.3766 5.37665 14.25 8 14.25H16C18.6234 14.25 20.75 16.3766 20.75 19V21C20.75 21.4142 20.4142 21.75 20 21.75C19.5858 21.75 19.25 21.4142 19.25 21V19C19.25 17.2051 17.7949 15.75 16 15.75H8C6.20507 15.75 4.75 17.2051 4.75 19V21C4.75 21.4142 4.41421 21.75 4 21.75C3.58579 21.75 3.25 21.4142 3.25 21V19Z" fill="#2C2C2C" />
														</svg>
														<span>Thông tin cá nhân</span></a></li>
												<div className="border-menu" />
												<li className="subMenuUser" onClick={logOut}>
													<a className="logout haslink">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
															<path d="M18 4.75L14 4.75C13.5858 4.75 13.25 4.41421 13.25 4C13.25 3.58579 13.5858 3.25 14 3.25L18 3.25C19.5188 3.25 20.75 4.48122 20.75 6V18C20.75 19.5188 19.5188 20.75 18 20.75H14C13.5858 20.75 13.25 20.4142 13.25 20C13.25 19.5858 13.5858 19.25 14 19.25H18C18.6904 19.25 19.25 18.6904 19.25 18V6C19.25 5.30964 18.6904 4.75 18 4.75ZM7.53033 7.46967C7.82322 7.76256 7.82322 8.23744 7.53033 8.53033L4.81066 11.25L15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75L4.81066 12.75L7.53033 15.4697C7.82322 15.7626 7.82322 16.2374 7.53033 16.5303C7.23744 16.8232 6.76256 16.8232 6.46967 16.5303L2.46967 12.5303C2.17678 12.2374 2.17678 11.7626 2.46967 11.4697L6.46967 7.46967C6.76256 7.17678 7.23744 7.17678 7.53033 7.46967Z" fill="#2C2C2C" />
														</svg>
														<span>Đăng xuất</span></a></li>
											</ul>
										</div>

									</li>
								</ul>
							</div>
						</div> : <div id="authen">
							<Link to={`/login`} className="btn btn-se-ghost--md" id="kct_login">Đăng nhập</Link>
							<span className="line" />
							<Link to={`register`} className="btn btn-se-ghost--md" id="kct_username">Đăng ký</Link>
							<div style={{ paddingRight: '15px' }} />
						</div>}

						<div id="Header_UserControl_divPostProduct">
							<div id="linkPostProduct" className="btn btn-se-border--md"
								onClick={checkAuthenticated} >Đăng tin</div>
						</div>
					</div>
					<div className="drop-menu">
						<div className="left-menu">
							<h2>
								<Link to='/'>
									<img src={hotel} />
								</Link>
							</h2>
						</div>
						<div className="right-menu">
							{/*Header menu*/}
							<div className="home-header-menu">
								<ul className="dropdown-no-art--sm dropdown-navigative-menu">
									<li className="lv0">
										<Link to='/nha-nguyen-can' className="haslink">
											<span className="text">Nhà nguyên căn</span>
										</Link>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<Link to='/can-ho-chung-cu' className="haslink">
											<span className="text">Căn hộ, chung cư</span>
										</Link>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<Link to='/phong-tro' className="haslink">
											<span className="text">Phòng trọ</span>
										</Link>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<Link to='/trang-chu/quan-ly-bai-viet' className="haslink">
											<span className="text">Quản lý tin đăng</span>
										</Link>
										<div className="arrrow" />
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div >
	</div >)
}


export default Header;