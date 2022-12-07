import { InputNumber, Slider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd/lib/radio';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dataCommon } from '../../common/data.common';
import { formatCommon } from '../../common/format.common';
import InputBox from '../../components/common/InputBox/InputBox';
import MenuNewsCard from '../../components/user/MenuNewsCard/MenuNewsCard';
import SideFilterBox from '../../components/user/SideFilterBox/SideFilterBox';
import { inputConstant } from '../../constant/inputConstant';
import { AddressApiService } from '../../service/AddressApiService';
import { HomeService } from '../../service/HomeService';
import { PostNewsService } from '../../service/PostNewsService';
import seo from './../../assets/seo.png'
import './ShowNewsInfor.css'

const ShowNewsInfor = () => {

	const [visible, setVisible] = useState(false)
	const [modeModal, setModeModal] = useState(0)
	const [accType, setAccType] = useState([])
	const [provinces, setProvinces] = useState([])
	const [district, setDistrict] = useState([])
	const [ward, setWard] = useState([])
	const [textSearch, setTextSearch] = useState('')
	const [countNewsOfProvince, setCountNewsOfProvince] = useState([])
	const [additionalFilter, setAdditionalFilter] = useState({
		numbeds: [],
		directionHouse: [],
		media: []
	})
	const [queryParam, setQueryParam] = useState({
		textSearch: '',
		type: {
			title: 'Loại BĐS',
			value: 0
		}, province: {
			title: 'Khu vực',
			value: ''
		}, district: {
			title: '',
			value: ''
		}, ward: {
			title: '',
			value: ''
		},
		priceFrom: 0,
		priceTo: 100000000,
		areaFrom: 0,
		areaTo: 150,
		mode: 1,
		pageNo: 1,
		pageSize: 20,
		field: 'startedDate',
		numbeds: [],
		directionHouse: [],
		media: []
	})
	const location = useLocation()
	const [initPage, setInitPage] = useState(true)
	const [sortMode, setSortMode] = useState([{ id: 0, name: 'Tin mới nhất' },
	{ id: 1, name: 'Giá thấp đến cao' }, { id: 2, name: 'Giá cao đến thấp' },
	{ id: 3, name: 'Diện tích thấp đến cao' }, { id: 4, name: 'Diện tích cao đến thấp' }])

	useEffect(() => {
		setInitPage(false)
		if (location.search.length !== 0) {
			const obj = formatCommon.getQueryStringParams(location.search)
			const updateQueryParam = queryParam
			PostNewsService.getTypeOfAcc().then((data) => {
				setAccType(data.data)
				data.data.map((el) => {
					if (Number(obj.type) === el.id) {
						updateQueryParam.type.title = el.name
						updateQueryParam.type.value = el.id
						return
					}
				})
			})
			updateQueryParam.province = { title: obj.province.length === 0 ? 'Khu vực' : obj.province, value: obj.province }
			updateQueryParam.district = { title: obj.district, value: obj.district }
			updateQueryParam.ward = { title: obj.ward, value: obj.ward }
			updateQueryParam.priceFrom = Number(obj.priceFrom)
			updateQueryParam.priceTo = Number(obj.priceTo)
			updateQueryParam.areaFrom = Number(obj.areaFrom)
			updateQueryParam.areaTo = Number(obj.areaTo)
			updateQueryParam.mode = Number(obj.mode)
			updateQueryParam.field = obj.sort
			updateQueryParam.pageNo = Number(obj.pageNo)
			updateQueryParam.numbeds = obj.numbeds ? obj.numbeds.split(',').map(str => {
				return Number(str);
			}) : []
			updateQueryParam.directionHouse = obj.directionHouse ? obj.directionHouse.split(',').map(str => {
				return str;
			}) : []
			updateQueryParam.media = obj.media ? obj.media.split(',').map(str => {
				return Number(str);
			}) : []
			setAdditionalFilter({
				numbeds: updateQueryParam.numbeds,
				directionHouse: updateQueryParam.directionHouse,
				media: updateQueryParam.media
			})
			setTextSearch(obj.textSearch)
			setQueryParam(updateQueryParam)
		} else {
			PostNewsService.getTypeOfAcc().then((data) => {
				setAccType(data.data)
			})
		}
		AddressApiService.getAllProvince().then((data) => {
			setProvinces(data.reverse())
		})
		HomeService.countByProvince().then((data) => {
			setCountNewsOfProvince(data)
		})
	}, [location.search])

	const showModal = (mode) => {
		setModeModal(mode)
		setVisible(true)
	}

	const handleCancel = e => {
		setVisible(false)
	}
	const onAfterChangePrice = (value) => {
		setQueryParam({ ...queryParam, priceFrom: value[0], priceTo: value[1] })
	};

	const updateParamQuery = (value, name) => {
		let param = queryParam
		if (name === 'type') {
			param.type.value = value.id
			param.type.title = value.name
			setVisible(false)
		} else if (name === 'province') {
			param.province.title = value.name
			param.province.value = value.name
			AddressApiService.getAllDistricByProvinceId(value.id).then((data) => {
				setDistrict(data.reverse())
			})
		} else if (name === 'district') {
			param.district.title = value.name
			param.district.value = value.name
			AddressApiService.getAllWardByDistrictId(value.id).then((data) => {
				setWard(data)
			})
		} else if (name === 'ward') {
			param.ward.title = value.name
			param.ward.value = value.name
			setVisible(false)
		}
		setQueryParam(param)
	}

	const contentModalAddress = (arr, mode) => {
		return arr.map((el) => {
			return <li itemProp="itemListElement"
				className="Styles_option__1f2OH" key={el.id}
				onClick={() => updateParamQuery(el, mode)}>
				<div className="Styles_tagLink__w5_mC">
					<span>{el.name}</span>
					<img src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
						alt="next" height="14px" width="5px" style={{ marginLeft: 'auto' }} />
				</div>
			</li>
		})
	}

	const previousAddress = () => {
		let param = queryParam
		if (ward.length !== 0) {
			param.ward.title = ''
			param.ward.value = ''
			setWard([])
			setQueryParam(param)
		} else if (district.length !== 0) {
			param.district.title = ''
			param.district.value = ''
			setDistrict([])
			setQueryParam(param)
		}
	}

	const resetAddress = () => {
		setWard([])
		setDistrict([])
		setQueryParam({
			...queryParam, province: {
				title: 'Khu vực',
				value: ''
			}, district: {
				title: '',
				value: ''
			}, ward: {
				title: '',
				value: ''
			}
		})
	}

	const resetPrice = () => {
		setQueryParam({ ...queryParam, priceFrom: 0, priceTo: 100000000 })
	}

	const onChangeMinPrice = (value) => {
		if (value === null) {
			setQueryParam({ ...queryParam, priceFrom: 0 })
			return
		}
		setQueryParam({ ...queryParam, priceFrom: value.target.value })
	}
	const onChangeMaxPrice = (value) => {
		if (value === null) {
			setQueryParam({ ...queryParam, priceTo: 0 })
			return
		}
		setQueryParam({ ...queryParam, priceTo: value.target.value })
	}
	const onChangeMinArea = (value) => {
		if (value === null) {
			setQueryParam({ ...queryParam, areaFrom: 0 })
			return
		}
		setQueryParam({ ...queryParam, areaFrom: value.target.value })
	}
	const onChangeMaxArea = (value) => {
		if (value === null) {
			setQueryParam({ ...queryParam, areaTo: 0 })
			return
		}
		setQueryParam({ ...queryParam, areaTo: value.target.value })
	}
	const onAfterChangeArea = (value) => {
		setQueryParam({ ...queryParam, areaFrom: value[0], areaTo: value[1] })
	}

	const resetArea = () => {
		setQueryParam({ ...queryParam, areaFrom: 0, areaTo: 150 })
	}

	const resetQueryParam = () => {
		setWard([])
		setDistrict([])
		setAdditionalFilter({
			numbeds: [],
			directionHouse: [],
			media: []
		})
		setTextSearch('')
		setQueryParam({
			textSearch: '',
			type: {
				title: 'Loại BĐS',
				value: 0
			}, province: {
				title: 'Khu vực',
				value: ''
			}, district: {
				title: '',
				value: ''
			}, ward: {
				title: '',
				value: ''
			},
			priceFrom: 0,
			priceTo: 100000000,
			areaFrom: 0,
			areaTo: 150,
			mode: 1,
			pageNo: 1,
			pageSize: 20,
			field: 'startedDate',
			numbeds: [],
			directionHouse: [],
			media: 0
		})
	}
	const renderModalContent = () => {
		switch (modeModal) {
			case 1:
				return <Modal title='Chọn danh mục'
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "200px" }}
					style={{ top: -152 }}><div className="styles_modal-body__1C3xw undefined">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{accType.map((el) => {
										return <li key={el.id}
											onClick={() => updateParamQuery(el, 'type')}
											className="Styles_option__1f2OH" >
											<div className="Styles_tagLink__w5_mC " to={el.id === 1 ? '/nha-nguyen-can' : el.id === 2 ? '/can-ho-chung-cu' : '/phong-tro'}>
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
			case 2:
				return <Modal title="Chọn khu vực"
					visible={visible}
					centered footer={[
						<Button onClick={previousAddress}>
							Trước
						</Button>,
						<Button onClick={resetAddress}>
							Đặt lại
						</Button>]}
					onCancel={handleCancel}
					bodyStyle={{ height: "400px" }}
					style={{ top: -26 }}><div className="styles_modal-body__1C3xw">
						<div className="Styles_bodyCustom__1gL0v">
							<div className="Styles_body__4HzMi">
								<ul>
									{ward.length !== 0 ? contentModalAddress(ward, 'ward') : district.length !== 0 ? contentModalAddress(district, 'district') : contentModalAddress(provinces, 'province')}
								</ul>
							</div>
						</div>
					</div>
				</Modal>
			case 3:
				return <Modal title="Giá thuê"
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "180px" }}
					style={{ top: -162 }}>
					<div className='re__listing-filter-position'>
						<div className="re__listing-filter-popup js__filter-more-popup re__show">
							<div className="Styles_rangerWrapper__1crim">
								<div className="Styles_priceFromTo__2dRzg">
									<div>Giá từ <b>{formatCommon.formatNumberic(queryParam.priceFrom.toString())} VNĐ</b> đến <b>{formatCommon.formatNumberic(queryParam.priceTo.toString())} VNĐ</b></div>
								</div>
								<div className="Styles_Range__2Ywfj">
									<div className="range-input-number-main">
										<InputNumber
											className="min-input-main"
											min={0}
											max={100000000}
											controls={false}
											style={{ borderRadius: "4px", width: "100px" }}
											onBlur={onChangeMinPrice}
											value={queryParam.priceFrom}
										/>
										<span className="range-span">&ensp; Đến&ensp; </span>
										<InputNumber
											className="min-input-main"
											min={0}
											max={100000000}
											controls={false}
											style={{ borderRadius: "4px", width: "100px" }}
											onBlur={onChangeMaxPrice}
											value={queryParam.priceTo}
										/>
									</div>
									<Slider
										range
										step={500000}
										max={100000000}
										min={0}
										value={[queryParam.priceFrom, queryParam.priceTo]}
										onAfterChange={onAfterChangePrice}
										onChange={onAfterChangePrice}
									/>
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
									onClick={resetPrice}>
									<i className="re__icon-search--sm" />
									<span>Đặt lại</span>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			case 4:
				return <Modal title="Diện tích"
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "180px" }}
					style={{ top: -128 }}>
					<div className='re__listing-filter-position'>
						<div className="re__listing-filter-popup js__filter-more-popup re__show">
							<div className="Styles_rangerWrapper__1crim">
								<div className="Styles_priceFromTo__2dRzg">
									<div>Diện tích từ <b>{queryParam.areaFrom} m²</b> đến <b>{queryParam.areaTo} m²</b></div>
								</div>
								<div className="Styles_Range__2Ywfj">
									<div className="range-input-number-main">
										<InputNumber
											className="min-input-main"
											min={0}
											max={150}
											controls={false}
											style={{ borderRadius: "4px", width: "100px" }}
											value={queryParam.areaFrom}
											onBlur={onChangeMinArea}
										/>
										<span className="range-span">&ensp; Đến&ensp; </span>
										<InputNumber
											className="min-input-main"
											min={0}
											max={150}
											controls={false}
											style={{ borderRadius: "4px", width: "100px" }}
											value={queryParam.areaTo}
											onBlur={onChangeMaxArea}
										/>
									</div>
									<Slider
										range
										step={5}
										max={150}
										min={0}
										value={[queryParam.areaFrom, queryParam.areaTo]}
										onAfterChange={onAfterChangeArea}
										onChange={onAfterChangeArea}
									/>
								</div>
							</div>
							<div className="re__listing-filter-popup-footer">
								<div className="re__btn re__btn-se-ghost--sm re__btn-icon-left--sm js__filter-more-reset-button">
									<i className="re__icon-refresh" />
									<span></span>
								</div>
								<div className="re__btn re__btn-pr-solid--sm re__btn-icon-left--sm js__lfilter-more-search-button"
									onClick={resetArea}>
									<i className="re__icon-search--sm" />
									<span>Đặt lại</span>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			case 5:
				return <Modal title="Lọc thêm"
					visible={visible}
					centered footer={null}
					onCancel={handleCancel}
					bodyStyle={{ height: "376px" }}
					style={{ top: -64 }}>
					<div className='re__listing-filter-position'>
						<div className="re__listing-filter-popup js__filter-more-popup re__show">
							<div className="re__listing-filter-popup-body">
								<span className="re__listing-filter-popup-title">Số phòng ngủ</span>
								<div className="re__listing-search-tag-container js__listing-search-tag-container">
									<div className="re__listing-search-tag-list js__listing-search-tag-list">
										{dataCommon.getNumberBeds.map((el) => {
											return <div className="re__listing-search-tag-list-item"
												key={el}
												style={additionalFilter.numbeds.includes(el.id) ? { "backgroundColor": "#eecda3" } : null}
												onClick={() => {
													let arr = additionalFilter.numbeds
													if (!arr.includes(el.id)) {
														arr.push(el.id);
													} else {
														arr.splice(arr.indexOf(el.id), 1);
													}
													setAdditionalFilter({ ...additionalFilter, numbeds: arr })
												}}>{el.name}</div>
										})}
									</div>
									<input id="RoomNumersAsString" name="RoomNumersAsString" type="hidden" defaultValue />
								</div>
								<span className="re__listing-filter-popup-title">Hướng nhà</span>
								<div className="re__listing-search-tag-container js__listing-search-tag-container">
									<div className="re__listing-search-tag-list js__listing-search-tag-list">
										{dataCommon.getDirections.map((el) => {
											return <div className="re__listing-search-tag-list-item"
												style={additionalFilter.directionHouse.includes(el.name) ? { "backgroundColor": "#eecda3" } : null}
												key={el.name} onClick={() => {
													let arr = additionalFilter.directionHouse
													if (!arr.includes(el.name)) {
														arr.push(el.name);
													} else {
														arr.splice(arr.indexOf(el.name), 1);
													}
													setAdditionalFilter({ ...additionalFilter, directionHouse: arr })
												}}>{el.name}</div>
										})}
									</div>
									<input id="DirectionsAsString" name="DirectionsAsString" type="hidden" defaultValue />
								</div>
								<span className="re__listing-filter-popup-title">Nội dung tin có</span>
								<div className="re__listing-search-tag-container js__listing-search-tag-container">
									<div className="re__listing-search-tag-list js__listing-search-tag-list">
										<div className="re__listing-search-tag-list-item js__listing-search-tag-list-item "
											style={additionalFilter.media.includes(1) ? { "backgroundColor": "#eecda3" } : null}
											onClick={() => {
												let arr = additionalFilter.media
												if (!arr.includes(1)) {
													arr.push(1);
												} else {
													arr.splice(arr.indexOf(1), 1);
												}
												setAdditionalFilter({ ...additionalFilter, media: arr })
											}}
										>Hình ảnh</div>
										<div className="re__listing-search-tag-list-item js__listing-search-tag-list-item "
											style={additionalFilter.media.includes(2) ? { "backgroundColor": "#eecda3" } : null}
											onClick={() => {
												let arr = additionalFilter.media
												if (!arr.includes(2)) {
													arr.push(2);
												} else {
													arr.splice(arr.indexOf(2), 1);
												}
												setAdditionalFilter({ ...additionalFilter, media: arr })
											}}>Video</div>
									</div>
									<input id="MediasAsString" name="MediasAsString" type="hidden" defaultValue />
								</div>
							</div>
							<div className="re__listing-filter-popup-footer">
								<div className="re__btn re__btn-se-ghost--sm re__btn-icon-left--sm"
									onClick={() => {
										setVisible(false)
									}}>
									<i className="re__icon-refresh" />
									<span>Thoát</span>
								</div>
								<div className="re__btn re__btn-pr-solid--sm re__btn-icon-left--sm"
									onClick={() => {
										setAdditionalFilter({
											numbeds: [],
											directionHouse: [],
											media: []
										})
										setQueryParam({
											...queryParam,
											numbeds: [],
											directionHouse: [],
											media: 0
										})
									}}>
									<i className="re__icon-search--sm" />
									<span>Đặt lại</span>
								</div>
							</div>
						</div>
					</div>
				</Modal>
		}
	}
	return <div className='flex-col'>
		{renderModalContent()}
		<div id="boxSearchForm">
			<div className='container-search-form' >
				<div className="input-selection ml-12">
					<div className="input-selection-level-one" style={{ width: '100%' }}>
						<div className={`input-selection-level-second input-selection-font-focus`}>
							<input name='textSearch'
								className="placeholder input-box"
								placeholder='Tìm nhanh'
								style={{ width: "100%", height: "100%" }}
								icon={seo}
								onChange={(event) => {
									setTextSearch(event.target.value)
								}}
								value={textSearch}></input>
							<div className="icon-clear" onClick={() => {
								setQueryParam({ ...queryParam, textSearch: textSearch })
							}}>
								<img src={seo}></img>
							</div>
						</div>
					</div>
				</div>
				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={() => showModal(1)}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="-275 367 60 60"
									style={{ enableBackground: 'new -275 367 60 60' }}
									xmlSpace="preserve" width={512} height={512}><style
										type="text/css"
										dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:#FFFFFF;fill-opacity:0;}\n\t.st1{fill:#ECF4F7;}\n\t.st2{fill:#FF7474;}\n\t.st3{fill:#AAB1BA;}\n\t.st4{fill:#80D6FA;}\n\t.st5{fill:#50DD8E;}\n\t.st6{fill:#51565F;}\n" }} /><title>motel</title><desc>Created with Sketch.</desc><g id="Travel">	<g id="motel">		<g id="fill" transform="translate(1.000000, 3.000000)">			<path id="Combined-Shape" className="st1" d="M-265,421c1.1,0,2-0.9,2-2s-0.9-2-2-2c-0.4,0-0.8,0.1-1.1,0.3c-0.3-1.3-1.5-2.3-2.9-2.3     s-2.6,1-2.9,2.3c-0.3-0.2-0.7-0.3-1.1-0.3v-34h44v4h2v34H-265z" />			<path id="Fill-3" className="st2" d="M-223,367c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S-226.3,367-223,367L-223,367z" />			<path id="Combined-Shape_1_" className="st3" d="M-237,397h4v-6h-4V397z M-267,409h4v-6h-4V409z M-247,397h4v-6h-4V397z M-257,409h4     v-6h-4V409z M-257,397h4v-6h-4V397z M-267,397h4v-6h-4V397z" />			<polygon id="Fill-11" className="st4" points="-235,410 -235,419 -243,419 -243,403 -235,403    " />			<path id="Fill-14" className="st5" d="M-265,417c1.1,0,2,0.9,2,2s-0.9,2-2,2h-8c-1.1,0-2-0.9-2-2s0.9-2,2-2c0.4,0,0.8,0.1,1.1,0.3     c0.3-1.3,1.5-2.3,2.9-2.3s2.6,1,2.9,2.3C-265.8,417.1-265.4,417-265,417" />			<polygon id="Fill-2" className="st1" points="-223,383 -229,383 -229,387 -227,387 -223,387 -217,387 -217,383    " />		</g>		<path className="st6" d="M-222,424.5c-0.3,0-0.5-0.2-0.5-0.5v-33.5h-5.5c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5h5.5v-3    c-3.4-0.3-6-3.1-6-6.5c0-3.6,2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5c0,3.4-2.6,6.2-6,6.5v3h5.5c0.3,0,0.5,0.2,0.5,0.5v4    c0,0.3-0.2,0.5-0.5,0.5h-5.5V424C-221.5,424.3-221.7,424.5-222,424.5z M-222,389.5h5.5v-3h-11v3H-222z M-222,370.5    c-3,0-5.5,2.5-5.5,5.5s2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5S-219,370.5-222,370.5z M-226,424.5c-0.3,0-0.5-0.2-0.5-0.5v-1.5H-258    c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h32c0.3,0,0.5,0.2,0.5,0.5v2C-225.5,424.3-225.7,424.5-226,424.5z M-264,424.5    c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5c-0.3,0-0.6,0.1-0.8,0.2c-0.1,0.1-0.3,0.1-0.5,0    c-0.2-0.1-0.3-0.2-0.3-0.4c-0.3-1.1-1.3-1.9-2.4-1.9s-2.2,0.8-2.4,1.9c0,0.2-0.1,0.3-0.3,0.4c-0.2,0.1-0.3,0-0.5,0    c-0.2-0.2-0.5-0.2-0.8-0.2c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5    c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5c0.3,0,0.5,0,0.8,0.1c0.5-1.3,1.8-2.1,3.2-2.1s2.7,0.9,3.2,2.1c0.3-0.1,0.5-0.1,0.8-0.1    c1.4,0,2.5,1.1,2.5,2.5S-262.6,424.5-264,424.5z M-226,418.5c-0.3,0-0.5-0.2-0.5-0.5v-24c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5    v24C-225.5,418.3-225.7,418.5-226,418.5z M-234,418.5c-0.3,0-0.5-0.2-0.5-0.5v-4.5h-1.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5    h1.5v-6h-7V418c0,0.3-0.2,0.5-0.5,0.5s-0.5-0.2-0.5-0.5v-11.5h-1.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h12    c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5h-1.5V418C-233.5,418.3-233.7,418.5-234,418.5z M-272,416.5c-0.3,0-0.5-0.2-0.5-0.5v-32    c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v1.5h39.5c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5h-39.5V416    C-271.5,416.3-271.7,416.5-272,416.5z M-252,412.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6    C-251.5,412.3-251.7,412.5-252,412.5z M-255.5,411.5h3v-5h-3V411.5z M-262,412.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-6    c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6C-261.5,412.3-261.7,412.5-262,412.5z M-265.5,411.5h3v-5h-3V411.5z M-232,400.5    h-4c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6C-231.5,400.3-231.7,400.5-232,400.5z     M-235.5,399.5h3v-5h-3V399.5z M-242,400.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6    C-241.5,400.3-241.7,400.5-242,400.5z M-245.5,399.5h3v-5h-3V399.5z M-252,400.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-6    c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6C-251.5,400.3-251.7,400.5-252,400.5z M-255.5,399.5h3v-5h-3V399.5z M-262,400.5    h-4c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5v6C-261.5,400.3-261.7,400.5-262,400.5z     M-265.5,399.5h3v-5h-3V399.5z M-220,378.5c-0.3,0-0.5-0.2-0.5-0.5v-2.8l-1.1,1.1c-0.2,0.2-0.5,0.2-0.7,0l-1.1-1.1v2.8    c0,0.3-0.2,0.5-0.5,0.5s-0.5-0.2-0.5-0.5v-4c0-0.2,0.1-0.4,0.3-0.5c0.2-0.1,0.4,0,0.5,0.1l1.6,1.6l1.6-1.6    c0.1-0.1,0.4-0.2,0.5-0.1c0.2,0.1,0.3,0.3,0.3,0.5v4C-219.5,378.3-219.7,378.5-220,378.5z" />	</g></g>
								</svg>
							</div>
						</span>
						<span className="text">{!initPage ? queryParam.type.title : null}</span>
					</div>
				</button>

				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={() => showModal(2)}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg x="0px" y="0px" viewBox="0 0 297.5 297.5" style={{ enableBackground: 'new 0 0 297.5 297.5' }} xmlSpace="preserve"><g>	<g id="XMLID_47_">		<g>			<path style={{ fill: '#F4AF30' }} d="M111.3,116.27h74.91c-4.12,16.86-19.35,29.41-37.46,29.41
				C130.65,145.68,115.42,133.13,111.3,116.27z" />			<path style={{ fill: '#F4AF30' }} d="M240.36,243.44c14.079,5.59,15.59,10.06,15.609,10.06c-0.14,0.75-1.649,2.82-5.99,5.49
				c-4.34,2.68-11.529,5.939-23.029,9.06c-21.061,5.72-48.83,8.87-78.2,8.87c-29.36,0-57.13-3.15-78.19-8.87
				c-23-6.24-28.75-13.06-29.029-14.45c0.01-0.04,1.449-4.529,15.609-10.159c11.49-4.561,27.16-8.171,45.431-10.48
				c21.479,19.22,40.14,30.22,41.05,30.76c1.59,0.931,3.359,1.391,5.13,1.391c1.78,0,3.55-0.46,5.13-1.391
				c0.92-0.54,19.57-11.54,41.06-30.76C213.21,235.27,228.88,238.88,240.36,243.44z" />			<path style={{ fill: '#AE9676' }} d="M123.41,95.02c5.05,0,9.14-4.1,9.14-9.149V63.39c0-5.05-4.09-9.149-9.14-9.149
				c-5.061,0-9.15,4.1-9.15,9.149V85.87C114.26,90.92,118.35,95.02,123.41,95.02z M196.45,97.98H101.06
				c-5.059,0-9.149,4.1-9.149,9.149c0,23.8,14.71,44.22,35.51,52.67H98.45c-5.05,0-9.15,4.101-9.15,9.15
				c0,5.05,4.101,9.14,9.15,9.14H199.06c5.051,0,9.141-4.09,9.141-9.14c0-5.05-4.09-9.15-9.141-9.15h-28.98
				c20.8-8.45,35.51-28.87,35.51-52.67C205.59,102.08,201.5,97.98,196.45,97.98z M174.1,95.02c5.051,0,9.15-4.1,9.15-9.149V63.39
				c0-5.05-4.1-9.149-9.15-9.149c-5.05,0-9.149,4.1-9.149,9.149V85.87C164.95,90.92,169.05,95.02,174.1,95.02z M148.75,20.58
				c50.16,0,90.96,40.8,90.96,90.95c0,66.84-71.03,118.279-90.96,131.399C128.82,229.81,57.8,178.37,57.8,111.53
				C57.8,61.38,98.6,20.58,148.75,20.58z M157.9,73.2V50.72c0-5.05-4.101-9.149-9.15-9.149c-5.05,0-9.14,4.1-9.14,9.149V73.2
				c0,5.05,4.09,9.14,9.14,9.14C153.8,82.34,157.9,78.25,157.9,73.2z" />			<path d="M276.29,253.55c0,14.311-14.04,25.57-41.75,33.49c-23.05,6.58-53.521,10.21-85.79,10.21c-32.27,0-62.73-3.63-85.79-10.21
				c-27.7-7.92-41.75-19.18-41.75-33.49c0-22.37,34.11-33.22,63.191-38.399C53.66,181.99,37.47,146.32,37.47,111.53
				c0-61.36,49.92-111.28,111.28-111.28c61.36,0,111.28,49.92,111.28,111.28c0,34.79-16.19,70.46-46.92,103.62
				C242.18,220.33,276.29,231.18,276.29,253.55z M255.97,253.5c-0.02,0-1.53-4.47-15.609-10.06
				c-11.48-4.561-27.15-8.171-45.421-10.48c-21.489,19.22-40.14,30.22-41.06,30.76c-1.58,0.931-3.35,1.391-5.13,1.391
				c-1.77,0-3.54-0.46-5.13-1.391c-0.91-0.54-19.57-11.54-41.05-30.76c-18.271,2.309-33.94,5.92-45.431,10.48
				c-14.16,5.63-15.6,10.119-15.609,10.159c0.279,1.391,6.029,8.21,29.029,14.45c21.061,5.72,48.83,8.87,78.19,8.87
				c29.37,0,57.14-3.15,78.2-8.87c11.5-3.12,18.689-6.38,23.029-9.06C254.32,256.32,255.83,254.25,255.97,253.5z M239.71,111.53
				c0-50.15-40.8-90.95-90.96-90.95c-50.15,0-90.95,40.8-90.95,90.95c0,66.84,71.02,118.279,90.95,131.399
				C168.68,229.81,239.71,178.37,239.71,111.53z" />			<path d="M199.06,159.8c5.051,0,9.141,4.101,9.141,9.15c0,5.05-4.09,9.14-9.141,9.14H98.45c-5.05,0-9.15-4.09-9.15-9.14
				c0-5.05,4.101-9.15,9.15-9.15h28.97c-20.8-8.45-35.51-28.87-35.51-52.67c0-5.05,4.09-9.149,9.149-9.149h95.391
				c5.05,0,9.14,4.1,9.14,9.149c0,23.8-14.71,44.22-35.51,52.67H199.06z M186.21,116.27H111.3c4.12,16.86,19.351,29.41,37.45,29.41
				C166.86,145.68,182.09,133.13,186.21,116.27z" />			<path d="M183.25,63.39V85.87c0,5.05-4.1,9.149-9.15,9.149c-5.05,0-9.149-4.1-9.149-9.149V63.39c0-5.05,4.1-9.149,9.149-9.149
				C179.15,54.24,183.25,58.34,183.25,63.39z" />			<path d="M157.9,50.72V73.2c0,5.05-4.101,9.14-9.15,9.14c-5.05,0-9.14-4.09-9.14-9.14V50.72c0-5.05,4.09-9.149,9.14-9.149
				C153.8,41.57,157.9,45.67,157.9,50.72z" />			<path d="M132.55,63.39V85.87c0,5.05-4.09,9.149-9.14,9.149c-5.061,0-9.15-4.1-9.15-9.149V63.39c0-5.05,4.09-9.149,9.15-9.149
				C128.46,54.24,132.55,58.34,132.55,63.39z" />		</g>		<g></g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
								</svg>
							</div>
						</span>
						<span className="text">{!initPage ? (queryParam.ward.title.length !== 0
							? queryParam.ward.title : queryParam.district.title.length !== 0
								? queryParam.district.title : queryParam.province.title) : null}</span>
					</div>
				</button>
				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={() => showModal(3)}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><path style={{ fill: '#BDBCBC' }} d="M153.768,37.436v116.212c0,4.416-3.58,7.996-7.996,7.996H60.479c-4.416,0-7.996-3.58-7.996-7.996
	V37.436C52.483,37.436,153.768,37.436,153.768,37.436z" /><path style={{ fill: '#A7A6A6' }} d="M81.802,37.436v124.208H60.479c-4.416,0-7.996-3.58-7.996-7.996V37.436
	C52.483,37.436,81.802,37.436,81.802,37.436z" /><path style={{ fill: '#E9E9E9' }} d="M43.42,0.653h119.41c4.416,0,7.996,3.58,7.996,7.996v34.117c0,4.416-3.58,7.996-7.996,7.996H43.42
	c-4.416,0-7.996-3.58-7.996-7.996V8.65C35.424,4.234,39.004,0.653,43.42,0.653z" /><path style={{ fill: '#6DDAE1' }} d="M508.836,189.924L261.486,2.279c-2.857-2.168-6.809-2.168-9.665,0L4.471,189.924
	c-2.736,2.075-3.841,5.666-2.746,8.92c1.095,3.255,4.145,5.447,7.578,5.447h38.915V503.35c0,4.416,3.58,7.996,7.996,7.996h400.878
	c4.416,0,7.996-3.58,7.996-7.996V204.291h38.915c3.434,0,6.484-2.192,7.578-5.447C512.677,195.59,511.571,191.999,508.836,189.924z" /><path style={{ fill: '#4FC4D4' }} d="M4.47,189.924c-2.736,2.075-3.841,5.666-2.746,8.92c1.095,3.255,4.145,5.447,7.578,5.447h38.915
	V503.35c0,4.416,3.58,7.996,7.996,7.996h25.588V131.259L4.47,189.924z" /><path style={{ fill: '#C4DF64' }} d="M491.21,26.241h-76.764c-6.97,0-10.589,8.716-5.654,13.65l23.623,23.623l-111.989,100.79
	l-18.024-18.022c-9.107-9.108-23.678-9.425-33.173-0.722l-85.421,78.302l-9.347-9.346c-8.898-8.901-23.29-9.379-32.764-1.087
	L2.689,335.28c-3.426,3.003-3.605,8.446-0.383,11.667l22.667,22.667c2.939,2.939,7.799,3.1,10.926,0.358l120.515-105.657
	l9.713,9.713c9.107,9.107,23.677,9.424,33.173,0.722l85.421-78.302l17.876,17.875c9.024,9.025,23.524,9.407,33.011,0.869
	l130.78-117.703l19.169,19.169c4.934,4.935,13.65,1.316,13.65-5.654V34.239C499.206,29.822,495.626,26.241,491.21,26.241z" /><path style={{ fill: '#FFD791' }} d="M256.653,290.65c-46.736,0-84.76,38.024-84.76,84.76s38.024,84.76,84.76,84.76
	s84.76-38.024,84.76-84.76S303.39,290.65,256.653,290.65z" /><path style={{ fill: '#F8BE73' }} d="M275.844,440.979c-46.736,0-84.76-38.024-84.76-84.76c0-18.48,5.963-35.585,16.04-49.529
	c-21.32,15.409-35.231,40.463-35.231,68.72c0,46.736,38.024,84.76,84.76,84.76c28.257,0,53.31-13.911,68.72-35.231
	C311.429,435.017,294.324,440.979,275.844,440.979z" /><path style={{ fill: '#96CA62' }} d="M271.58,367.414h-6.93v-22.389h17.592c4.416,0,7.996-3.58,7.996-7.996s-3.58-7.996-7.996-7.996
	H264.65v-9.062c0-4.416-3.58-7.996-7.996-7.996c-4.416,0-7.996,3.58-7.996,7.996v9.062h-6.93c-10.287,0-18.658,8.37-18.658,18.658
	v17.059c0,10.287,8.37,18.658,18.658,18.658h6.93v22.389h-17.592c-4.416,0-7.996,3.58-7.996,7.996s3.58,7.996,7.996,7.996h17.592
	v9.062c0,4.416,3.58,7.996,7.996,7.996c4.416,0,7.996-3.58,7.996-7.996v-9.062h6.93c10.287,0,18.658-8.37,18.658-18.658v-17.059
	C290.238,375.785,281.867,367.414,271.58,367.414z M241.727,367.414c-1.469,0-2.665-1.196-2.665-2.665V347.69
	c0-1.469,1.196-2.665,2.665-2.665h6.93v22.389H241.727z M274.245,403.131c0,1.469-1.196,2.665-2.665,2.665h-6.93v-22.389h6.93
	c1.469,0,2.665,1.196,2.665,2.665V403.131z" /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g />
								</svg>
							</div>
						</span>
						<span className="text">Mức giá {!initPage ? queryParam.priceFrom / 1000000 : null}tr - {!initPage ? queryParam.priceTo / 1000000 : null}tr</span>
					</div>
				</button>
				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={() => showModal(4)}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><circle style={{ fill: '#00CC96' }} cx={256} cy={256} r={256} /><path style={{ fill: '#07B587' }} d="M276.77,511.34L143.578,377.983l-7.089-16.979L108.96,318.97l-12.364-58.024l8.242-51.761
	l24.067-52.915l56.376-42.529l58.024-16.979l58.024,6.099l77.641,40.387l132.204,132.368
	c-9.396,125.445-109.29,225.67-234.571,235.725L276.77,511.34L276.77,511.34z" /><path style={{ fill: '#E84F4F' }} d="M131.214,366.115c-25.88-29.341-41.705-67.915-41.705-110.114
	c0-65.277,37.419-121.654,92.146-149.018L256,256L131.214,366.115z" /><path style={{ fill: '#FFFFFF' }} d="M256,89.674c91.982,0,166.491,74.509,166.491,166.491S347.982,422.655,256,422.655
	S89.509,348.147,89.509,256.165S164.018,89.674,256,89.674z M263.253,106.818v43.848c52.584,3.626,94.62,45.661,98.246,98.246
	h43.848C401.721,172.095,340.07,110.445,263.253,106.818z M263.253,164.348v50.937c17.144,2.967,30.661,16.484,33.628,33.628h50.937
	C344.356,203.91,308.42,167.809,263.253,164.348z M263.253,228.307v20.605h20.605C281.221,238.857,273.308,230.945,263.253,228.307z
	 M405.347,263.253h-43.848c-3.626,52.584-45.661,94.62-98.246,98.246v43.848C340.07,401.721,401.721,340.07,405.347,263.253z
	 M347.817,263.253H296.88c-2.967,17.144-16.484,30.661-33.628,33.628v50.937C308.255,344.356,344.356,308.42,347.817,263.253z
	 M283.858,263.253h-20.605v20.605C273.308,281.221,281.221,273.308,283.858,263.253z M248.912,405.347v-43.848
	c-52.584-3.626-94.62-45.661-98.246-98.246h-43.848C110.445,340.07,172.095,401.721,248.912,405.347z M248.912,347.817V296.88
	c-17.144-2.967-30.661-16.484-33.628-33.628h-50.937C167.809,308.255,203.745,344.356,248.912,347.817z M248.912,283.858v-20.605
	h-20.605C230.945,273.308,238.857,281.221,248.912,283.858z M106.818,248.912h43.848c3.626-52.584,45.661-94.62,98.246-98.246
	v-43.848C172.095,110.445,110.445,172.095,106.818,248.912z M164.348,248.912h50.937c2.967-17.144,16.484-30.661,33.628-33.628
	v-50.937C203.91,167.809,167.809,203.745,164.348,248.912z M228.307,248.912h20.605v-20.605
	C238.857,230.945,230.945,238.857,228.307,248.912z" /><circle style={{ fill: '#E84F4F' }} cx="327.207" cy="325.565" r="18.627" /><path style={{ fill: '#E1E5E6' }} d="M299.519,297.87h17.639v3.957h-13.683v13.682h-3.957V297.87H299.519z M337.267,297.87h17.639v17.639
	h-3.957v-13.682h-13.682V297.87z M354.906,335.619v17.639h-17.639V349.3h13.682v-13.682H354.906z M317.156,353.257h-17.639v-17.639
	h3.957V349.3h13.682V353.257z" /><circle style={{ fill: '#E84F4F' }} cx="308.589" cy="169.789" r="18.627" /><path style={{ fill: '#E1E5E6' }} d="M280.726,142.094h17.639v3.956h-13.682v13.682h-3.956v-17.638H280.726z M318.476,142.094h17.639
	v17.639h-3.957v-13.682h-13.682V142.094z M336.113,179.843v17.639h-17.639v-3.956h13.682v-13.682L336.113,179.843L336.113,179.843z
	 M298.365,197.481h-17.639v-17.639h3.956v13.682h13.682v3.957H298.365z" /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g />
								</svg>
							</div>
						</span>
						<span className="text">Diện tích {!initPage ? queryParam.areaFrom : null}m² - {!initPage ? queryParam.areaTo : null}m²</span>
					</div>
				</button>
				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={() => showModal(5)}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><path style={{ fill: '#1E0478' }} d="M512,77.649v37.477c0,17.555-14.286,31.841-31.841,31.841H465.65L301.087,311.52v75.495
	c0,2.823-1.114,5.519-3.099,7.504l-68.564,68.564c-2.027,2.027-4.744,3.11-7.504,3.11c-1.369,0-2.749-0.265-4.065-0.807
	c-3.959-1.645-6.549-5.519-6.549-9.807V311.52L46.742,146.966H31.841C14.286,146.966,0,132.681,0,115.126V77.649
	c0-17.555,14.286-31.841,31.841-31.841h448.318C497.714,45.808,512,60.094,512,77.649z M490.773,115.126V77.649
	c0-5.848-4.766-10.614-10.614-10.614H31.841c-5.859,0-10.614,4.766-10.614,10.614v37.477c0,5.848,4.755,10.614,10.614,10.614
	h448.318C486.007,125.739,490.773,120.974,490.773,115.126z M282.969,299.622l152.655-152.655H76.768l152.655,152.655
	c2.08,2.08,3.12,4.808,3.11,7.536v122.799l47.326-47.337v-75.399C279.838,304.472,280.868,301.713,282.969,299.622z" /><path style={{ fill: '#9B8CCC' }} d="M490.773,77.649v37.477c0,5.848-4.766,10.614-10.614,10.614H31.841
	c-5.859,0-10.614-4.766-10.614-10.614V77.649c0-5.848,4.755-10.614,10.614-10.614h448.318
	C486.007,67.035,490.773,71.801,490.773,77.649z" /><path style={{ fill: '#94E7EF' }} d="M435.625,146.966L282.969,299.622c-2.102,2.091-3.131,4.85-3.11,7.599v75.399l-47.326,47.337V307.158
	c0.011-2.728-1.03-5.455-3.11-7.536L76.768,146.966H435.625z" /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g />
								</svg>
							</div>
						</span>
						<span className="text">Lọc thêm</span>
					</div>
				</button>
				<div className="re__filter-wall"></div>
				<button className='btn-export ml-12' onClick={resetQueryParam}>
					<div className="wrapper-text">
						<span className="icon">
							<div>
								<svg x="0px" y="0px" viewBox="0 0 496.158 496.158" style={{ enableBackground: 'new 0 0 496.158 496.158' }} xmlSpace="preserve"><path style={{ fill: '#EB9783' }} d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085
	c0,137.002,111.07,248.07,248.082,248.07C385.088,496.155,496.158,385.087,496.158,248.085z" /><g>	<path style={{ fill: '#D63232' }} d="M373.299,154.891c-19.558-26.212-47.401-46.023-78.401-55.787c-0.759-0.238-1.588-0.103-2.229,0.369
		c-0.643,0.471-1.021,1.22-1.021,2.016l0.16,40.256c0,1.074,0.514,2.06,1.332,2.562c31.732,19.456,66.504,47,66.504,103.237
		c0,61.515-50.047,111.56-111.562,111.56c-61.517,0-111.566-50.045-111.566-111.56c0-58.737,35.199-84.661,67.615-103.917
		c0.836-0.496,1.363-1.492,1.363-2.58l0.154-39.909c0-0.793-0.375-1.539-1.013-2.01c-0.638-0.472-1.46-0.611-2.219-0.381
		c-31.283,9.586-59.41,29.357-79.202,55.672c-20.467,27.215-31.285,59.603-31.285,93.662c0,86.099,70.049,156.146,156.152,156.146
		c86.1,0,156.147-70.047,156.147-156.146C404.228,214.235,393.533,182.01,373.299,154.891z" />	<path style={{ fill: '#D63232' }} d="M251.851,67.009h-7.549c-11.788,0-21.378,9.59-21.378,21.377v181.189
		c0,11.787,9.59,21.377,21.378,21.377h7.549c11.788,0,21.378-9.59,21.378-21.377V88.386
		C273.229,76.599,263.64,67.009,251.851,67.009z" /></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g />
								</svg>
							</div>
						</span>
						<span className="text">Đặt lại</span>
					</div>
				</button>
			</div>
		</div>
		<div className='main-content'>
			<MenuNewsCard queryParam={queryParam}
				initPage={initPage}
				sortMode={sortMode}
				chooseSortMode={(mode, field) => { setQueryParam({ ...queryParam, mode: mode, field: field }) }}
				choosePage={(pageNo) => { setQueryParam({ ...queryParam, pageNo: pageNo }) }}
				postType={location.pathname}></MenuNewsCard>
			<div className='main-content-right'>
				<SideFilterBox title='Lọc theo khoảng giá'>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=0&priceTo=1000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>Dưới 1 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=1000000&priceTo=3000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>1 - 3 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=3000000&priceTo=5000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>3 - 5 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=5000000&priceTo=10000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>5 - 10 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=10000000&priceTo=40000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>10 - 40 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=40000000&priceTo=70000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>40 - 70 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=70000000&priceTo=100000000&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>70 - 100 triệu</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=100000000&priceTo=100000001&areaFrom=${queryParam.areaFrom}&areaTo=${queryParam.areaTo}`}>Trên 100 triệu</Link>
					</h3>
				</SideFilterBox>
				<SideFilterBox title='Lọc theo diện tích'>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=0&areaTo=30`}>Dưới 30 m²</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=30&areaTo=50`}>30 - 50 m²</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=50&areaTo=80`}>50 - 80 m²</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=80&areaTo=100`}>80 - 100 m²</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=100&areaTo=150`}>100 - 150 m²</Link>
					</h3>
					<h3 className="re__sidebar-box-item">
						<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${queryParam.province.value}&district=${queryParam.district.value}&ward=${queryParam.ward.value}&priceFrom=${queryParam.priceFrom}&priceTo=${queryParam.priceTo}&areaFrom=150&areaTo=151`}>Trên 150 m²</Link>
					</h3>
				</SideFilterBox>
				<SideFilterBox title='Cho thuê theo địa chỉ'>
					{countNewsOfProvince.map((el, i) => {
						return <h3 className="re__sidebar-box-item" key={i}>
							<Link className="re__link-se" to={`${location.pathname}?pageNo=1&pageSize=${queryParam.pageSize}&mode=${queryParam.mode}&sort=${queryParam.field}&type=${queryParam.type.value}&province=${el.province}&district=&ward=&priceFrom=0&priceTo=100000000&areaFrom=0&areaTo=1000`}>{el.province} ({el.count})</Link>
						</h3>
					})}
				</SideFilterBox>
			</div>
		</div >
	</div >
}

export default ShowNewsInfor;