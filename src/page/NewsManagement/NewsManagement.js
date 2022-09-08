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
import "antd/dist/antd.css";
import './NewsManagement.css'

const NewsManagement = () => {
	const [getNewsCard, setNewsCard] = useState()
	const dispatch = useDispatch()
	const [isActive, setActive] = useState({ id: 0, status: false, mode: dataCommon.menuBarStatusManagement[0].mode, pageNo: 1 })
	const [textSearch, setTextSearch] = useState({ searched: false, text: '' })
	useEffect(() => {
		dispatch(message.information(true))
		NewsManagementService.getAllPostOfUser(0, 5, 'startedDate', 2).then((page) => {
			dispatch(message.information(false))
			setNewsCard(page)
		})
	}, [])

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
					id={el.id}></NewsCard>
			})
		}
	}

	const selectedItemMenuBar = async (event, i, el) => {
		setActive({ id: i, status: !isActive.status, mode: el.mode, pageNo: 1 })
		getNewsDataList(el.mode, 1)
	}

	const showMenuBarStatus = () => {
		return dataCommon.menuBarStatusManagement.map((el, i) => {
			return <button className={`col-table-data ${i === isActive.id ? el.className : ''}`}
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
			})
			return
		}
		switch (mode) {
			case modeNews.NEWS_ALL:
				await NewsManagementService.getAllPostOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					setNewsCard(page)
					dispatch(message.information(false))
				})
				return
			case modeNews.WAITING_APROVED:
				await NewsManagementService.getWaittingApproved(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_REJECT:
				await NewsManagementService.getNewsRejected(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.NEWS_WAIT_PAYMENT:
				await NewsManagementService.getDontPayment(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.WAITING_SHOW:
				await NewsManagementService.getWaittingShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.SHOWING:
				await NewsManagementService.getNewsShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.EXPRIED:
				await NewsManagementService.getNewsExpriedOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					dispatch(message.information(false))
					setNewsCard(page)
				})
				return
			case modeNews.HINDDEN:
				await NewsManagementService.getNewsHiddenOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
					setNewsCard(page)
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
			setNewsCard(page)
			dispatch(message.information(false))
		})
	}

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
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
						<button className='btn-export mr-8'>
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
						<button className='btn-export mr-8'>
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
						<button className='btn-export mr-8'>
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
						<button className='btn-export mr-8'>
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
						<button className='btn-export mr-8'>
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
						<button className='btn-export'>
							<div className="wrapper-text">
								<span className="icon">
									<div>
										<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="downloadIconTitle" stroke="#2329D6" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" fill="none" color="#2329D6">
											<title id="downloadIconTitle">Download</title>
											<path d="M12,3 L12,16" />
											<polyline points="7 12 12 17 17 12" />
											<path d="M20,21 L4,21" />
										</svg>
									</div>
								</span>
								<span className="text">Excel</span>
							</div>
						</button>
					</div>
					<div className='wrapper-data-filter'>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>

						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>

						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>

						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>

						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Bãi đổ xe'}
							name={'parking'}
						></InputBox>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Bãi đổ xe'}
							name={'parking'}
						></InputBox>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Internet'}
							name={'internet'}
						></InputBox>
						<InputBox mode={inputConstant.CHECK_BOX}
							title={'Bãi đổ xe'}
							name={'parking'}
						></InputBox>
					</div>
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
			<div className='table-data' style={{ "marginTop": "16px" }}>
				{showNewsCard()}
			</div>
			<div className='table-data' style={{ "marginTop": "16px", "marginBottom": "16px", "display": "flex", "justifyContent": "center" }}>
				<Pagination current={isActive.pageNo}
					total={getNewsCard ? getNewsCard.totalPages * 10 : 0}
					onChange={handleChoosePage}
					showSizeChanger={false} />
			</div>
		</div>
	</Fragment>
}

export default NewsManagement;