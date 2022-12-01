import { Radio } from "antd";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { dataCommon } from "../../common/data.common";
import { formatCommon } from "../../common/format.common";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import { CartService } from "../../service/CartService";
import "./PaymentConfirm.css"

const PaymentComfirm = () => {

	const currentUser = useSelector(state => state.userReducer)
	const param = useParams()
	const nav = useNavigate()
	const [paymentDetail, setPaymentDetail] = useState({
		id: 0,
		totalAmount: 0,
		orderDetailPayloads: [{
			image: '',
			title: '',
			orginalAmount: '',
			postAmount: '',
			discounted: ''
		}]
	})
	const [methodPayment, setMethodPayment] = useState(0)
	const [vnPay, setVnPay] = useState({
		paymentId: param.id,
		bankCode: '',
		ipUser: ''
	})

	useEffect(() => {
		CartService.getPaymentById(param.id).then((data) => {
			setPaymentDetail(data)
		})
		axios({
			method: 'GET',
			url: 'https://geolocation-db.com/json/'
		}).then((res) => {
			setVnPay({
				paymentId: param.id,
				bankCode: '',
				ipUser: res.data.IPv4
			})
		})
	}, [])

	const selectedMethodPayment = (event) => {
		setMethodPayment(parseInt(event.target.value))
	}

	const paymentSubmit = () => {
		CartService.getUrlVnpay(vnPay).then((data)=>{
			window.location.assign(`https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${data}`)
		})
	}

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
			<div className="payment-container" style={{ "marginTop": "16px", "borderRadius": "4px", "boxShadow": "0px 4px 10px rgb(182 182 182 / 100%)" }}>
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
								style={{ "color": "rgb(255, 66, 78)" }}>{`${currentUser.address}`}</div>
						</div>
					</div>
					<div className="lhekIy dqTjzx hover-point" style={{ "minWidth": "5rem" }}>
						Thay đổi
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px", "boxShadow": "0px 4px 10px rgb(182 182 182 / 100%)" }}>
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
								{paymentDetail.orderDetailPayloads.map((post, index) => {
									return <div className="CZ6uu2" key={index}>
										<div className="_6kMvNg ka6CzP">
											<div className="_4MGXB1 c7N4lb">
												<img className="GCGEKm"
													src={post.image}
													width={40} height={40} />
												<span className="F8X-cZ">
													<span className="tPzkNt wXtDZ">
														{post.title}
													</span>
												</span>
											</div>
											<div className="_4MGXB1 wXtDZ">{formatCommon.formatNumberic(post.orginalAmount)} Đ</div>
											<div className="_4MGXB1 wXtDZ">{formatCommon.formatNumberic(post.discounted)}</div>
											<div className="_4MGXB1 _8fgmps wXtDZ" style={{ "color": "#05a" }}>{formatCommon.formatNumberic(post.postAmount)} Đ</div>
										</div>
									</div>
								})}

							</div>
						</div>
						<div className="BbOmi+" style={{ "marginLeft": "auto", "marginRight": "auto", "width": "100%", "backgroundColor": "#eecda3" }}>
							<div className="lYtB1r">
								<div className="_4nelpz wXtDZ">Tổng số tiền ({paymentDetail.orderDetailPayloads.length} sản phẩm):</div>
								<div className="_31ayp3">{formatCommon.formatNumberic(paymentDetail.totalAmount)} Đ</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px", "boxShadow": "0px 4px 10px rgb(182 182 182 / 100%)" }}>
				<div style={{ "display": "flex" }}>
					<h3 className="lhekIy" style={{ "marginRight": "2rem" }}>Chọn hình thức thanh toán</h3>
					<Radio.Group defaultValue="0" size="large" onChange={(event) => selectedMethodPayment(event)}>
						<Radio.Button value="1">VNPAY</Radio.Button>
					</Radio.Group>
				</div>
				{methodPayment == 1 ? <div id="topup-list-bank" className="sc-iibxZb cZTPMK">
					{dataCommon.bankList.map((el, i) => {
						return <div className="sc-gQZORr hLfgIb" key={i} style={vnPay.bankCode === el.code?{"border":"1px solid rgb(44, 44, 44)"}:null}
										onClick={() => {
											setVnPay({...vnPay, bankCode:el.code})
										}}>
							<img src={el.img}
								className="icDWSI" />
						</div>
					})}
				</div> : <Fragment></Fragment>}
			</div>
			<div className="footer-button" style={{ "width": "80%", "margin": "auto", "zIndex": "2" }}>
				<div className="wrap-button">
					<div className="flex-between">
						<button className="btn-right" onClick={()=>{
							nav(-1)
						}}>
							<div className="bKiBMa">
								<span className="dUUUwk">Thoát</span>
							</div>
						</button>
						<button className="btn-left" onClick={paymentSubmit}>
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