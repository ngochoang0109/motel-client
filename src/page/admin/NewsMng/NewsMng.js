import { Pagination } from "antd"
import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { message } from "../../../action/message"
import { dataCommon } from "../../../common/data.common"
import { formatCommon } from "../../../common/format.common"
import NewsCard from "../../../components/admin/NewsCard"
import { modeNews } from "../../../constant/mode.news"
import { NewsManagementService } from '../../../service/NewsManagementService'

const NewsMng = () => {

	const dispatch = useDispatch()
	const [getNewsCard, setNewsCard] = useState([])
	const [isActive, setActive] = useState({
		status: false,
		mode: dataCommon.menuBarStatusManagement[0].mode,
		pageNo: 0,
		totalPages: 0,
		pageSize: 2
	})
	const location = useLocation()
	const nav = useNavigate()

	useEffect(() => {
		dispatch(message.information(true))
		NewsManagementService.getAllNews().then((data) => {
			setNewsCard(data)
			if (location.search === '') {
				setActive({ ...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10 })
			} else {
				const obj = formatCommon.getQueryStringParams(location.search)
				setActive({ ...isActive, pageNo: obj.pageNo, totalPages: Math.ceil(data.length / isActive.pageSize) * 10 })
			}
			dispatch(message.information(false))
		})
	}, [])

	// useEffect(() => {
	// 	nav(`/admin/news-management?pageNo=${isActive.pageNo}&mode=${isActive.mode}`)
	// }, [isActive])

	const getNewsDataList = async (mode, page) => {
		dispatch(message.information(true))
		switch (mode) {
			case modeNews.NEWS_ALL:
				await NewsManagementService.getAllNews('').then((data) => {
					setNewsCard(data)
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.NEWS_ALL
					})
					dispatch(message.information(false))
				})
				return
			case modeNews.WAITING_APROVED:
				await NewsManagementService.getAllNews(modeNews.WAITING_APROVED).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.WAITING_APROVED
					})
					setNewsCard(data)
				})
				return
			case modeNews.NEWS_REJECT:
				await NewsManagementService.getAllNews(modeNews.NEWS_REJECT).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.NEWS_REJECT
					})
					setNewsCard(data)
				})
				return
			case modeNews.NEWS_WAIT_PAYMENT:
				await NewsManagementService.getAllNews(modeNews.NEWS_WAIT_PAYMENT).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.NEWS_WAIT_PAYMENT
					})
					setNewsCard(data)
				})
				return
			case modeNews.WAITING_SHOW:
				await NewsManagementService.getAllNews(modeNews.WAITING_SHOW).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.WAITING_SHOW
					})
					setNewsCard(data)
				})
				return
			case modeNews.SHOWING:
				await NewsManagementService.getAllNews(modeNews.SHOWING).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.SHOWING
					})
					setNewsCard(data)
				})
				return
			case modeNews.EXPRIED:
				await NewsManagementService.getAllNews(modeNews.EXPRIED).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.EXPRIED
					})
					setNewsCard(data)
				})
				return
			case modeNews.HINDDEN:
				await NewsManagementService.getAllNews(modeNews.HINDDEN).then((data) => {
					dispatch(message.information(false))
					setActive({
						...isActive, pageNo: 1, totalPages: Math.ceil(data.length / isActive.pageSize) * 10,
						mode: modeNews.HINDDEN
					})
					setNewsCard(data)
				})
				return
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

	const showNewsCard = () => {
		if (getNewsCard) {
			return getNewsCard.map((el, i) => {
				return <NewsCard key={getNewsCard[i].id} title={getNewsCard[i].title}
					price={getNewsCard[i].price}
					area={getNewsCard[i].area}
					province={getNewsCard[i].province}
					district={getNewsCard[i].district}
					description={getNewsCard[i].description}
					fullName={getNewsCard[i].fullName}
					phone={getNewsCard[i].phone}
					startedDate={getNewsCard[i].startedDate}
					closedDate={getNewsCard[i].closedDate}
					avatar={getNewsCard[i].avatar}
					mode={getNewsCard[i].mode}
					totalAmount={getNewsCard[i].totalAmount}
					id={getNewsCard[i].id}></NewsCard>
			})
		}
	}

	// const handleChoosePage = (page) => {
	// 	setActive({ ...isActive, pageNo: page })
	// }

	return <Fragment>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Quản lý bài viết</h3>
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
			{/* {getNewsCard.length !== 0 ? <div className='table-data'
				style={{ "marginTop": "16px", "marginBottom": "16px", "display": "flex", "justifyContent": "center" }}>
				{console.log(isActive)}
				<Pagination current={isActive.pageNo}
					total={isActive.totalPages}
					onChange={handleChoosePage}
					showSizeChanger={false} />
			</div> : <Fragment></Fragment>} */}
		</div>
	</Fragment>
}

export default NewsMng