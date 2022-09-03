import { Fragment, useEffect, useState } from "react"
import InputBox from "../../components/common/InputBox/InputBox"
import { inputConstant } from "../../constant/inputConstant"
import { PostNewsService } from "./../../service/PostNewsService"
import './CreatePost.css'
import { AddressApiService } from "../../service/AddressApiService"
import { formatCommon } from "../../common/format.common"
import { TypeAccomodationConstant } from "../../constant/TypeAccomodationConstant"
import MapContainer from "../../components/common/Map/MapContainer"
import { MapConstant } from "../../constant/MapConstant"
import { dataCommon } from "../../common/data.common"
import { useDispatch } from "react-redux"
import { message } from "../../action/message"
import rotation from '../../assets/rotation.png'
import cancel from '../../assets/cancel.png'
import moment from "moment"
import Modal from "antd/lib/modal/Modal"

const CreatePost = () => {
	const [typesOfAcc, setTypeOffAcc] = useState([])
	const [expenses, setExpenses] = useState([])
	const [getAllProvinces, setGetAllProvinces] = useState([{ id: 0, name: '' }])
	const [getAllDistrictByProvinceId, setGetAllDistrictByProvinceId] = useState([{ id: 0, name: '' }])
	const [getAllWardByDistrictId, setGetAllWardByDistrictId] = useState([{ id: 0, name: '' }])
	const [visible, setVisible] = useState(false)
	const [getDiscouts, setDiscounts] = useState([])
	const [currentUser, setCurrentUser] = useState({
		fullname: '',
		phone: '',
		address: '',
		email: ''
	})
	const [postNews, setPostNews] = useState({
		typesOfAcc: '',
		province: '',
		district: '',
		ward: '',
		street: '',
		title: '',
		description: '',
		area: 0,
		price: '',
		address: '',
		numOfBed: 0,
		numOfToilet: 0,
		numOfFloor: 0,
		floorNumber: 0,
		furniture: '',
		internet: false,
		parking: false,
		balcony: false,
		airConditioner: false,
		heater: false,
		title: '',
		description: '',
		images: [],
		videos: []
	})
	const [cost, setCost] = useState({
		typeOfPost: '',
		numDatePost: 0,
		startedDate: new Date(),
		discount: ''
	})
	const dispatch = useDispatch();
	const [rollImage, setRollImage] = useState({ number: 0, name: '' })

	useEffect(() => {
		PostNewsService.getTypeOfAcc()
			.then((response) => {
				setTypeOffAcc(response.data)
			})
		AddressApiService.getAllProvince().then((data) => {
			setGetAllProvinces(data)
		})
		PostNewsService.getCurrentUserInfor().then((data) => {
			setCurrentUser(data)
		})
		PostNewsService.getExpenses().then((data) => {
			const convert = data.map((el) => {
				return { ...el, name: el.type }
			})
			setExpenses(convert)
		})
	}, [])

	const handleGetValue = (target) => {
		let newArr = [];
		switch (target.nameOfinput) {
			case 'province':
				const existsProvince = getAllProvinces.filter((el) => {
					return el.name === target.value
				})
				if (existsProvince.length !== 0) {
					AddressApiService.getAllDistricByProvinceId(target.id).then((data) => {
						setGetAllDistrictByProvinceId(data)
					})
				}
				break
			case 'district':
				const existsDistrict = getAllDistrictByProvinceId.filter((el) => {
					return el.name === target.value
				})
				if (existsDistrict.length !== 0) {
					AddressApiService.getAllWardByDistrictId(target.id).then((data) => {
						setGetAllWardByDistrictId(data)
					})
				}
				break
			case 'video-add':
				if (target.value) {
					newArr = postNews.videos.concat(target.value)
				}
				setPostNews({
					...postNews,
					'videos': newArr
				})
				return
			case 'video-close':
				newArr = postNews.videos.filter((el, index) => {
					return target.index !== index
				})
				setPostNews({
					...postNews,
					'videos': newArr
				})
				return
		}
		console.log(target.value)
		setPostNews({
			...postNews,
			address: formatCommon.combineComponentOfAddress(postNews.province, postNews.district,
				postNews.ward, postNews.street),
			[target.nameOfinput]: target.value
		})
	}

	const showModal = () => {
		setVisible(true)
	}

	const handleCancel = e => {
		setVisible(false)
	};

	const handleSetImages = (target) => {

		// check new image upload is exist of old images
		for (let i = 0; i < target.value.length; i++) {
			for (let j = 0; j < postNews.images.length; j++) {
				if (postNews.images[j].name === target.value[i].name) {
					dispatch(message.error(true, 'Vui lòng không tải ảnh lên giống nhau'))
					return
				}
			}
		}

		// handle if new image is not exist
		const newFiles = postNews.images.concat(target.value)
		setPostNews({
			...postNews,
			[target.nameOfinput]: newFiles
		})
	}

	const getDiscountPrice = () => {
		const arrFillter = getDiscouts.filter((el) => {
			return el.code === cost.discount
		})
		if (arrFillter[0]) {
			const total = handleCaculatedTotalAmount()
			const discount = parseFloat(formatCommon.convertStringNumricToNumber(total) * arrFillter[0].percent) / 100
			console.log(discount)
			if (discount > arrFillter[0].price) {
				return arrFillter[0].price
			} else {
				return discount
			}
		}
		return ''
	}

	const handleCaculatedTotalAmount = () => {
		const type = expenses.filter((el) => {
			return el.id === cost.typeOfPost
		})
		if (type[0]) {
			return type[0].cost * cost.numDatePost
		}
		return ''
	}

	const finalTotalAmountNeeded = () => {
		return handleCaculatedTotalAmount() - getDiscountPrice()
	}

	const handlePreviewImage = () => {
		return postNews.images.map((image) => {
			let objImage = URL.createObjectURL(image)
			return <div className="wrapper-image-item"
				style={{ marginRight: '4px', marginLeft: '4px', marginBottom: '16px' }}
				key={image.name}>
				<div className="image-item">
					<div className="image">
						<img src={objImage}
							style={{ height: '100%', width: 'auto', transform: `rotate(${image.name === rollImage.name ? rollImage.number : 0}deg)` }} />
					</div>
					<div className="user-controll">
						{/* <button style={{ marginRight: '4px' }}>
							<img src={rotation} onClick={(event)=>rotationImage(event, image.name)}></img>
						</button> */}
						<button>
							<img src={cancel} onClick={(event) => cancelImage(event, image.name)}></img>
						</button>
					</div>
				</div>
			</div>
		})
	}

	const cancelImage = (event, image) => {
		let newArr = postNews.images.filter((el) => {
			return el.name !== image
		})
		setPostNews({
			...postNews,
			images: newArr
		})
	}

	const rotationImage = (event, image) => {
		let newRotation = rollImage.number + 90;
		if (newRotation >= 360) {
			newRotation = - 360;
		}
		setRollImage({ number: newRotation, name: image })
	}

	const handleUpdateVideo = (target) => {

	}

	const handleCaculatedCost = (target) => {
		console.log(target)
		if (target.nameOfinput === 'typeOfPost') {
			PostNewsService.getDiscountOfExpense(target.id).then((data) => {
				setDiscounts(data)
			})
			setCost({
				...cost,
				[target.nameOfinput || target.target.name]: target.id
			})
			return
		}
		setCost({
			...cost,
			[target.nameOfinput || target.target.name]: target.value || target.target.value
		})
	}


	console.log('Thông tin post')
	console.log(postNews)
	console.log('Phi bai viet')
	console.log(cost)
	return <Fragment>
		<div className="left-bar">

		</div>
		<div className="right-bar">
			<div className="container-right-bar">
				<div className="ant-row wrap-table">
					<div className="ant-col first-col">
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Thông tin cơ bản</h3>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Loại bất động sản
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.DROP_DOWN_LIST}
														placeholder={`Chọn loại tin`}
														data={typesOfAcc}
														getValueDropList={handleGetValue}
														name='typesOfAcc'
														onChange={handleGetValue}
														value={postNews.typesOfAcc}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Tỉnh, thành phố
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_SEARCH}
														placeholder={`Chọn tỉnh`}
														data={getAllProvinces.filter((item) => {
															return item.name.toLowerCase().includes(postNews.province.toLowerCase())
														})}
														getValueDropList={handleGetValue}
														name='province'
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Quận, huyện
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_SEARCH}
														placeholder={`Chọn huyện`}
														data={getAllDistrictByProvinceId.filter((item) => {
															return item.name.toLowerCase().includes(postNews.district.toLowerCase())
														})}
														getValueDropList={handleGetValue}
														name='district'
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-8 note">
									Vui lòng chọn giá trị khác trong danh sách.
								</div>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Phường, xã
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_SEARCH}
														placeholder={`Chọn xã`}
														data={getAllWardByDistrictId.filter((item) => {
															return item.name.toLowerCase().includes(postNews.ward.toLowerCase())
														})}
														getValueDropList={handleGetValue}
														name='ward'
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Đường, số nhà
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tên đường, số nhà`}
														name='street'
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-8 note">
									Vui lòng chọn giá trị trong danh sách.
								</div>
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Địa chỉ hiển thị trên bài viết
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														onChange={handleGetValue}
														name='address'
														type='text'
														value={formatCommon.combineComponentOfAddress(postNews.province, postNews.district, postNews.ward, postNews.street)}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Vị trí bất động sản thực tế
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<MapContainer location={{ lat: MapConstant.lat, lng: MapConstant.lng }}
														zoomLevel={MapConstant.ZOOM}
														// handlerLocation={'handlerLocationSelect'}
														address={formatCommon.combineComponentOfAddress(postNews.province, postNews.district, postNews.ward, postNews.street)}
													>
													</MapContainer>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Thông tin bài viết</h3>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Tiêu đề
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_BIG_BOX}
														placeholder={`VD: Cho thuê phòng trọ gần...Tối thiểu 30 ký tự, tối đa 100 ký tự`}
														onChange={handleGetValue}
														name='title'
														maxlength="100" minlength="30"
														row='2'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Mô tả
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_BIG_BOX}
														placeholder={`VD: Thông tin về bất động sản: giờ giấc, vị trí thuận lợi, mô tả không gian bất động sản.... Tối thiểu 300 ký tự, tối đa 10000 ký tự`}
														onChange={handleGetValue}
														name='description'
														maxlength="10000" minlength="300" row={8}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Thông tin bất động sản</h3>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Tên tòa nhà, nhà ở, khu trọ
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tên bất động sản`}
														onChange={handleGetValue}
														name='tower'
														type='text'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Diện tích
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập diện tích VD: 20, 25, 30, ...`}
														onChange={handleGetValue}
														name='area'
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Giá cho thuê VND/Tháng
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập giá VD: 2.500.000, 3.000.000, 5.000.000,...`}
														onChange={handleGetValue}
														name='price'
														type='text'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								{(postNews.typesOfAcc === TypeAccomodationConstant.HOUSE || postNews.typesOfAcc === TypeAccomodationConstant.APARTMENT) ? <div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Số phòng ngủ
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														data={getAllWardByDistrictId}
														placeholder={'Nhập số lượng phòng ngủ'}
														name='numOfBed'
														onChange={handleGetValue}
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Số phòng vệ sinh
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập số lượng phòng ngủ`}
														name='numOfToilet'
														onChange={handleGetValue}
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div> : <Fragment></Fragment>}
								{(postNews.typesOfAcc === TypeAccomodationConstant.HOUSE || postNews.typesOfAcc === TypeAccomodationConstant.APARTMENT) ? <div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Số tầng
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														data={getAllWardByDistrictId}
														placeholder={'Nhập số tầng'}
														name='numOfFloor'
														onChange={handleGetValue}
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Thuộc tầng số
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tầng số đang ở`}
														name='floorNumber'
														onChange={handleGetValue}
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div> : <Fragment></Fragment>}
								{(postNews.typesOfAcc === TypeAccomodationConstant.HOUSE || postNews.typesOfAcc === TypeAccomodationConstant.APARTMENT) ? <div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Hướng nhà
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.DROP_DOWN_LIST}
														placeholder={`Chọn hướng nhà`}
														data={dataCommon.getDirections}
														getValueDropList={handleGetValue}
														name='directionHouse'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Hướng ban công
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.DROP_DOWN_LIST}
														placeholder={`Chọn hướng ban công`}
														data={dataCommon.getDirections}
														getValueDropList={handleGetValue}
														name='directionBalcony'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div> : <Fragment></Fragment>}
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col mt-16">
											<div className="title-index">
												Tiện ích
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<div style={{ "display": "flex" }}>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Internet'}
															name={'internet'}
															onChange={handleGetValue}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Bãi đổ xe'}
															name={'parking'}
															onChange={handleGetValue}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Ban công'}
															name={'balcony'}
															onChange={handleGetValue}></InputBox>
													</div>
													<div style={{ "display": "flex", "marginTop": "8px" }}>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Điều hòa'}
															name={'airConditioner'}
															onChange={handleGetValue}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Máy nóng lạnh'}
															name={'heater'}
															onChange={handleGetValue}></InputBox>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col mt-16">
											<div className="title-index">
												Tình trạng nội thất
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`VD: Tủ lạnh, máy giặt, bồn rửa chén,...`}
														onChange={handleGetValue}
														name='tower'
														type='text'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Hình ảnh & Video đính kèm</h3>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="label-input">
												Đăng tải ảnh
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<InputBox mode={inputConstant.MEDIA_BOX}
												name='images'
												onChange={handleSetImages}></InputBox>
										</div>
										<div className="preview-images">
											{handlePreviewImage()}
										</div>
									</div>
								</div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="label-input">
												Đính kèm link video youtube
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`VD: https://www.youtube.com/watch?v=PRMZtf8WTgg`}
														addItem={handleGetValue}
														onChange={handleUpdateVideo}
														name='video-add'
														type='text'></InputBox>
												</div>
											</div>

											{postNews.videos.map((el, index) => {
												if (el.length !== 0) {
													return <Fragment>
														<div className="m-t-16"></div>
														<div className="input-selection">
															<div className="input-selection-level-one" style={{ width: '100%' }}>
																<InputBox mode={inputConstant.INPUT_TEXT_BOX}
																	name='video-close'
																	type='text'
																	value={{ el, index }}
																	onChange={handleGetValue}
																	disable={true}></InputBox>
															</div>
														</div></Fragment>
												}
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Thông tin liên hệ</h3>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Tên người đăng
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														name='author'
														value={currentUser.fullname}></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Số điện thoại
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														value={currentUser.phone}
														name='phone'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Địa chỉ
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														name='addressOfAuthor'
														value={currentUser.address ? currentUser.address : 'Cập nhật thông tin'}
														type='text'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Email
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														value={currentUser.email ? currentUser.email : 'Cập nhật thông tin'}
														name='email'></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="footer-button">
							<div class="wrap-button">
								<div>
									<div class="flex-between">
										<button data-tracking-id="preview-listing-lcp" type="border" color="secondary" class="sc-kIeTtH bOmeuB">
											<div class="sc-hOqqkJ bKiBMa"><span type="primary" class="sc-TmcTc dUUUwk">Thoát</span></div>
										</button>
										<button data-tracking-id="submit-checkout-lcp" id="save-button" type="solid" color="primary" class="sc-kIeTtH jYwsoP">
											<div class="sc-hOqqkJ bKiBMa">
												<span type="primary" class="sc-TmcTc dUUUwk">Tạo bài viết</span>
												<span class="sc-dacFzL jBNrga">
													<div class="sc-jUEnpm cCSKON">
														<svg font-size="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path xmlns="http://www.w3.org/2000/svg" d="M9 20L17 12L9 4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
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
					<div className="ant-col second-col">
						<div className="second-col-wrapp">
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Chi phí tin đăng</h3>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Loại tin đăng
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.DROP_DOWN_LIST}
														placeholder={`Chọn loại tin`}
														data={expenses}
														getValueDropList={handleCaculatedCost}
														name='typeOfPost'
														onChange={handleCaculatedCost}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Số ngày đăng
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập số`}
														name='numDatePost'
														onChange={handleCaculatedCost}
														type='number'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Ngày bắt đầu
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.CALENDAR_BOX}
														placeholder={`Default date`}
														name='startedDate'
														onChange={handleCaculatedCost}
														value={cost.startedDate}></InputBox>
												</div>
											</div>
										</div>
										<div className="mt-8 note">
											{`Ngày kết thúc ${formatCommon.addDate(cost.startedDate, cost.numDatePost)}`}
										</div>
									</div>
								</div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Khuyến mãi
											</div>
											<div className="wrapp-text">
												<div className="div-text">
													<div className="kniKCh">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path fillRule="evenodd" clipRule="evenodd" d="M2.00001 2.3501C1.64102 2.3501 1.35001 2.64111 1.35001 3.0001V6.1251C1.35001 6.48408 1.64102 6.7751 2.00001 6.7751C2.48801 6.7751 2.98637 7.21066 2.98637 8.0001C2.98637 8.78954 2.48801 9.2251 2.00001 9.2251C1.64102 9.2251 1.35001 9.51611 1.35001 9.8751V13.0001C1.35001 13.3591 1.64102 13.6501 2.00001 13.6501H14C14.359 13.6501 14.65 13.3591 14.65 13.0001V9.8751C14.65 9.51611 14.359 9.2251 14 9.2251C13.512 9.2251 13.0136 8.78954 13.0136 8.0001C13.0136 7.21066 13.512 6.7751 14 6.7751C14.359 6.7751 14.65 6.48408 14.65 6.1251V3.0001C14.65 2.64111 14.359 2.3501 14 2.3501H2.00001ZM2.65001 5.57127V3.6501H13.35V5.57127C12.3498 5.87977 11.7136 6.88941 11.7136 8.0001C11.7136 9.11079 12.3498 10.1204 13.35 10.4289V12.3501H2.65001V10.4289C3.65021 10.1204 4.28637 9.11079 4.28637 8.0001C4.28637 6.8894 3.65021 5.87977 2.65001 5.57127ZM10.1261 6.5525C10.3621 6.28204 10.3342 5.87143 10.0638 5.63538C9.79329 5.39934 9.38268 5.42724 9.14663 5.69771L5.87391 9.44771C5.63786 9.71818 5.66577 10.1288 5.93623 10.3648C6.2067 10.6009 6.61731 10.573 6.85336 10.3025L10.1261 6.5525ZM6.30002 7C6.8523 7 7.30002 6.55228 7.30002 6C7.30002 5.44772 6.8523 5 6.30002 5C5.74773 5 5.30002 5.44772 5.30002 6C5.30002 6.55228 5.74773 7 6.30002 7ZM10.5455 10.2495C10.5455 10.8018 10.0978 11.2495 9.5455 11.2495C8.99322 11.2495 8.5455 10.8018 8.5455 10.2495C8.5455 9.69723 8.99322 9.24951 9.5455 9.24951C10.0978 9.24951 10.5455 9.69723 10.5455 10.2495Z" fill="currentColor" />
														</svg>
													</div>
													<div className="lhekIy">Áp dụng ticket <span style={{ "color": "red" }}>{cost.discount}</span></div>
												</div>
												<div data-tracking-id="promotion-menu-lcp" id="promotion" className="button-text">
													<div color="cyan" className="bFCWPV" />
													<div color="cyan" className="lhekIy dqTjzx" onClick={showModal}>Chọn mã</div>
													<Modal title="Khuyến mãi hiện có"
														visible={visible}
														centered footer={null}
														onCancel={handleCancel}>
														<div className="discount-content">
															{getDiscouts.map((el) => {
																return <div className="wrap-item">
																	<div style={{ "borderColor": "#00bfa5", "backgroundColor": "#00bfa5" }}
																		className="title-discount">
																		<div className="buv384 dbzfqh">{el.code} hỗ trợ {el.percent}%</div>
																	</div>
																	<div className="discount-infor">
																		<div className="discount-right">
																			<div><span className="io0LX9">{el.description}</span></div>
																			<div className="aHZeXi"><div className="_0ZX7+X"><div className="YsfdPb">Tối đa {formatCommon.formatNumberic(el.price)}</div></div></div>
																			<div className="mpTlYm"><span className="jjBnhm">Sắp hết hạn: {formatCommon.getResultDiffDate(new Date(el.endDate), new Date())}</span></div>
																		</div>
																		<div className="discount-left">
																			<div className="Sw3kAk">
																				<input className="_2B0ZkF WxXv5v" type="radio"
																					name='discount'
																					onChange={handleCaculatedCost}
																					value={el.code}></input>
																			</div>
																		</div>
																	</div>
																</div>
															})}
														</div>
													</Modal>
												</div>
											</div>
										</div>
										{expenses.map((el) => {
											return el.id === cost.typeOfPost ? <div className="wrap-bill">
												<div className="wrap-row">
													<div className="first-row">Đơn giá / ngày</div>
													<span className="second-row"><span className="sc-fodVxV sUpQc">{formatCommon.formatNumberic(el.cost)}</span> VND</span>
												</div>
												<div className="wrap-row" style={{ marginTop: '16px' }}>
													<div className="first-row">Số ngày đăng tin</div>
													<div className="second-row"><span className="sc-fodVxV sUpQc">{cost.numDatePost} </span>Ngày</div>
												</div>
												<div className="wrap-row" style={{ marginTop: '16px' }}>
													<div className="first-row">Khuyến mãi</div>
													<div className="second-row">
														<span className="second-row"><span className="sc-fodVxV sUpQc">{formatCommon.formatNumberic(getDiscountPrice())}</span> VND</span></div>
												</div>
												<div className="line" />
												<div style={{ "height": "8px" }}></div>
												<div className="row-total" style={{ marginTop: '14px' }}>
													<div className="first-row-total">Tổng cộng</div>
													<div className="second-row-total">
														<div className="sc-gsTCUz bLoRcR sc-hmgsod jgvoXG">
															<span className="second-row"><span className="sc-fodVxV sUpQc">{formatCommon.formatNumberic(finalTotalAmountNeeded())}</span> VND</span></div>
													</div>
												</div>
											</div> : <Fragment></Fragment>
										})
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</Fragment >
}

export default CreatePost