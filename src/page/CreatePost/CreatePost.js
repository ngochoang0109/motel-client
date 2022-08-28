import { Fragment, useEffect, useState } from "react"
import InputBox from "../../components/common/InputBox/InputBox"
import { inputConstant } from "../../constant/InputConstant"
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

const CreatePost = () => {
	const [typesOfAcc, setTypeOffAcc] = useState([])
	const [getAllProvinces, setGetAllProvinces] = useState([{ id: 0, name: '' }])
	const [getAllDistrictByProvinceId, setGetAllDistrictByProvinceId] = useState([{ id: 0, name: '' }])
	const [getAllWardByDistrictId, setGetAllWardByDistrictId] = useState([{ id: 0, name: '' }])
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
		numDatePost: 0,
		startedDate:moment(new Date())
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
	}, [])

	const handleGetValue = (target) => {
		switch (target.nameOfinput) {
			case 'province':
				//check district belong to province. if not => clear input district, ward, street, else dont change
				if (!AddressApiService.checkDistrictOfProvince(target.id, postNews.district)) {
					AddressApiService.getAllDistricByProvinceId(target.id).then((data) => {
						setGetAllDistrictByProvinceId(data)
					})
				}
				break
			case 'district':
				AddressApiService.getAllWardByDistrictId(target.id).then((data) => {
					setGetAllWardByDistrictId(data)
				})
				break
			case 'video':
				let newArr = [];
				if (target.value) {
					newArr = postNews.videos.concat(target.value)
				}
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

	const handleCaculatedCost = (target) => {
		console.log(target)
		setCost({
			...cost,
			[target.nameOfinput]: target.value
		})
	}

	console.log(postNews)
	console.log(cost.startedDate)
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
														onChange={handleGetValue}></InputBox>
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
													<InputBox mode={inputConstant.INPUT_SEARCH} placeholder={`Chọn huyện`}
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
									Chọn giá trị khác trong danh sách chọn, nếu không thì giá trị sẽ không được lưu.
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
									Chọn giá trị khác trong danh sách chọn, nếu không thì giá trị sẽ không được lưu.
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
														address={formatCommon.combineComponentOfAddress(postNews.province, postNews.district, postNews.ward, postNews.street)}>
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
														onChange={handleGetValue}
														name='video'
														type='text'></InputBox>
												</div>
											</div>
											<div className="m-t-16"></div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_BIG_BOX}
														name='videos'
														type='text'
														row={4}
														value={formatCommon.formatStringToNewLineInTexarea(postNews.videos)}
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
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
														data={typesOfAcc}
														getValueDropList={handleGetValue}
														name='typesOfAcc'
														onChange={handleGetValue}></InputBox>
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
														onChange={handleCaculatedCost}></InputBox>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Fragment>
}

export default CreatePost