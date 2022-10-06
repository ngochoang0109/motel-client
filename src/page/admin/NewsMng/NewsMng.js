import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { message } from "../../../action/message"
import { dataCommon } from "../../../common/data.common"
import NewsCard from "../../../components/admin/NewsCard"
import { modeNews } from "../../../constant/mode.news"

const NewsMng = () => {

	const dispatch = useDispatch()
	const [getNewsCard, setNewsCard] = useState({ content: [] })
	const [isActive, setActive] = useState({
		status: false,
		mode: dataCommon.menuBarStatusManagement[0].mode,
		pageNo: 0,
		totalPages: 0
	})

	const getNewsDataList = async (mode, page) => {
		// dispatch(message.information(true))
		switch (mode) {
			case modeNews.NEWS_ALL:
			// await NewsManagementService.getAllPostOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	setNewsCard(page)
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_ALL })
			// 	dispatch(message.information(false))
			// })
			// return
			case modeNews.WAITING_APROVED:
			// await NewsManagementService.getWaittingApproved(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	dispatch(message.information(false))
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_APROVED })
			// 	setNewsCard(page)
			// })
			// return
			case modeNews.NEWS_REJECT:
			// await NewsManagementService.getNewsRejected(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	dispatch(message.information(false))
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_REJECT })
			// 	setNewsCard(page)
			// })
			// return
			case modeNews.NEWS_WAIT_PAYMENT:
			// await NewsManagementService.getDontPayment(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	dispatch(message.information(false))
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.NEWS_WAIT_PAYMENT })
			// 	setNewsCard(page)
			// })
			// return
			case modeNews.WAITING_SHOW:
			// await NewsManagementService.getWaittingShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	dispatch(message.information(false))
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.WAITING_SHOW })
			// 	setNewsCard(page)
			// })
			// return
			case modeNews.SHOWING:
			// await NewsManagementService.getNewsShowOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	console.log(page)
			// 	console.log("adsffffffffffffffffff" + page.totalPages)
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.SHOWING })
			// 	setNewsCard(page)
			// 	dispatch(message.information(false))
			// })
			// return
			case modeNews.EXPRIED:
			// await NewsManagementService.getNewsExpriedOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	dispatch(message.information(false))
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.EXPRIED })
			// 	setNewsCard(page)
			// })
			// return
			case modeNews.HINDDEN:
			// await NewsManagementService.getNewsHiddenOfUser(page - 1, 5, 'startedDate', 2).then((page) => {
			// 	setNewsCard(page)
			// 	setActive({ ...isActive, pageNo: page.pageNo + 1, totalPages: page.totalPages * 10, mode: modeNews.HINDDEN })
			// 	dispatch(message.information(false))
			// })
			// return
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
			{/* {getNewsCard.content.length !== 0 ? <div className='table-data'
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