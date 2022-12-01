import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "../../action/message";
import { formatCommon } from "../../common/format.common";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import { CartService } from "../../service/CartService";

const HistoryPayment = () => {

	const dispatch = useDispatch()
	const location = useLocation()
	const [history, setHistory] = useState([])
	const currentUser = useSelector(state => state.userReducer)
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
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		const obj = formatCommon.getQueryStringParams(location.search)
		console.log(obj)
		if (Object.keys(obj).length !== 0) {
			CartService.checkUpdatePayment(obj.vnp_OrderInfo, obj.vnp_PayDate, obj.vnp_ResponseCode)
				.then((data) => {
					dispatch(message.information(false))
					dispatch(message.successfully(true, "Thanh toán thành công, xem lại giao dịch"))
					CartService.getHistoryPayment().then((res) => {
						setHistory(res)

					})
				})
				.catch((data) => {
					dispatch(message.information(false))
					dispatch(message.error(true, "Thanh toán thất bại, vui lòng thử lại"))
					CartService.getHistoryPayment().then((res) => {
						setHistory(res)
					})
				})
		}
		CartService.getHistoryPayment().then((res) => {
			setHistory(res)
		})
	}, [])

	const renderStatus = (status) => {
		switch (status) {
			case 1:
				return 'Giao dịch thành công'
			case 2:
				return 'Giao dịch thất bại'
		}
	}

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Giao dịch hiện có</h3>
					</div>
				</div>
			</div>
			<div className='table-data' style={{
				"width": "90%", "marginLeft": "auto",
				"marginRight": "auto", "borderRadius": "4px", "boxShadow": "0px 4px 10px rgb(182 182 182 / 100%)"
			}}>
				<div className="styles__Left-sc-1mncg38-2 negmo">
					<div className="jKLiJX">
						<span className="label" style={{ "width": "200px" }}>Mã giao dịch</span>
						<span className="label" style={{ "width": "200px" }}>Thời gian</span>
						<span className="label" style={{ "width": "200px" }}>Trạng thái</span>
						<span className="label" style={{ "width": "200px" }}>Tổng tiền</span>
					</div>
					<div>
						<div className="infinite-scroll-component " style={{ height: 'auto', overflow: 'auto' }} >
							<div className="styles__StyledSeller-sc-1x870ln-0 kJwXxa">
								<div className="ihAmbT">
									<div className="eZNlgw">
										{history.map((el) => {
											return <div className="row" key={el.paymentId} onClick={() => {
												if(el.paymentId === paymentDetail.id){
													setPaymentDetail({
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
													return
												}
												CartService.getPaymentById(el.paymentId).then((data) => {
													setPaymentDetail(data)
												})
											}} 
											style={el.paymentId === paymentDetail.id ? {"backgroundColor":"#009BA1"} : null}>
												<div style={{ "width": "220px" }}>
													<span className="product__name">
														{el.paymentId}
													</span>
												</div>
												<div style={{ "width": "200px" }}>
													<span className="product__name">
														{formatCommon.formatWithTimeDate(el.payDate)}
													</span>
												</div>
												<div style={{ "width": "200px" }}>
													<span className="product__name">
														{renderStatus(el.status)}
													</span>
												</div>
												<div style={{ "width": "180px" }}>
													<div className="product-qty">
														<div className="product__real-prices">
															{`${formatCommon.formatNumberic(el.price)}Đ`}
														</div>
													</div>
												</div>
											</div>
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{paymentDetail.id !==0 ? <Fragment> <div style={{ "marginBottom": "16px" }}>
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
				</div><div style={{ "marginBottom": "16px" }}>
				</div> </Fragment> : null}

		</div>
	</Fragment >
}

export default HistoryPayment;