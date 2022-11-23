import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { message } from "../../action/message";
import { formatCommon } from "../../common/format.common";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import { CartService } from "../../service/CartService";

const HistoryPayment = () => {

	const dispatch = useDispatch()
	const location = useLocation()
	const [history, setHistory] = useState([])

	useEffect(() => {
		const obj = formatCommon.getQueryStringParams(location.search)
		console.log(obj)
		if (Object.keys(obj).length !== 0) {
			CartService.checkUpdatePayment(obj.vnp_OrderInfo, obj.vnp_PayDate, obj.vnp_ResponseCode)
				.then((data) => {
					dispatch(message.successfully(true, "Thanh toán thành công, xem lại giao dịch"))
					CartService.getHistoryPayment().then((res) => {
						setHistory(res)
						dispatch(message.information(false))
					})
				})
				.catch((data) => {
					dispatch(message.error(true, "Thanh toán thất bại, vui lòng thử lại"))
					CartService.getHistoryPayment().then((res) => {
						setHistory(res)
						dispatch(message.information(false))
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
											return <div className="row" key={el.paymentId}>
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
															{`${formatCommon.formatNumberic( el.price)}Đ`}
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

		</div>
	</Fragment >
}

export default HistoryPayment;