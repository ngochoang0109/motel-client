import Checkbox from "antd/lib/checkbox/Checkbox";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import { formatCommon } from '../../common/format.common'
import { message } from '../../action/message'
import './CartPage.css'
import moment from "moment";
import { DatePicker, InputNumber } from "antd";
import { cartConstant } from "../../constant/cart.constant";
import { NewsManagementService } from "../../service/NewsManagementService";
import Modal from "antd/lib/modal/Modal";
import { CartService } from "../../service/CartService";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

	const cartOfUser = useSelector(state => state.cartReducer)
	const currentUser = useSelector(state => state.userReducer)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [id, setId] = useState(0)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const nav = useNavigate()

	/*1: deleted, 2: confirm*/
	const [modalMode, setModalMode] = useState(0)

	useEffect(() => {
		NewsManagementService.getCartOfUser()
			.then((cart) => {
				dispatch({
					type: cartConstant.GET_CART,
					data: cart
				})
			})
	}, [])

	const numDateOnBlur = (event, id, checked, startedDate) => {
		dispatch(message.information(true))
		const numDate = parseInt(event.target.value)
		if (numDate < 1) {
			dispatch(message.information(false))
			dispatch(message.error(true, 'Số ngày rao tin không hợp lệ'))
		} else {
			const updateItemOfCart = {
				checked: checked,
				numDate: numDate,
				startedDate: startedDate
			}
			CartService.updateItemOfCart(updateItemOfCart, cartOfUser.idCart, id).then((data) => {
				dispatch({
					type: cartConstant.GET_CART,
					data: data
				})
				dispatch(message.information(false))
			})
		}
	}

	const startedDateOnChange = (momentObj, id, checked, numDate) => {
		dispatch(message.information(true))
		const updateItemOfCart = {
			checked: checked,
			numDate: numDate,
			startedDate: moment(momentObj._d).utc(true).format()
		}
		CartService.updateItemOfCart(updateItemOfCart, cartOfUser.idCart, id).then((data) => {
			dispatch({
				type: cartConstant.GET_CART,
				data: data
			})
			dispatch(message.information(false))
		})
	}

	const renderPriceDiscount = (totalAmount, discount, expenses, numDate) => {
		const amountItem = numDate * expenses.cost
		const discountAmount = (amountItem * discount.percent) / 100
		let result = 0
		if (discountAmount > discount.price) {
			result = discount.price
		} else {
			result = discountAmount
		}
		return formatCommon.formatNumberic(result)
	}

	const checkedAllCheckBox = (event) => {
		dispatch(message.information(true))
		const checked = event.target.checked
		let listItemUpdate = []
		for (let i = 0; i < cartOfUser.newsCarts.length; i++) {
			const updateItemOfCart = {
				id: cartOfUser.newsCarts[i].id,
				checked: checked,
				numDate: cartOfUser.newsCarts[i].numDate,
				startedDate: cartOfUser.newsCarts[i].startedDate
			}
			listItemUpdate.push(updateItemOfCart)
		}
		CartService.updateItemsOfCart(listItemUpdate, cartOfUser.idCart)
			.then((data) => {
				dispatch({
					type: cartConstant.GET_CART,
					data: data
				})
				dispatch(message.information(false))
			})
	}

	const getTotalChecked = () => {
		let count = 0
		for (let i = 0; i < cartOfUser.newsCarts.length; i++) {
			if (cartOfUser.newsCarts[i].checked) {
				count = count + 1
			}
		}
		return count
	}

	const onChangeCheckedItem = (event, id, numDate, startedDate) => {
		// call api update cart
		dispatch(message.information(true))
		const updateItemOfCart = {
			checked: event.target.checked,
			numDate: numDate,
			startedDate: startedDate
		}
		CartService.updateItemOfCart(updateItemOfCart, cartOfUser.idCart, id).then((data) => {
			dispatch({
				type: cartConstant.GET_CART,
				data: data
			})
			dispatch(message.information(false))
		})
	}

	const caculatedAmount = () => {
		let amount = 0
		for (let i = 0; i < cartOfUser.newsCarts.length; i++) {
			if (cartOfUser.newsCarts[i].checked) {
				amount = amount + cartOfUser.newsCarts[i].totalAmount
			}
		}
		return amount
	}

	const deletedItem = (id) => {
		setId(id)
		setModalMode(1)
		showModal()
	}

	const goToPaymentPage = () => {
		if (getTotalChecked() === 0) {
			dispatch(message.error(true, 'Bạn vẫn chưa chọn tin để rao'))
		} else {
			setModalMode(2)
			showModal()
		}
	}

	const showModal = () => {
		setOpen(true)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	const createPayment = () => {
		setOpen(false)
		dispatch(message.information(true))
		CartService.createPayment(cartOfUser.idCart).then((idPayment)=>{
			console.log(idPayment)
			dispatch(message.information(false))
			dispatch(message.successfully(true, "Tạo đơn thanh toán thành công"))
			nav(`/trang-chu/quan-ly-bai-viet/gio-tin/thanh-toan/${idPayment}`)
		}).catch(()=>{
			dispatch(message.information(false))
			dispatch(message.error(true, "Tạo đơn thanh toán thất bại"))
		})
	}

	const confirmDeleted = () => {
		setConfirmLoading(true)
		CartService.deletedPostOfCart(cartOfUser.idCart, id).then((data) => {
			setConfirmLoading(false)
			setOpen(false)
			dispatch({
				type: cartConstant.GET_CART,
				data: data
			})
		}).catch(() => {
			setConfirmLoading(false)
		})
	}

	const controllerModalRender = () => {
		switch (modalMode) {
			case 1:
				return <Modal title="Xóa tin"
					visible={open}
					onOk={confirmDeleted}
					onCancel={handleCancel}
					bodyStyle={{ height: "110px" }}
					centered={true}
					confirmLoading={confirmLoading}
				>
					<div className='confirm-message-modal'>
						<p>Bạn có muốn xóa tin khỏi giỏ tin</p>
					</div>
				</Modal>
			case 2:
				return <Modal title="Rao tin"
					visible={open}
					onOk={createPayment}
					onCancel={handleCancel}
					bodyStyle={{ height: "110px" }}
					centered={true}
				>
					<div className='confirm-message-modal'>
						<p>Bạn có muốn rao tin</p>
					</div>
				</Modal>
		}
	}

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Danh sách giỏ tin</h3>
					</div>
				</div>
			</div>
			<div className='table-data' style={{
				"width": "90%", "marginLeft": "auto",
				"marginRight": "auto", "borderRadius": "4px", "boxShadow": "0px 4px 10px rgb(182 182 182 / 100%)"
			}}>
				{controllerModalRender()}
				<div className="styles__Left-sc-1mncg38-2 negmo">
					<div className="jKLiJX">
						<label className="hNjxWW">
							<Checkbox
								onChange={(event) => checkedAllCheckBox(event)}
								checked={getTotalChecked() === cartOfUser.newsCarts.length ? true : false}></Checkbox>
							<span className="label"
								style={{ "width": "280px" }}>Tất cả ({cartOfUser.newsCarts.length} bài viết)
							</span>
						</label>
						<span className="label" style={{ "width": "120px" }}>Loại ưu tiên - Đơn giá VNĐ/ Ngày</span>
						<span className="label" style={{ "width": "100px" }}>Số ngày đăng</span>
						<span className="label" style={{ "width": "140px" }}>Ngày bắt đầu</span>
						<span className="label" style={{ "width": "100px" }}>Mã giảm giá</span>
						<span className="label" style={{ "width": "80px" }}>Thành tiền</span>
						<span className="remove-all label">
							<img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg" />
						</span>
					</div>
					<div>
						<div className="infinite-scroll-component " style={{ height: 'auto', overflow: 'auto' }} >
							<div className="styles__StyledSeller-sc-1x870ln-0 kJwXxa">
								<div className="sellers__group">
									<div className="sellers__sub-title">
										<div className="row">
											<div className="col-1" style={{ "width": "400px", "padding": "0px 15px" }}>
												<img src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
													alt="seller-link" className="sellers__icon-home" />
												<a href="https://tiki.vn/cua-hang/vnb-store"
													className="sellers__name">{currentUser.fullname}
													<img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/Path.svg"
														className="sellers__icon-arrow" />
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="ihAmbT">
									<div className="eZNlgw">
										{cartOfUser.newsCarts.map((el) => {
											return <div className="row" key={el.id}>
												<div className="col-1" style={{ "width": "320px", "textAlign": "left" }}>
													<div className="product__images">
														<div className="product__checkbox">
															<label className="hNjxWW">
																<Checkbox style={{ "margin": "0px 12px 0px 0px" }}
																	name='checked'
																	checked={el.checked}
																	onChange={(event, id, numDate, startedDate) => onChangeCheckedItem(event, el.id, el.numDate, el.startedDate)}></Checkbox>
															</label>
														</div>
														<a className="product__img" style={{ "marginRight": "15px" }}>
															<picture className="webpimg-container">
																<img src={el.avatar} />
															</picture>
														</a>
														<div className="product__content">
															<a className="product__name">
																{el.title}
															</a>
														</div>
													</div>
												</div>
												<div style={{ "width": "120px" }}>
													<span className="product__name">
														{el.expenseDatasource.type} - {formatCommon.formatNumberic(el.expenseDatasource.cost)}Đ
													</span>
												</div>
												<div style={{ "width": "140px" }}>
													<div className="product-qty">
														<div className="product__name">
															<div className="input-selection">
																<div className="input-selection-level-one" style={{ width: '100%' }}>
																	<InputNumber
																		placeholder="Nhập số"
																		value={el.numDate}
																		min={1}
																		max={120}
																		controls={false}
																		onBlur={(event, id, checked, startedDate) => numDateOnBlur(event, el.id, el.checked, el.startedDate)}
																		name='numDate'>
																	</InputNumber>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div style={{ "width": "140px" }}>
													<div className="product-qty">
														<div className="product__name">
															<div className="input-selection">
																<div className="input-selection-level-one" style={{ width: '100%' }}>
																	<DatePicker
																		format={formatCommon.formatDate()}
																		value={moment(el.startedDate)}
																		disabledDate={formatCommon.disabledDate}
																		onChange={(momentObj, id, checked, numDate) => startedDateOnChange(momentObj, el.id, el.checked, el.numDate)}
																		name='startedDate'
																	></DatePicker>
																</div>
															</div>
															<div className="mt-8 note">
																{`Ngày kết thúc ${formatCommon.addDate(el.startedDate, el.numDate)}`}
															</div>
														</div>
													</div>
												</div>
												<div style={{ "width": "120px" }}>
													<div className="product-qty">
														<div className="product__name_1 dqTjzx" onClick={el.discountDatasource == null ? () => { } : () => {
															dispatch(message.successfully(true,
																`Được giảm: ${renderPriceDiscount(el.totalAmount, el.discountDatasource, el.expenseDatasource, el.numDate)}Đ`))
														}}>
															{el.discountDatasource == null ? "Không có mã được áp dụng" : el.discountDatasource.code}
														</div>
													</div>
												</div>
												<div style={{ "width": "100px" }}>
													<div className="product-qty">
														<div className="product__real-prices">
															{`${formatCommon.formatNumberic(el.totalAmount)}Đ`}
														</div>
													</div>
												</div>
												<div>
													<span className="product__delete" onClick={(id) => deletedItem(el.id)}>
														<img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg" />
													</span>
												</div>
											</div>
										})}
										<div className="BbOmi+" style={{ "marginLeft": "auto", "marginRight": "auto", "width": "100%", "backgroundColor": "#eecda3" }}>
											<div className="lYtB1r">
												<div className="_4nelpz wXtDZ">Tổng số tiền ({getTotalChecked()} tin rao):</div>
												<div className="_31ayp3">{formatCommon.formatNumberic(caculatedAmount())}</div>
											</div>
										</div>
										<div className="flex-between" style={{
											"display": "flex",
											"justifyContent": "space-between",
											"marginTop": "16px"
										}}>
											<button className="btn-right">
												<div className="bKiBMa">
													<span className="dUUUwk">Thoát</span>
												</div>
											</button>
											<button className="btn-left" onClick={() => goToPaymentPage()}>
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
						</div>
					</div>

				</div>
			</div>

		</div>
	</Fragment>
}

export default CartPage;