import { Radio } from "antd";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { dataCommon } from "../../common/data.common";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import "./PaymentConfirm.css"

const PaymentComfirm = () => {

	const currentUser = useSelector(state => state.userReducer)
	console.log(currentUser)

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Tạo đơn thanh toán</h3>
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px" }}>
				<h3 className="lhekIy">Thông tin người tạo</h3>
				<div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between" }}>
					<div style={{ "display": "flex", "flexDirection": "column", "marginRight": "2rem" }}>
						<div style={{ "display": "flex", "marginBottom": "4px" }}>
							<div className="font-stand" style={{ "minWidth": "20rem" }}>Họ tên</div>
							<div className="font-stand" style={{ "color": "rgb(255, 66, 78)" }}>{currentUser.fullname}</div>
						</div>
						<div style={{ "display": "flex", "marginBottom": "4px" }}>
							<div className="font-stand" style={{ "minWidth": "20rem" }}>Địa chỉ email</div>
							<div className="font-stand" style={{ "color": "rgb(255, 66, 78)" }}>{currentUser.email}</div>
						</div>
						<div style={{ "display": "flex", "marginBottom": "4px" }}>
							<div className="font-stand" style={{ "minWidth": "20rem" }}>Số điện thoại</div>
							<div className="font-stand" style={{ "color": "rgb(255, 66, 78)" }}>{currentUser.phone}</div>
						</div>
						<div style={{ "display": "flex", "marginBottom": "4px", "flexWrap": "nowrap" }}>
							<div className="font-stand" style={{ "minWidth": "20rem" }}>Địa chỉ</div>
							<div className="font-stand"
								style={{ "color": "rgb(255, 66, 78)"}}>{`${currentUser.address}`}</div>
						</div>
					</div>
					<div className="lhekIy dqTjzx hover-point" style={{ "minWidth": "5rem" }}>
						Thay đổi
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px" }}>
				<h3 className="lhekIy">Thông tin đơn hàng</h3>
				<div className="w6riq3">
					<div className="-JzzK5">
						<div className="HTDM2R OiE33Y"><div className="wXtDZ">Tin đăng</div></div>
						<div className="HTDM2R">Đơn giá</div>
						<div className="HTDM2R">Giảm giá</div>
						<div className="HTDM2R eiM3n1">Thành tiền</div>
					</div>
				</div>
				<div>
					<div className="dwwHJ-">
						<div>
							<div className="nF6yNn">
								<div className="yknSi4">
									<div />
								</div>
								<div className="CZ6uu2">
									<div className="_6kMvNg ka6CzP">
										<div className="_4MGXB1 c7N4lb">
											<img className="GCGEKm"
												src="https://cf.shopee.vn/file/9458c3e630bcbf12903e8a7007126a5a_tn"
												width={40} height={40} />
											<span className="F8X-cZ">
												<span className="tPzkNt wXtDZ">
													Tấm lót R7 size 25x20cm-Loại Mousepad Speed (hình game ngẫu nhiên)
												</span>
											</span>
										</div>
										<div className="_4MGXB1 wXtDZ">10.000 Đ</div>
										<div className="_4MGXB1 wXtDZ">1</div>
										<div className="_4MGXB1 _8fgmps wXtDZ" style={{ "color": "#05a" }}>10.000 Đ</div>
									</div>
								</div>
							</div>
						</div>
						<div className="BbOmi+">
							<div className="lYtB1r">
								<div className="_4nelpz wXtDZ">Tổng số tiền (2 sản phẩm):</div>
								<div className="_31ayp3">37.500 Đ</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px" }}>
				<div style={{ "display": "flex" }}>
					<h3 className="lhekIy" style={{ "marginRight": "2rem" }}>Chọn hình thức thanh toán</h3>
					<Radio.Group defaultValue="a" size="large">
						<Radio.Button value="a">Tài khoản</Radio.Button>
						<Radio.Button value="b">VNPAY</Radio.Button>
					</Radio.Group>
				</div>
				<div id="topup-list-bank" class="sc-iibxZb cZTPMK">
					{dataCommon.bankList.map((el) => {
						return <div class="sc-gQZORr hLfgIb">
							<img src={el.img}
								class="sc-WdzTA icDWSI" />
						</div>
					})}
				</div>
			</div>
			<div className="footer-button" style={{ "width": "80%", "margin": "auto", "zIndex": "2" }}>
				<div className="wrap-button">
					<div className="flex-between">
						<button className="btn-right">
							<div className="bKiBMa">
								<span className="dUUUwk">Thoát</span>
							</div>
						</button>
						<button className="btn-left">
							<div className="bKiBMa">
								<span className="dUUUwk">Tiếp tục</span>
								<span className="jBNrga">
									<div className="cCSKON">
										<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path xmlns="http://www.w3.org/2000/svg" d="M9 20L17 12L9 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
								</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</Fragment>
}

export default PaymentComfirm;