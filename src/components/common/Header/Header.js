import './Header.css'
import heater from './../../../assets/heart.png'
import hotel from './../../../assets/hotel.png'
import {Link} from "react-router-dom";

const Header = ({isLogin})=>{
	console.log(isLogin)
	return (<div className="nav">
		<div className="nav-content">
			<header className="full-menu header nohome js__menu-bar hover-menu">
				<div className="menu-bar pushmenu pushmenu-right floating--right">
					<div className="control-menu">
						<div>
							<div className="login-group" aria-label="Danh sách tin đã lưu" data-microtip-position="bottom" role="tooltip">
								<div className="notification" id="notiSave">
									<div className="all-btn">
										<a className="btn btn-se-ghost--md btn-icon--md iconNotiSave">
											<img className="icon-heart" src={heater} />
										</a>
									</div>
								</div>
							</div>
						</div>
						{isLogin?"a":<div id="divUserStt">
							<Link to={`/login`} className="btn btn-se-ghost--md" rel="nofollow" id="kct_login">Đăng nhập</Link>
							<span className="line" />
							<Link to={`register`} className="btn btn-se-ghost--md" rel="nofollow" id="kct_username">Đăng ký</Link>
							<div style={{ paddingRight: '15px' }} />
						</div>}
						<div id="Header_UserControl_divPostProduct">
							<a href="#" id="linkPostProduct" className="btn btn-se-border--md">Đăng tin</a>
						</div>
					</div>
					<div className="drop-menu">
						<div className="left-menu">
							<h2>
								<a href="https://batdongsan.com.vn" rel="nofollow">
									<img src={hotel} alt="Cung cấp thông tin cho thuê bất động sản" title="Batdongsan.com.vn" />
								</a>
								<span className="visual-hidden">Batdongsan.com.vn</span>
							</h2>
						</div>
						<div className="right-menu">
							{/*Header menu*/}
							<div className="home-header-menu">
								<ul className="dropdown-no-art--sm dropdown-navigative-menu">
									<li className="lv0">
										<a href="https://batdongsan.com.vn/nha-dat-ban" className="haslink">
											<span className="text">Nhà nguyên căn</span>
										</a>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<a href="https://batdongsan.com.vn/nha-dat-ban" className="haslink">
											<span className="text">Căn hộ, chung cư</span>
										</a>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<a href="https://batdongsan.com.vn/nha-dat-ban" className="haslink">
											<span className="text">Phòng trọ</span>
										</a>
										<div className="arrrow" />
									</li>
									<li className="lv0">
										<a href="https://batdongsan.com.vn/nha-dat-ban" className="haslink">
											<span className="text">Quản lý tin đăng</span>
										</a>
										<div className="arrrow" />
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="survey__close-tab-event-trigger survey__close-tab-event-trigger--top" />
				<div className="survey__close-tab-event-trigger survey__close-tab-event-trigger--bot" />
			</header>
		</div>
	</div>)
}


export default Header;