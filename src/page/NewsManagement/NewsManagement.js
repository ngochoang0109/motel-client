import { Pagination } from 'antd';
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
import vnpayIcon from './../../assets/vnpay.icon.png'
import Radio, { Button } from 'antd/lib/radio';
import { cartConstant } from '../../constant/cart.constant';
import { useNavigate } from 'react-router-dom';

const NewsManagement = () => {
	const navigate = useNavigate()
	const [getNewsCard, setNewsCard] = useState({ content: [] })
	const [visible, setVisible] = useState(false)
	const [methodPayment, setMethodPayment] = useState(0)
	const dispatch = useDispatch()
	const [isActive, setActive] = useState({
		status: false,
		mode: dataCommon.menuBarStatusManagement[0].mode,
		pageNo: 0,
		totalPages: 0
	})
	const [textSearch, setTextSearch] = useState({ searched: false, text: '' })
	const [btnDurationTime, setBtnDurationTime] = useState(false)
	const [btnTypeOfAcc, setBtnTypeOfAcc] = useState(false)
	const [btnTypeOfNews, setBtnTypeOfNews] = useState(false)
	const [btnProvince, setBtnProvince] = useState(false)
	const [btnDistrict, setBtnDistrict] = useState(false)
	const [getProvince, setProvince] = useState([])
	const [getDistrict, setDistrict] = useState([])
	const [typeOfAcc, setTypeOfAcc] = useState([])
	const [typeOfNews, setTypeOfNews] = useState([])
	const [filterParam, setFilterParam] = useState({
		startedDate: new Date(),
		closedDate: new Date(),
		typeOfAcc: [],
		typeOfNews: [],
		province: [],
		district: []
	})
	useEffect(() => {
		dispatch(message.information(true))
		NewsManagementService.getAllPostOfUser(0, 5, 'startedDate', 2).then((page) => {
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
			setProvince(data)
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
					addToCart={addToCart}></NewsCard>
			})
		}
	}

	const selectedItemMenuBar = async (event, i, el) => {
		setActive({ id: i, status: !isActive.status, mode: el.mode, pageNo: 1 })
		console.log(el.mode)
		getNewsDataList(el.mode, 1)
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
		getNewsDataList(isActive.mode, page)
	}

	const getNewsDataList = async (mode, page) => {
		dispatch(message.information(true))
		if (textSearch.searched) {
			NewsManagementService.getNewsByTextSearch(page - 1, 5, 'startedDate', 2, mode, textSearch.text).then((page) => {
				setNewsCard(page)
				dispatch(message.information(false))
				setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: mode })
				console.log(isActive)
			})
			return
		}
		switch (mode) {
			case modeNews.NEWS_ALL:
				await NewsManagementService.getAllPostOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					setNewsCard(page)
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_ALL })
					dispatch(message.information(false))
				})
				return
			case modeNews.WAITING_APROVED:
				await NewsManagementService.getWaittingApproved(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_APROVED })
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_REJECT:
				await NewsManagementService.getNewsRejected(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_REJECT })
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_WAIT_PAYMENT:
				await NewsManagementService.getDontPayment(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_WAIT_PAYMENT })
					setNewsCard(page)
				})
				return
			case modeNews.WAITING_SHOW:
				await NewsManagementService.getWaittingShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_SHOW })
					setNewsCard(page)
				})
				return
			case modeNews.SHOWING:
				await NewsManagementService.getNewsShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					console.log(page)
					console.log("adsffffffffffffffffff" + page.totalPages)
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.SHOWING })
					setNewsCard(page)
					dispatch(message.information(false))
				})
				return
			case modeNews.EXPRIED:
				await NewsManagementService.getNewsExpriedOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.EXPRIED })
					setNewsCard(page)
				})
				return
			case modeNews.HINDDEN:
				await NewsManagementService.getNewsHiddenOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					setNewsCard(page)
					setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.HINDDEN })
					dispatch(message.information(false))
				})
				return
		}
	}

	const searchByTextSearch = (target) => {
		setTextSearch({ searched: false, text: target.value })
	}

	const clickIconSeach = () => {
		dispatch(message.information(true))
		setTextSearch({ ...textSearch, searched: true })
		NewsManagementService.getNewsByTextSearch(0, 5, 'startedDate', 2, isActive.mode, textSearch.text).then((page) => {
			console.log(page)
			setNewsCard(page)
			setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10 })
			dispatch(message.information(false))
		})
	}

	const chooseDurationTime = () => {
		setBtnDurationTime(!btnDurationTime)
		setBtnTypeOfAcc(false)
		setBtnTypeOfNews(false)
		setBtnProvince(false)
		setBtnDistrict(false)
	}

	const handleSetDateFilterParam = (target) => {
		setFilterParam({ ...filterParam, [target.nameOfinput]: target.value })
	}

	const chooseTypeOfAcc = () => {
		setBtnDurationTime(false)
		setBtnTypeOfAcc(!btnTypeOfAcc)
		setBtnTypeOfNews(false)
		setBtnProvince(false)
		setBtnDistrict(false)
	}

	const chooseBtnProvince = () => {
		setBtnDurationTime(false)
		setBtnTypeOfAcc(false)
		setBtnTypeOfNews(false)
		setBtnProvince(!btnProvince)
		setBtnDistrict(false)
	}

	const chooseTypeOfNews = () => {
		setBtnDurationTime(false)
		setBtnTypeOfAcc(false)
		setBtnTypeOfNews(!btnTypeOfNews)
		setBtnProvince(false)
		setBtnDistrict(false)
	}

	const chooseBtnDistrict = () => {
		setBtnDurationTime(false)
		setBtnTypeOfAcc(false)
		setBtnTypeOfNews(false)
		setBtnProvince(false)
		setBtnDistrict(!btnDistrict)
	}

	const handleSetArrayFilterParam = (target, id) => {
		if (btnTypeOfAcc) {
			setFilterParam({ ...filterParam, typeOfAcc: addOrDeleteParam(target, id, filterParam.typeOfAcc) })
		}
		else if (btnTypeOfNews) {
			setFilterParam({ ...filterParam, typeOfNews: addOrDeleteParam(target, id, filterParam.typeOfNews) })
		}
		else if (btnProvince) {
			const newChecked = addOrDeleteParam(target, id, filterParam.province)
			setFilterParam({ ...filterParam, province: newChecked })
			if (newChecked.length === 1) {
				AddressApiService.getAllDistricByProvinceId(newChecked[0]).then((data) => {
					setDistrict(data)
				})
			} else {
				setDistrict([])
			}
		} else if (btnDistrict) {
			setFilterParam({ ...filterParam, district: addOrDeleteParam(target, id, filterParam.district) })
		}
	}

	const addOrDeleteParam = (target, id, arr) => {
		console.log(id)
		const updateArr = arr
		const i = arr.findIndex(el => el === id)
		if (target.value) {
			if (i > -1) {
				updateArr[i] = arr[i].id
			} else {
				updateArr.push(id)
			}
		} else {
			updateArr.splice(i, 1)
		}
		return updateArr
	}

	const filterData = () => {
		dispatch(message.information(true))
		setTextSearch({ ...textSearch, searched: true })
		NewsManagementService.getNewsByTextSearch(0, 5, 'startedDate', 2, isActive.mode, textSearch.text, filterParam).then((page) => {
			console.log(page)
			setNewsCard(page)
			setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10 })
			dispatch(message.information(false))
		})
	}
	const handleCancel = e => {
		setVisible(false)
	}
	const handlePayment = () => {
		console.log(methodPayment)
		setVisible(false)
	}

	const chooseMethodPayment = (event) => {
		setMethodPayment(event.target.value)
	}

	const modalChooseMethodPayment = () => {
		return <Modal title="Chọn hình thức thanh toán"
			visible={visible}
			onCancel={handleCancel}
			bodyStyle={{ height: "400px", width: "550px" }}
			style={{ top: 120 }}
			footer={[
				<Button type="primary"
					onClick={handleCancel}>
					Thoát
				</Button>,
				<Button
					onClick={handlePayment}>
					Áp dụng
				</Button>]}>
			{/* 0: my wallet, 1: vnpay payment */}
			<Radio.Group onChange={chooseMethodPayment} value={methodPayment}>
				<div className="discount-content">
					<div className="wrap-item" style={{ "marginBottom": "24px" }}>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496 496" style={{ enableBackground: 'new 0 0 496 496' }} xmlSpace="preserve">
							<path style={{ fill: '#C67217' }} d="M456,56H68.8C39.2,56,16,79.2,16,108l0,0c0,28.8,23.2,52,52.8,52H456" />
							<path style={{ fill: '#FCA12A' }} d="M456,56v104H68.8C40,160,16,136,16,104l0,0v336l0,0c0,32,24,56,52.8,56H456V392l0,0v-28.8v-40v-65.6
      V56L456,56z" />
							<path style={{ fill: '#C67217' }} d="M454.4,204c14.4,0,25.6,12,25.6,25.6l0,0c0,14.4-11.2,25.6-25.6,25.6" />
							<polygon style={{ fill: '#EF861D' }} points="456,392 456,392 456,363.2 456,344.8 280.8,345.6 264.8,396.8 362.4,496 456,496 " />
							<path style={{ fill: '#F4DBA8' }} d="M264,256h190.4c14.4,0,25.6-11.2,25.6-25.6l0,0v140v1.6c0,14.4-12,28-25.6,28H264v-56l0,0v-12.8v4.8
      v-32" />
							<path style={{ fill: '#E5BD76' }} d="M453.6,258.4c14.4,0,25.6-12.8,25.6-26.4v-0.8v140v1.6c0,14.4-12,28-25.6,28H264v-56l0,0V332v68" />
							<circle style={{ fill: '#3CC676' }} cx={328} cy="327.2" r="32.8" />
							<path style={{ fill: '#0AA06E' }} d="M354.4,308c11.2,14.4,8,34.4-6.4,45.6s-34.4,8-45.6-6.4" />
							<path style={{ fill: '#A0520B' }} d="M456,120H92.8c-9.6,0-16.8-6.4-16.8-16l0,0c0-9.6,8-16,16.8-16H456" />
							<rect x={112} style={{ fill: '#3CC676' }} width={248} height={120} />
							<polyline style={{ fill: '#2EAF62' }} points="360,0 360,120 112,120 " />
							<rect x={144} y={32} style={{ fill: '#0AA06E' }} width={184} height={88} />
							<polyline style={{ fill: '#078457' }} points="328,32 328,120 144,120 " /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g />
						</svg>
						<div className="discount-infor">
							<div className="discount-right">
								<div className="mpTlYm">
									<label className="jjBnhm"
										style={{
											"fontFamily": "'Roboto', sans-serif",
											"fontWeight": "500",
											"fontSize": "16px",
											"marginLeft": "28px"
										}}>Thanh toán ví tài khoản</label>
								</div>
							</div>
							<div className="discount-left">
								<div className="Sw3kAk">
									<Radio type="radio"
										name='paymentMethod'
										value={0}
									></Radio>
								</div>
							</div>
						</div>
					</div>
					<div className="wrap-item" style={{ "marginBottom": "24px" }}>
						<img src={vnpayIcon}></img>
						<div className="discount-infor">
							<div className="discount-right">
								<span className="jjBnhm"
									style={{
										"fontFamily": "'Roboto', sans-serif",
										"fontWeight": "500",
										"fontSize": "16px",
										"marginLeft": "28px"
									}}>Thanh toán online VNPAY</span>
							</div>
							<div className="discount-left">
								<div className="Sw3kAk">
									<Radio
										name='paymentMethod'
										value={1}
									></Radio>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Radio.Group>
		</Modal>
	}
	console.log(filterParam)

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			{modalChooseMethodPayment()}
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
										onChange={searchByTextSearch}
										clickIcon={clickIconSeach}
										value={textSearch.text}></InputBox>
								</div>
							</div>
						</div>
						<button className='btn-export mr-8' onClick={chooseDurationTime}>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="calendarEventIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
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
						<button className='btn-export mr-8' onClick={chooseTypeOfAcc}>
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
						<button className='btn-export mr-8' onClick={chooseTypeOfNews}>
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
						<button className='btn-export mr-8' onClick={chooseBtnProvince}>
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
						<button className='btn-export mr-8' onClick={chooseBtnDistrict}>
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
									<div className="sc-kstrdz kihuz">&nbsp;*</div>
								</div>
								<div className="input-selection">
									<div className="input-selection-level-one" style={{ width: '100%' }}>
										<InputBox mode={inputConstant.CALENDAR_BOX}
											name='startedDate'
											onChange={handleSetDateFilterParam}
											disable={false}></InputBox>
									</div>
								</div>
							</div>
						</div>
						<div className="wrapper-input-level-1">
							<div className="wrapper-input-level-2">
								<div className="label-input">
									Ngày kết thúc
									<div className="sc-kstrdz kihuz">&nbsp;*</div>
								</div>
								<div className="input-selection">
									<div className="input-selection-level-one" style={{ width: '100%' }}>
										<InputBox mode={inputConstant.CALENDAR_BOX}
											name='closedDate'
											onChange={handleSetDateFilterParam}
											disable={false}></InputBox>
									</div>
								</div>
							</div>
						</div>
					</div> : <Fragment></Fragment>}
					{btnTypeOfAcc ? <div className='wrapper-data-filter'>
						{console.log(filterParam.typeOfAcc)}
						{typeOfAcc.map((el) => {
							return <InputBox key={el.id} mode={inputConstant.CHECK_BOX}
								title={el.name}
								name={el.name}
								onChange={(target) => handleSetArrayFilterParam(target, el.id)}
								checked={filterParam.typeOfAcc.indexOf(el.id) !== -1 ? true : false}></InputBox>
						})}
					</div> : <Fragment></Fragment>}
					{btnTypeOfNews ? <div className='wrapper-data-filter'>
						{typeOfNews.map((el) => {
							return <InputBox key={el.id} mode={inputConstant.CHECK_BOX}
								title={el.name}
								name={el.name}
								onChange={(target) => handleSetArrayFilterParam(target, el.id)}
								checked={filterParam.typeOfNews.indexOf(el.id) !== -1 ? true : false}></InputBox>
						})}
					</div> : <Fragment></Fragment>}
					{btnProvince ? <div className='wrapper-data-filter'>
						{getProvince.map((el) => {
							return <InputBox key={el.id} mode={inputConstant.CHECK_BOX}
								title={el.name}
								name={el.name}
								onChange={(target) => handleSetArrayFilterParam(target, el.id)}
								checked={filterParam.province.indexOf(el.id) !== -1 ? true : false}></InputBox>
						})}
					</div> : <Fragment></Fragment>}
					{btnDistrict ? <div className='wrapper-data-filter'>
						{getDistrict.map((el) => {
							return <InputBox key={el.id} mode={inputConstant.CHECK_BOX}
								title={el.name}
								name={el.name}
								onChange={(target) => handleSetArrayFilterParam(target, el.id)}
								checked={filterParam.district.indexOf(el.id) !== -1 ? true : false}></InputBox>
						})}
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
				{console.log(isActive)}
				<Pagination current={isActive.pageNo}
					total={isActive.totalPages}
					onChange={handleChoosePage}
					showSizeChanger={false} />
			</div> : <Fragment></Fragment>}
		</div>
	</Fragment>
}

export default NewsManagement;