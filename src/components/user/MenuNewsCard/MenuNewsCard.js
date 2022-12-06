import { Fragment, useEffect, useState } from "react"
import { inputConstant } from "../../../constant/inputConstant"
import { HomeService } from "../../../service/HomeService"
import InputBox from "../../common/InputBox/InputBox"
import NewsCard from './../NewsCard/NewsCard'
import { useNavigate } from "react-router-dom"
import { Pagination } from "antd"
import { modeNews } from "../../../constant/mode.news"
import { formatCommon } from "../../../common/format.common"

const MenuNewsCard = ({ queryParam, initPage, sortMode, chooseSortMode, choosePage, postType }) => {
	const [getNewsCard, setNewsCard] = useState({ content: [], totalElements: 0, totalPages: 0 })
	const navigate = useNavigate()
	useEffect(() => {
		if (!initPage) {
			console.log(queryParam)
			HomeService.searchCard(queryParam.pageNo - 1,
				queryParam.pageSize,
				queryParam.field,
				queryParam.mode,
				queryParam, {
				numBeds: queryParam.numbeds,
				directionHouse: queryParam.directionHouse,
				media: queryParam.media
			}).then((page) => {
				setNewsCard(page)
				let updatePostType = postType
				if (queryParam.type.value === 0) {
					updatePostType = '/trang-chu'
				} else if (queryParam.type.value === 1) {
					updatePostType = '/nha-nguyen-can'
				} else if (queryParam.type.value === 2) {
					updatePostType = '/can-ho-chung-cu'
				} else if (queryParam.type.value === 3) {
					updatePostType = '/phong-tro'
				}
				navigate(`${updatePostType}?pageNo=${queryParam.pageNo}&textSearch=${queryParam.textSearch}
				&mode=${queryParam.mode}&sort=${queryParam.field}
				&type=${queryParam.type.value}&province=${queryParam.province.value}
				&district=${queryParam.district.value}&ward=${queryParam.ward.value}
				&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}
				&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}&numbeds=${queryParam.numbeds}
				&directionHouse=${queryParam.directionHouse}&media=${queryParam.media}`)
			})
		}
	}, [queryParam.textSearch, queryParam.type.value, queryParam.province.value,
	queryParam.district.value, queryParam.ward.value, queryParam.priceFrom,
	queryParam.priceTo, queryParam.areaFrom, queryParam.areaTo, initPage,
	queryParam.mode, queryParam.field, queryParam.pageNo, JSON.stringify(queryParam.numbeds),
	JSON.stringify(queryParam.directionHouse), JSON.stringify(queryParam.media)])

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
					avatar={el.avatar}
					id={el.id}
					mode={modeNews.SHOWING}
					fromCalled="HOME" ></NewsCard>
			})
		}
	}

	const handleGetValue = (target) => {
		console.log(target)
		if (target.value === '') {
			chooseSortMode(1, 'startedDate')
			return
		}
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

	const handleChoosePage = (pageNo) => {
		choosePage(pageNo)
	}

	const showTitleMenuNewsInfor = () => {
		let arrItemTitle = []
		let title = 'Cho thuê bất động sản'
		let result = ''
		arrItemTitle.push(title)
		if (queryParam.type.title !== 'Loại BĐS') {
			arrItemTitle.push(queryParam.type.title)
		}
		if (queryParam.province.value) {
			arrItemTitle.push(queryParam.province.value)
		}
		if (queryParam.district.value) {
			arrItemTitle.push(queryParam.district.value)
		}
		if (queryParam.ward.value) {
			arrItemTitle.push(queryParam.ward.value)
		}
		if (queryParam.priceFrom > 0 && queryParam.priceTo !== 100000001) {
			arrItemTitle.push(`Từ ${formatCommon.convertPriceToStringVn(queryParam.priceFrom)} đến ${formatCommon.convertPriceToStringVn(queryParam.priceTo)}`)
		} else if (queryParam.priceFrom === 0 && queryParam.priceTo < 100000000) {
			arrItemTitle.push(`Khoảng dưới ${formatCommon.convertPriceToStringVn(queryParam.priceTo)}`)
		} else if (queryParam.priceFrom >= 100000000) {
			arrItemTitle.push(`Trên ${formatCommon.convertPriceToStringVn(queryParam.priceFrom)}`)
		}
		if (queryParam.areaFrom > 0 && queryParam.areaTo !== 151) {
			arrItemTitle.push(`Từ ${queryParam.areaFrom} đến ${queryParam.areaTo}m²`)
		} else if (queryParam.areaFrom === 0 && queryParam.areaTo < 150) {
			arrItemTitle.push(`Khoảng dưới ${queryParam.areaTo}m²`)
		} else if (queryParam.areaFrom >= 150) {
			arrItemTitle.push(`Trên ${queryParam.areaFrom}m²`)
		}
		if (queryParam.ward.value) {
			arrItemTitle.push(queryParam.ward.value)
		}
		for (let i = 0; i < arrItemTitle.length; i++) {
			if (i == arrItemTitle.length - 1) {
				result = result + arrItemTitle[i]
			} else {
				result = result + arrItemTitle[i] + ' - '
			}
		}
		return result
	}

	const renderHierarchical = () => {
		let rendering = []
		if (queryParam.type.value === 0) {
			rendering.push('Tất cả BĐS trên toàn quốc')
		} else {
			rendering.push(queryParam.type.title)
		}
		if (queryParam.province.value) {
			rendering.push(queryParam.province.value)
		}
		if (queryParam.district.value) {
			rendering.push(queryParam.district.value)
		}
		if (queryParam.ward.value) {
			rendering.push(queryParam.ward.value)
		}
		let updatePostType = postType
		if (queryParam.type.value === 0) {
			updatePostType = '/trang-chu'
		} else if (queryParam.type.value === 1) {
			updatePostType = '/nha-nguyen-can'
		} else if (queryParam.type.value === 2) {
			updatePostType = '/can-ho-chung-cu'
		} else if (queryParam.type.value === 3) {
			updatePostType = '/phong-tro'
		}
		return rendering.map((el) => {
			return <Fragment key={el}>
				<span>/</span>
				<a className="re__link-se"
					href={`${updatePostType}?pageNo=${queryParam.pageNo}
				&mode=${queryParam.mode}&sort=${queryParam.field}
				&type=${queryParam.type.value}&province=${queryParam.province.value}
				&district=${queryParam.district.value}&ward=${queryParam.ward.value}
				&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}
				&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>
					{el}</a>
			</Fragment>
		})
	}

	return <div className='main-content-left'>
		<div className='path-tree'>
			<a className="re__link-se">Cho thuê</a>
			{renderHierarchical()}
		</div>
		<h1 className="re__srp-title">{showTitleMenuNewsInfor()}</h1>
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
		<div style={{ "display": "flex", "justifyContent": "center" }}>
			<Pagination current={queryParam.pageNo}
				total={getNewsCard.totalPages * 10}
				onChange={handleChoosePage}
				showSizeChanger={false} />
		</div>
		<div style={{ "marginBottom": "16px" }}>
		</div>
	</div>
}

export default MenuNewsCard