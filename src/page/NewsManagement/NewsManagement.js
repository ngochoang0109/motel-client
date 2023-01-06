import { Button, DatePicker, Pagination } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from '../../action/message';
import { dataCommon } from '../../common/data.common';
import InputBox from '../../components/common/InputBox/InputBox';
import MenuBarUser from '../../components/user/MenuBarUser/MenuBarUser';
import NewsCard from '../../components/user/NewsCard/NewsCard';
import { inputConstant } from '../../constant/inputConstant';
import { modeNews } from '../../constant/mode.news';
import { NewsManagementService } from '../../service/NewsManagementService';
import seo from './../../assets/seo.png'
import 'antd/dist/antd.min.css';
import './NewsManagement.css'
import { PostNewsService } from '../../service/PostNewsService';
import { AddressApiService } from '../../service/AddressApiService';
import Modal from 'antd/lib/modal/Modal';
import { cartConstant } from '../../constant/cart.constant';
import { useNavigate } from 'react-router-dom';
import { formatCommon } from '../../common/format.common';
import moment from 'moment';

const NewsManagement = () => {

	const nav = useNavigate()
	const [messageReturn, setMessageReturn] = useState('')
	const [reason, setReason] = useState('')
	const [chooseId, setChooseId] = useState(0)
	const [isLoading, setIdLoading] = useState(false)
	const [modeModal, setModeModal] = useState(0)
	const [getNewsCard, setNewsCard] = useState({ content: [] })
	const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()
	const [isActive, setActive] = useState({
		status: false,
		mode: dataCommon.menuBarStatusManagement[0].mode,
		pageNo: 0,
		totalPages: 0
	})
	const [btnDurationTime, setBtnDurationTime] = useState(false)
	const [getProvince, setProvince] = useState([])
	const [getDistrict, setDistrict] = useState([])
	const [typeOfAcc, setTypeOfAcc] = useState([])
	const [typeOfNews, setTypeOfNews] = useState([])
	const [filterParam, setFilterParam] = useState({
		textSearch: '',
		startedDate: moment(new Date('2018-12-17T00:00:00')).utc(true).format(),
		closedDate: moment(new Date('2024-12-17T00:00:00')).utc(true).format(),
		typeOfAcc: 0,
		typeOfNews: 0,
		province: '',
		district: ''
	})
	useEffect(() => {
		dispatch(message.information(true))
		NewsManagementService.getAllPostOfUser(0, 5, 'startedDate', 2, filterParam).then((page) => {
			setNewsCard(page)
			setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10 })
			dispatch(message.information(false))
		})
		PostNewsService.getTypeOfAcc().then((response) => {
			setTypeOfAcc(response.data)
			dispatch(message.information(false))
		})
		PostNewsService.getExpenses().then((data) => {
			const convert = data.map((el) => {
				return { ...el, name: el.type }
			})
			setTypeOfNews(convert)
		})
		AddressApiService.getAllProvince().then((data) => {
			setProvince(data.reverse())
			dispatch(message.information(false))
		})
	}, [])

	const addToCart = (id) => {
		NewsManagementService.addNewsToCart(id).then((data) => {
			dispatch(message.error(true, 'Đã thêm bài viết vào giỏ'))
			dispatch({
				type: cartConstant.GET_CART,
				data: data
			})
		}).catch((data) => {
			dispatch(message.error(true, 'Đã có trong giỏ tin'))
		})
	}

	const showNewsCard = () => {
		if (getNewsCard) {
			return getNewsCard.content.map((el) => {
				return <NewsCard key={el.id} title={el.title}
					price={el.price}
					area={el.area}
					province={el.province}
					district={el.district}
					description={el.description}
					fullName={el.fullName}
					phone={el.phone}
					startedDate={el.startedDate}
					closedDate={el.closedDate}
					avatar={el.avatar}
					mode={el.mode}
					totalAmount={el.totalAmount}
					id={el.id}
					addToCart={addToCart}
					viewReasonReject={viewReasonReject}
					onHindden={onHindden}
					updateReShowToPost={updateReShowToPost}
					extendedTime={extendedTime}
					deletedPost={deletedPost}
					editPost={editPost}></NewsCard>
			})
		}
	}

	const editPost = (id) => {
		setChooseId(id)
		setModeModal(10)
		setVisible(true)
	}

	const deletedPost = (id) => {
		setChooseId(id)
		setModeModal(9)
		setVisible(true)
	}

	const extendedTime = (id) => {
		setChooseId(id)
		// extended time to post
		setModeModal(8)
		setVisible(true)
	}

	const updateReShowToPost = (id) => {
		setChooseId(id)
		// re-show post
		setModeModal(7)
		setVisible(true)
	}

	const onHindden = (id) => {
		setChooseId(id)
		// hidden post
		setModeModal(6)
		setVisible(true)
	}

	const viewReasonReject = (id) => {
		// show modal reject
		NewsManagementService.showReason(id).then(data => setReason(data))
		setModeModal(5)
		setVisible(true)
	}

	const selectedItemMenuBar = async (event, i, el) => {
		setActive({ id: i, status: !isActive.status, mode: el.mode, pageNo: 1 })
		console.log(el.mode)
		getNewsDataList(el.mode, 1, filterParam)
	}

	const showMenuBarStatus = () => {
		return dataCommon.menuBarStatusManagement.map((el, i) => {
			return <button className={`col-table-data ${el.mode === isActive.mode ? el.className : ''}`}
				onClick={(event) => selectedItemMenuBar(event, i, el)}
				key={i}>
				<div className="wrapper-text-col">
					<span>{el.title}</span>
				</div>
			</button >
		})
	}

	const handleChoosePage = (page) => {
		setActive({ ...isActive, pageNo: page })
		getNewsDataList(isActive.mode, page, filterParam)
	}

	const getNewsDataList = async (mode, page, fillter) => {
		dispatch(message.information(true))
		console.log(filterParam)
		switch (mode) {
			case modeNews.NEWS_ALL:
				await NewsManagementService.getAllPostOfUser(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					setNewsCard(page)
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_ALL })
					dispatch(message.information(false))
				})
				return
			case modeNews.WAITING_APROVED:
				await NewsManagementService.getWaittingApproved(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_APROVED })
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_REJECT:
				await NewsManagementService.getNewsRejected(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_REJECT })
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_WAIT_PAYMENT:
				await NewsManagementService.getDontPayment(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_WAIT_PAYMENT })
					setNewsCard(page)
				})
				return
			case modeNews.WAITING_SHOW:
				await NewsManagementService.getWaittingShowOfUser(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_SHOW })
					setNewsCard(page)
				})
				return
			case modeNews.SHOWING:
				await NewsManagementService.getNewsShowOfUser(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.SHOWING })
					setNewsCard(page)
					dispatch(message.information(false))
				})
				return
			case modeNews.EXPRIED:
				await NewsManagementService.getNewsExpriedOfUser(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.EXPRIED })
					setNewsCard(page)
				})
				return
			case modeNews.HINDDEN:
				await NewsManagementService.getNewsHiddenOfUser(page - 1, 5, 'startedDate', 2, fillter).then((page) => {
					setNewsCard(page)
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.HINDDEN })
					dispatch(message.information(false))
				})
				return
		}
	}

	const chooseDurationTime = () => {
		setBtnDurationTime(!btnDurationTime)
	}

	console.log(isActive)
	console.log(filterParam)

	const renderModalContent = () => {
		switch (modeModal) {
			case 1:
				return <Modal title='Chọn danh mục'
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "216px" }}
					style={{ top: -152 }}><div className="styles_modal-body__1C3xw">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{typeOfAcc.map((el) => {
										return <li key={el.id}
											onClick={() => {
												setFilterParam({ ...filterParam, typeOfAcc: el.id })
												getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfAcc: el.id })
												setVisible(false)
											}}
											className="Styles_option__1f2OH" >
											<div className="Styles_tagLink__w5_mC">
												<span>{el.name}</span>
												<img src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
													alt="next" height="14px" width="5px" style={{ marginLeft: 'auto' }} />
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
						<div className="re__listing-filter-popup-footer">
							<div className="re__btn re__btn-se-ghost--sm re__btn-icon-left--sm js__filter-more-reset-button">
								<i className="re__icon-refresh" />
								<span></span>
							</div>
							<div className="re__btn re__btn-pr-solid--sm 
									re__btn-icon-left--sm 
									js__lfilter-more-search-button"
								onClick={() => {
									setFilterParam({ ...filterParam, typeOfAcc: 0 })
									getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfAcc: 0 })
									setVisible(false)
								}}>
								<i className="re__icon-search--sm" />
								<span>Đặt lại</span>
							</div>
						</div>
					</div>
				</Modal>
			case 2:
				return <Modal title='Chọn danh mục'
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "300px" }}
					style={{ top: -102 }}><div className="styles_modal-body__1C3xw">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{typeOfNews.map((el) => {
										return <li key={el.id}
											onClick={() => {
												setFilterParam({ ...filterParam, typeOfNews: el.id })
												getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfNews: el.id })
												setVisible(false)
											}}
											className="Styles_option__1f2OH" >
											<div className="Styles_tagLink__w5_mC">
												<span>{el.name}</span>
												<img src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
													alt="next" height="14px" width="5px" style={{ marginLeft: 'auto' }} />
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
						<div className="re__listing-filter-popup-footer">
							<div className="re__btn re__btn-se-ghost--sm re__btn-icon-left--sm js__filter-more-reset-button">
								<i className="re__icon-refresh" />
								<span></span>
							</div>
							<div className="re__btn re__btn-pr-solid--sm 
									re__btn-icon-left--sm 
									js__lfilter-more-search-button"
								onClick={() => {
									setFilterParam({ ...filterParam, typeOfNews: 0 })
									getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfNews: 0 })
									setVisible(false)
								}}>
								<i className="re__icon-search--sm" />
								<span>Đặt lại</span>
							</div>
						</div>
					</div>
				</Modal>
			case 3:
				return <Modal title="Chọn khu vực"
					visible={visible}
					centered footer={[
						<Button onClick={() => {
							setFilterParam({ ...filterParam, province: '', district: '' })
							setDistrict([])
							getNewsDataList(isActive.mode, 1, { ...filterParam, province: '', district: '' })
							setVisible(false)
						}}>
							Đặt lại
						</Button>]}
					onCancel={handleCancel}
					bodyStyle={{ height: "400px" }}
					style={{ top: -46 }}>
					<div className="styles_modal-body__1C3xw">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{getProvince.map((el) => {
										return <li itemProp="itemListElement"
											className="Styles_option__1f2OH" key={el.id}
											onClick={() => {
												setFilterParam({ ...filterParam, province: el.name })
												AddressApiService.getAllDistricByProvinceId(el.id).then((data) => {
													setDistrict(data)
												})
												getNewsDataList(isActive.mode, 1, { ...filterParam, province: el.name })
												setVisible(false)
											}}
										>
											<div className="Styles_tagLink__w5_mC">
												<span>{el.name}</span>
												<img src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
													alt="next" height="14px" width="5px" style={{ marginLeft: 'auto' }} />
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					</div>
				</Modal>
			case 4:
				return <Modal title='Chọn danh mục'
					visible={visible}
					centered footer={[
						<Button onClick={() => {
							setFilterParam({ ...filterParam, district: '' })
							setDistrict([])
							getNewsDataList(isActive.mode, 1, { ...filterParam, district: '' })
							setVisible(false)
						}}>
							Đặt lại
						</Button>]}
					onCancel={handleCancel}
					bodyStyle={{ height: "400px" }}
					style={{ top: -46 }}><div className="styles_modal-body__1C3xw">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{getDistrict.reverse().map((el) => {
										return <li itemProp="itemListElement"
											className="Styles_option__1f2OH" key={el.id}
											onClick={() => {
												setFilterParam({ ...filterParam, district: el.name })
												getNewsDataList(isActive.mode, 1, { ...filterParam, district: el.name })
												setVisible(false)
											}}
										>
											<div className="Styles_tagLink__w5_mC">
												<span>{el.name}</span>
												<img src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
													alt="next" height="14px" width="5px" style={{ marginLeft: 'auto' }} />
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					</div>
				</Modal>
			case 5:
				return <Modal title='Lý do'
					visible={visible}
					footer={null}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> {reason ? reason : 'Chưa có nội dung'} </p>
					</div>
				</Modal>
			case 6:
				return <Modal title='Ẩn bài viết'
					visible={visible}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					confirmLoading={isLoading}
					onOk={() => {
						NewsManagementService.updateHiddenToPost(chooseId).then(() => {
							getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfNews: 0 }).then(() => {
								setIdLoading(false)
								setMessageReturn('success')
								setVisible(false)
							})
						}).catch(() => {
							setIdLoading(false)
							setMessageReturn('error')
							setVisible(false)
						})
					}}
					afterClose={() => {
						console.log(messageReturn)
						if (messageReturn === '') {
							return
						} else if (messageReturn === 'success') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Ẩn bài viết thành công!!!"))
						} else if (messageReturn === 'error') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Ẩn bài viết thất bại, vui lòng thử lại!!!"))
						}
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> Bạn có muốn <span className='exception-text'>ẨN BÀI VIẾT</span> trên hệ thống </p>
					</div>
				</Modal>
			case 7:
				return <Modal title='Hiển thị bài viết'
					visible={visible}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					confirmLoading={isLoading}
					onOk={() => {
						NewsManagementService.updateHiddenToPost(chooseId).then(() => {
							getNewsDataList(isActive.mode, 1, { ...filterParam, typeOfNews: 0 }).then(() => {
								setIdLoading(false)
								setMessageReturn('success')
								setVisible(false)
							})
						}).catch(() => {
							setIdLoading(false)
							setMessageReturn('error')
							setVisible(false)
						})
					}}
					afterClose={() => {
						if (messageReturn === '') {
							return
						} else if (messageReturn === 'success') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Hiển thị lại bài viết thành công!!!"))
						} else if (messageReturn === 'error') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Hiển thị lại bài viết thất bại, vui lòng thử lại!!!"))
						}
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> Bạn có muốn <span className='exception-text'>HIỂN THỊ LẠI BÀI VIẾT</span> trên hệ thống </p>
					</div>
				</Modal>
			case 8:
				return <Modal title='Gia hạn bài viết'
					visible={visible}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					confirmLoading={isLoading}
					onOk={() => {
						setIdLoading(false)
						setMessageReturn('success')
						setVisible(false)
					}}
					afterClose={() => {
						if (messageReturn === '') {
							return
						}
						nav('gia-han-bai-viet/' + chooseId + '?mode=ExtendedTime')
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> Bạn có muốn <span className='exception-text'>GIA HẠN BÀI VIẾT</span> trên hệ thống </p>
					</div>
				</Modal>
			case 9:
				return <Modal title='Xóa bài viết'
					visible={visible}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					confirmLoading={isLoading}
					onOk={() => {
						NewsManagementService.deletedPost(chooseId).then(() => {
							getNewsDataList(isActive.mode, isActive.pageNo, filterParam).then(() => {
								setIdLoading(false)
								setMessageReturn('success')
								setVisible(false)
							})
						}).catch(() => {
							setIdLoading(false)
							setMessageReturn('error')
							setVisible(false)
						})
					}}
					afterClose={() => {
						if (messageReturn === '') {
							return
						} else if (messageReturn === 'success') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Xóa bài viết thành công!!!"))
						} else if (messageReturn === 'error') {
							setMessageReturn('')
							dispatch(message.successfully(true, "Xóa bài viết thất bại, vui lòng thử lại!!!"))
						}
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> Bạn có muốn <span className='exception-text'>XÓA BÀI VIẾT</span> trên hệ thống </p>
					</div>
				</Modal>
			case 10:
				return <Modal title='Chỉnh sửa bài viết'
					visible={visible}
					bodyStyle={{ height: "100px" }}
					closable={true}
					onCancel={() => {
						setMessageReturn('')
						setVisible(false)
					}}
					confirmLoading={isLoading}
					onOk={() => {
						setIdLoading(false)
						setMessageReturn('success')
						setVisible(false)
					}}
					afterClose={() => {
						if (messageReturn === '') {
							return
						}
						nav('chinh-sua-bai-viet/' + chooseId + '?mode=EditPost')
					}}
					style={{ top: 240 }}>
					<div className="styles_modal-body__1C3xw">
						<p className='reason'> Bạn có muốn <span className='exception-text'>CHỈNH SỬA BÀI VIẾT</span> trên hệ thống </p>
					</div>
				</Modal>
		}
	}


	const handleCancel = e => {
		setVisible(false)
	}

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			{renderModalContent()}
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Danh sách tin</h3>
					</div>
				</div>
				<div className="user-actions" style={{ marginBottom: '10px' }}>
					<div className="actions">
						<div className="mr-8">
							<div className="input-selection">
								<div className="input-selection-level-one" style={{ width: '100%' }}>
									<InputBox mode={inputConstant.INPUT_TEXT_BOX}
										placeholder={`Tìm theo mã tin, tiêu đề`}
										name='textSearch'
										icon={seo}
										value={filterParam.textSearch}
										onChange={(value) => {
											if (value.value === '') {
												setFilterParam({ ...filterParam, textSearch: '' })
												getNewsDataList(isActive.mode, 1, { ...filterParam, textSearch: '' })
												return
											}
											setFilterParam({ ...filterParam, textSearch: value.value })
										}}
										clickIcon={() => {
											getNewsDataList(isActive.mode, 1, filterParam)
										}}
									></InputBox>
								</div>
							</div>
						</div>
						<button className='btn-export mr-8' onClick={chooseDurationTime}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg width="48px" height="48px" viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											aria-labelledby="calendarEventIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="calendarEventIconTitle">Calendar event</title>
											<path d="M3 5H21V21H3V5Z" />
											<path d="M21 9H3" />
											<path d="M7 5V3" />
											<path d="M17 5V3" />
											<rect x={15} y={15} width={2} height={2} />
										</svg>
									</div>
								</span>
								<span className="text">Khoảng thời gian</span>
							</div>
						</button>
						<button className='btn-export mr-8' onClick={() => {
							setVisible(true)
							setModeModal(1)
						}}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="homeAltIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="homeAltIconTitle">Home</title>
											<path d="M3 10.182V22h18V10.182L12 2z" />
											<rect width={6} height={8} x={9} y={14} />
										</svg>
									</div>
								</span>
								<span className="text">Loại bất động sản</span>
							</div>
						</button>
						<button className='btn-export mr-8' onClick={() => {
							setVisible(true)
							setModeModal(2)
						}}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="chartIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="chartIconTitle">Chart</title>
											<polygon points="2 12 2 21 6 21 6 12" />
											<polygon points="18 7 18 21 22 21 22 7" />
											<polygon points="10 3 10 21 14 21 14 3" />
										</svg>
									</div>
								</span>
								<span className="text">Loại tin đăng</span>
							</div>
						</button>
						<button className='btn-export mr-8' onClick={() => {
							setVisible(true)
							setModeModal(3)
						}}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="locationIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="locationIconTitle">Location</title>
											<path d="M12,21 C16,16.8 18,12.8 18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,12.8 8,16.8 12,21 Z" />
											<circle cx={12} cy={9} r={1} />
										</svg>
									</div>
								</span>
								<span className="text">Tỉnh/ Thành phố</span>
							</div>
						</button>
						<button className='btn-export mr-8' onClick={() => {
							setVisible(true)
							setModeModal(4)
						}}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="locationIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="locationIconTitle">Location</title>
											<path d="M12,21 C16,16.8 18,12.8 18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,12.8 8,16.8 12,21 Z" />
											<circle cx={12} cy={9} r={1} />
										</svg>
									</div>
								</span>
								<span className="text">Quận/ Huyện</span>
							</div>
						</button>
					</div>
					{btnDurationTime ? <div className='wrapper-data-filter'>
						<div className="wrapper-input-level-1">
							<div className="wrapper-input-level-2">
								<div className="label-input">
									Ngày bắt đầu
									<div className="sc-kstrdz kihuz">&nbsp;</div>
								</div>
								<div className="input-selection">
									<div className="input-selection-level-one" style={{ width: '100%' }}>
										<DatePicker format={formatCommon.formatDate()}
											onChange={(momentObj) => {
												if (momentObj == null) {
													setFilterParam({
														...filterParam,
														startedDate: moment(new Date('2018-12-17T03:24:00')).utc(true).format()
													})
													getNewsDataList(isActive.mode, 1, { ...filterParam, startedDate: moment(new Date('2018-12-17T03:24:00')).utc(true).format() })
												} else {
													setFilterParam({
														...filterParam,
														startedDate: moment(momentObj._d).utc(true).format()
													})
													getNewsDataList(isActive.mode, 1, { ...filterParam, startedDate: moment(momentObj._d).utc(true).format() })
												}
											}}

											name='startedDate'
											value={moment(filterParam.startedDate.toString())}></DatePicker>
									</div>
								</div>
							</div>
						</div>
						<div className="wrapper-input-level-1">
							<div className="wrapper-input-level-2">
								<div className="label-input">
									Ngày kết thúc
									<div className="sc-kstrdz kihuz">&nbsp;</div>
								</div>
								<div className="input-selection">
									<div className="input-selection-level-one" style={{ width: '100%' }}>
										<DatePicker format={formatCommon.formatDate()}
											onChange={(momentObj) => {
												if (momentObj == null) {
													setFilterParam({
														...filterParam,
														closedDate: moment(new Date()).utc(true).format()
													})
													getNewsDataList(isActive.mode, 1, { ...filterParam, closedDate: moment(new Date()).utc(true).format() })
												} else {
													setFilterParam({
														...filterParam,
														closedDate: moment(momentObj._d).utc(true).format()
													})
													getNewsDataList(isActive.mode, 1, { ...filterParam, closedDate: moment(momentObj._d).utc(true).format() })
												}
											}}
											name='closedDate'
											value={moment(filterParam.closedDate.toString())}></DatePicker>
									</div>
								</div>
							</div>
						</div>
					</div> : <Fragment></Fragment>}
				</div>
			</div>
			<div className="table-data">
				<div className="container-center">
					<div className="sc-bGoPOR ePtBtD">
						<div style={{ display: 'flex' }}>
							{showMenuBarStatus()}
						</div>
					</div>
				</div>
			</div>
			<div className='table-data' style={{ "paddingTop": "16px" }}>
				{showNewsCard()}
			</div>
			{getNewsCard.content.length !== 0 ? <div className='table-data'
				style={{
					"paddingTop": "16px",
					"marginBottom": "16px", "display": "flex",
					"justifyContent": "center"
				}}>
				<Pagination current={isActive.pageNo}
					total={isActive.totalPages}
					onChange={handleChoosePage}
					showSizeChanger={false} />
			</div> : <Fragment></Fragment>}
		</div>
	</Fragment>
}

export default NewsManagement;