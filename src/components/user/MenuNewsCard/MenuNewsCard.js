import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { inputConstant } from "../../../constant/inputConstant"
import { HomeService } from "../../../service/HomeService"
import InputBox from "../../common/InputBox/InputBox"
import NewsCard from './../NewsCard/NewsCard'
import { message } from './../../../action/message'

const MenuNewsCard = () => {
	const messageStatus = useSelector(state => state.controllMessage)
	const [getNewsCard, setNewsCard] = useState()
	const dispatch = useDispatch()
	useEffect(() => {
		if (!messageStatus.show) {
			dispatch(message.information(true))
		}
		HomeService.getMenuNewsCard(0, 10, 'startedDate', 2).then((page) => {
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
					avatar={el.avatar}></NewsCard>
			})
		}
	}

	return <div className='main-content-left'>
		<div className='path-tree'>
			<a className="re__link-se" href="/nha-dat-cho-thue" title="Nhà đất cho thuê tại Việt Nam">Cho thuê</a>
			<span>/</span>
			<a className="re__link-se" href="/nha-dat-cho-thue" title="Nhà đất cho thuê tại Việt Nam">Tất cả BĐS trên toàn quốc</a>
		</div>
		<h1 className="re__srp-title">Cho thuê nhà đất  trên toàn quốc</h1>
		<span className="re__srp-total-count">Hiện có <span id="count-number">25,191</span> bất động sản. </span>
		<div className='re_sort'>
			<div style={{ "display": "flex", "justifyContent": "right" }}>
				<div className="input-selection">
					<div className="input-selection-level-one" style={{ width: '100%' }}>
						<InputBox mode={inputConstant.DROP_DOWN_LIST}
							placeholder='Sắp xếp theo'
							name='typesOfAcc'></InputBox>
					</div>
				</div>
			</div>
		</div>
		<div className='list-news'>
			{showNewsCard()}
		</div>
	</div>
}

export default MenuNewsCard