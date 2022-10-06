import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { inputConstant } from "../../../constant/inputConstant"
import { HomeService } from "../../../service/HomeService"
import InputBox from "../../common/InputBox/InputBox"
import NewsCard from './../NewsCard/NewsCard'
import { message } from './../../../action/message'
import { useNavigate } from "react-router-dom"
import { Pagination } from "antd"

const MenuNewsCard = ({ queryParam, initPage, sortMode, chooseSortMode,choosePage }) => {
	const messageStatus = useSelector(state => state.controllMessage)
	const [getNewsCard, setNewsCard] = useState({ content: [], totalElements: 0, totalPages:0 })
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!messageStatus.show) {
			dispatch(message.information(true))
		}
		console.log(queryParam)
		if (!initPage) {
			HomeService.searchCard(queryParam.pageNo-1, queryParam.pageSize, queryParam.field, queryParam.mode, queryParam).then((page) => {
				console.log(page)
				setNewsCard(page)

				navigate(`/trang-chu?pageNo=${queryParam.pageNo}
				&mode=${queryParam.mode}&sort=${queryParam.field}
				&type=${queryParam.type.value}&province=${queryParam.province.value}
				&district=${queryParam.district.value}&ward=${queryParam.ward.value}
				&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}
				&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`)
				dispatch(message.information(false))
			})
		}
	}, [queryParam.type.value, queryParam.province.value,
	queryParam.district.value, queryParam.ward.value, queryParam.priceFrom,
	queryParam.priceTo, queryParam.areaFrom, queryParam.areaTo, initPage,
	queryParam.mode, queryParam.field, queryParam.pageNo])

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

	const handleGetValue = (target) => {
		switch (target.id) {
			case 0:
				chooseSortMode(2, 'startedDate')
				break;
			case 1:
				chooseSortMode(1, 'price')
				break;
			case 2:
				chooseSortMode(2, 'price')
				break;
			case 3:
				chooseSortMode(1, 'area')
				break;
			case 4:
				chooseSortMode(2, 'area')
				break;
		}

	}

	const handleChoosePage=(pageNo)=>{
		choosePage(pageNo)
	}

	return <div className='main-content-left'>
		<div className='path-tree'>
			<a className="re__link-se" href="/nha-dat-cho-thue" title="Nhà đất cho thuê tại Việt Nam">Cho thuê</a>
			<span>/</span>
			<a className="re__link-se" href="/nha-dat-cho-thue" title="Nhà đất cho thuê tại Việt Nam">Tất cả BĐS trên toàn quốc</a>
		</div>
		<h1 className="re__srp-title">{`${queryParam.type.title === 'Loại BĐS' ? 'Cho thuê bất động sản' : 'Cho thuê ' + queryParam.type.title.toLowerCase()} ${queryParam.province.value} ${queryParam.district.value}`}</h1>
		<span className="re__srp-total-count">Hiện có <span id="count-number">{getNewsCard.totalElements}</span> bất động sản. </span>
		<div className='re_sort'>
			<div style={{ "display": "flex", "justifyContent": "right" }}>
				<div className="input-selection" style={{ width: '24%' }}>
					<InputBox mode={inputConstant.DROP_DOWN_LIST}
						placeholder='Sắp xếp theo'
						name='sortMode'
						data={sortMode}
						getValueDropList={handleGetValue}
						onChange={handleGetValue}
					></InputBox>
				</div>

			</div>

		</div>
		<div className='list-news'>
			{showNewsCard()}
		</div>
		<div style={{"display":"flex", "justifyContent":"center"}}>
			<Pagination current={queryParam.pageNo}
				total={getNewsCard.totalPages*10}
				onChange={handleChoosePage}
				showSizeChanger={false} />
		</div>

	</div>
}

export default MenuNewsCard