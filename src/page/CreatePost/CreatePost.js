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
import cancel from '../../assets/cancel.png'
import Modal from "antd/lib/modal/Modal"
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import AWS from 'aws-sdk';

const CreatePost = () => {

	AWS.config.update({
		accessKeyId: 'AKIAVHFYBTGIYO5R42QK',
		secretAccessKey: '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',
	})
	const nav = useNavigate()
	const [modeForm, setModeForm] = useState('Create')
	const [controlForm, setControlForm] = useState(false)
	const location = useLocation()
	const param = useParams()
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
		typesOfAcc: 0,
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
		videos: [],
		tower: '',
		totalAmount: 0,
		directionHouse: '',
		directionBalcony: ''
	})
	const [cost, setCost] = useState({
		typeOfPost: '',
		numDatePost: 0,
		startedDate: new Date(),
		discount: ''
	})
	const dispatch = useDispatch();

	useEffect(() => {
		PostNewsService.getTypeOfAcc()
			.then((response) => {
				setTypeOffAcc(response.data)
			})
		AddressApiService.getAllProvince().then((data) => {
			setGetAllProvinces(data.reverse())
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
		const obj = formatCommon.getQueryStringParams(location.search)
		if (param.id) {
			if (obj.mode && obj.mode === 'ExtendedTime') {
				setControlForm(true)
			}
			setModeForm(obj.mode)
			PostNewsService.getNewsDetail(param.id).then((data) => {
				let imagesUpdated = []
				data.images.forEach(async img => {
					const arr = img.split('/')
					const s3 = new AWS.S3()
					const params = {
						Bucket: 'motel-video',
						Key: arr[arr.length - 1]
					}
					const arrayUint = await s3.getObject(params).promise()
					imagesUpdated.push(arrayBufferToFile(arrayUint.Body, img))
				})
				setPostNews({
					...postNews,
					airConditioner: data.accomodationInfor.airConditioner,
					area: data.accomodationInfor.area,
					balcony: data.accomodationInfor.balcony,
					directionBalcony: data.accomodationInfor.directionBalcony,
					directionHouse: data.accomodationInfor.directionHouse,
					district: data.accomodationInfor.district,
					floorNumber: data.accomodationInfor.floorNumber,
					furniture: data.accomodationInfor.furniture,
					heater: data.accomodationInfor.heater,
					internet: data.accomodationInfor.internet,
					numOfBed: data.accomodationInfor.numOfBed,
					numOfFloor: data.accomodationInfor.numOfFloor,
					numOfToilet: data.accomodationInfor.numOfToilet,
					parking: data.accomodationInfor.parking,
					price: data.accomodationInfor.price,
					province: data.accomodationInfor.province,
					street: data.accomodationInfor.street,
					tower: data.accomodationInfor.tower,
					typesOfAcc: renderTypeOfAcc(data.accomodationInfor.typesOfAcc),
					ward: data.accomodationInfor.ward,
					description: data.newsInfor.description,
					title: data.newsInfor.title,
					videos: data.newsInfor.videos,
					images: []
				})
			})
		}
	}, [])

	const arrayBufferToFile = (buffer, filename) => {
		const blob = new Blob([buffer], { type: 'image/png' });
		return new File([blob], filename, { type: 'image/png' });
	}

	const handleGetValue = (target) => {
		let newArr = [];
		switch (target.nameOfinput) {
			case 'province':
				const existsProvince = getAllProvinces.filter((el) => {
					return el.name === target.value
				})
				if (existsProvince.length !== 0) {
					AddressApiService.getAllDistricByProvinceId(target.id).then((data) => {
						setGetAllDistrictByProvinceId(data.reverse())
					})
				}
				break
			case 'district':
				const existsDistrict = getAllDistrictByProvinceId.filter((el) => {
					return el.name === target.value
				})
				if (existsDistrict.length !== 0) {
					AddressApiService.getAllWardByDistrictId(target.id).then((data) => {
						setGetAllWardByDistrictId(data.reverse())
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
	}

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
							style={{ height: '100%', width: 'auto' }} />
					</div>
					<div className="user-controll">
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

	const handleUpdateVideo = (target) => {
		// defined to accept onchange on input
	}

	const handleCaculatedCost = (target) => {
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

	const submitData = () => {
		postNews.totalAmount = finalTotalAmountNeeded()
		dispatch(message.information(true))
		if (modeForm === 'ExtendedTime') {
			PostNewsService.extendedTimeToPost(param.id, cost).then(() => {
				dispatch(message.information(false))
				dispatch(message.successfully(true, 'Gia hạn bài viết thành công'))
				nav("/trang-chu/quan-ly-bai-viet")
			}).catch((error) => {
				dispatch(message.error(true, 'Gia hạn bài viết thất bại!!!'))
			})
		} else if (modeForm === 'EditPost') {
			console.log(postNews)
			PostNewsService.editPost(postNews, cost, typesOfAcc, param.id).then(() => {
				dispatch(message.information(false))
				dispatch(message.successfully(true, 'Chỉnh sữa bài viết thành công'))
				nav("/trang-chu/quan-ly-bai-viet")
			}).catch((error) => {
				console.log(error)
				dispatch(message.error(true, 'Chỉnh sữa bài viết thất bại!!!'))
			})
		} else if (modeForm === 'Create') {
			PostNewsService.sendRequestPostNews(postNews, cost, typesOfAcc)
				.then((data) => {
					if (data) {
						nav("/trang-chu/quan-ly-bai-viet")
						dispatch(message.information(false))
						dispatch(message.successfully(true, 'Tạo bài đăng thành công'))
					} else {
						dispatch(message.error(true, 'Tạo tin thất bại'))
					}
				})
				.catch((error) => {
					dispatch(message.information(false))
					dispatch(message.error(true, 'Tạo tin thất bại'))
				})
		}
	}

	const renderTypeOfAcc = (typesOfAcc) => {
		if (typesOfAcc === 1) {
			return TypeAccomodationConstant.HOUSE
		} else if (typesOfAcc === 2) {
			return TypeAccomodationConstant.APARTMENT
		} else if (typesOfAcc === 3) {
			return TypeAccomodationConstant.MOTEL
		}
	}
	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-right-bar">
				<div className="ant-row wrap-table">
					<div className="ant-col first-col">
						<div style={controlForm ? {
							display: 'flex', flexDirection: 'column',
							"pointerEvents": "none", "opacity": "0.5"
						} : {
							display: 'flex', flexDirection: 'column'
						}}
							className='first-col-wrap'>
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
														placeholder={`Chọn bất động sản`}
														data={typesOfAcc}
														getValueDropList={handleGetValue}
														name='typesOfAcc'
														onChange={handleGetValue}
														value={postNews.typesOfAcc}
													></InputBox>
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
														onChange={handleGetValue}
														value={postNews.province}></InputBox>
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
														onChange={handleGetValue}
														value={postNews.district}></InputBox>
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
														onChange={handleGetValue}
														value={postNews.ward}></InputBox>
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
														onChange={handleGetValue}
														value={postNews.street}></InputBox>
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
						<div style={controlForm ? {
							display: 'flex', flexDirection: 'column',
							"pointerEvents": "none", "opacity": "0.5"
						} : {
							display: 'flex', flexDirection: 'column'
						}} className='first-col-wrap'>
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
														row='2'
														value={postNews.title}></InputBox>
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
														maxlength="10000" minlength="300" row={8}
														value={postNews.description}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={controlForm ? {
							display: 'flex', flexDirection: 'column',
							"pointerEvents": "none", "opacity": "0.5"
						} : {
							display: 'flex', flexDirection: 'column'
						}} className='first-col-wrap'>
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
														type='text'
														value={postNews.tower}></InputBox>
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
														type='number'
														value={postNews.area}></InputBox>
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
														type='text'
														value={postNews.price}></InputBox>
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
														type='number'
														value={postNews.numOfBed}></InputBox>
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
														placeholder={`Nhập số lượng phòng vệ sinh`}
														name='numOfToilet'
														onChange={handleGetValue}
														type='number'
														value={postNews.numOfToilet}></InputBox>
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
														type='number'
														value={postNews.numOfFloor}></InputBox>
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
														type='number'
														value={postNews.floorNumber}></InputBox>
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
														onChange={handleGetValue}
														name='directionHouse'
														value={postNews.directionHouse}></InputBox>
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
														onChange={handleGetValue}
														name='directionBalcony'
														value={postNews.directionBalcony}></InputBox>
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
															onChange={handleGetValue}
															checked={postNews.internet}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Bãi đổ xe'}
															name={'parking'}
															onChange={handleGetValue}
															checked={postNews.parking}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Ban công'}
															name={'balcony'}
															onChange={handleGetValue}
															checked={postNews.balcony}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Điều hòa'}
															name={'airConditioner'}
															onChange={handleGetValue}
															checked={postNews.airConditioner}></InputBox>
														<InputBox mode={inputConstant.CHECK_BOX}
															title={'Máy nóng lạnh'}
															name={'heater'}
															onChange={handleGetValue}
															checked={postNews.heater}></InputBox>
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
														name='furniture'
														type='text'
														value={postNews.furniture}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={controlForm ? {
							display: 'flex', flexDirection: 'column',
							"pointerEvents": "none", "opacity": "0.5"
						} : {
							display: 'flex', flexDirection: 'column'
						}} className='first-col-wrap'>
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
													return <Fragment key={index}>
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
						<div style={controlForm ? {
							display: 'flex', flexDirection: 'column',
							"pointerEvents": "none", "opacity": "0.5"
						} : {
							display: 'flex', flexDirection: 'column'
						}} className='first-col-wrap'>
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
						<div className="footer-button">
							<div className="wrap-button">
								<div className="flex-between">
									<button className="btn-right" onClick={()=>{
										nav("/trang-chu/quan-ly-bai-viet")
									}}>
										<div className="bKiBMa">
											<span className="dUUUwk">Thoát</span>
										</div>
									</button>
									<button className="btn-left" onClick={submitData}>
										<div className="bKiBMa">
											<span className="dUUUwk">
												{modeForm === 'ExtendedTime' ? 'Gia hạn' : ( modeForm === 'EditPost' ? 'Chỉnh sữa bài viết' : 'Tạo bài viết')}
											</span>
											<span className="jBNrga">
												<div className="cCSKON">
													<svg fontSize="16px" width="1em" height="1em"
														viewBox="0 0 24 24" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path xmlns="http://www.w3.org/2000/svg"
															d="M9 20L17 12L9 4" stroke="currentColor"
															strokeWidth="1.9"
															strokeLinecap="round"
															strokeLinejoin="round" />
													</svg>
												</div>
											</span>
										</div>
									</button>
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
												<div className="button-text">
													<div color="cyan" className="bFCWPV" />
													<div color="cyan" className="lhekIy dqTjzx" onClick={showModal}>Chọn mã</div>
													<Modal title="Khuyến mãi hiện có"
														visible={visible}
														centered footer={null}
														onCancel={handleCancel}>
														<div className="discount-content">
															{getDiscouts.map((el, index) => {
																return <div className="wrap-item" key={index}>
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
										{expenses.map((el, index) => {
											return el.id === cost.typeOfPost ? <div className="wrap-bill" key={index}>
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
															<span className="second-row">
																<span className="sc-fodVxV sUpQc">
																	{formatCommon.formatNumberic(finalTotalAmountNeeded())}
																</span> VND</span>
														</div>
													</div>
												</div>
											</div> : <Fragment></Fragment>
										})}
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