import { Fragment, useEffect, useState } from "react"
import InputBox from "../../components/common/InputBox/InputBox"
import { inputConstant } from "../../constant/inputConstant"
import { PostNewsService } from "./../../service/PostNewsService"
import './CreatePost.css'
import { AddressApiService } from "../../service/AddressApiService"

const CreatePost = () => {
	const [typesOfAcc, setTypeOffAcc] = useState([])
	const [getAllProvinces, setGetAllProvinces] = useState([{id: 0,name: ''}])
	const [getAllDistrictByProvinceId, setGetAllDistrictByProvinceId] = useState([{id: 0,name: ''}])
	const [getAllWardByDistrictId, setGetAllWardByDistrictId] = useState([{id: 0,name: ''}])
	const [postNews, setPostNews] = useState({
		typesOfAcc: 0,
		province: '',
		district: '',
		ward: '',
		street: '',
		title: '',
		description: '',
		area:0,
		price:''
	})

	useEffect(() => {
		PostNewsService.getTypeOfAcc()
			.then((response) => {
				setTypeOffAcc(response.data)
			})
		AddressApiService.getAllProvince().then((data) => {
			setGetAllProvinces(data)
		})
	}, [])

	const handleGetValue = (target) => {
		if (target.nameOfinput === 'province') {
			//check district belong to province. if not => clear input district, ward, street, else dont change
			if(!AddressApiService.checkDistrictOfProvince(target.id,postNews.district)){
				AddressApiService.getAllDistricByProvinceId(target.id).then((data) => {
					setGetAllDistrictByProvinceId(data)
				})
				
			}
		} else if (target.nameOfinput === 'district') {
			AddressApiService.getAllWardByDistrictId(target.id).then((data) => {
				setGetAllWardByDistrictId(data)
			})
		}
		setPostNews({
			...postNews,
			[target.nameOfinput]: target.name
		})
	}

	console.log(postNews)

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
														name='typesOfAcc'></InputBox>
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
														data={getAllDistrictByProvinceId}
														getValueDropList={handleGetValue}
														name='district'
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
												Phường, xã
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_SEARCH}
														placeholder={`Chọn xã`}
														data={getAllWardByDistrictId}
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
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Tên tòa nhà
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tên tòa nhà`}
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
								<div className="fields-form">
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
								</div>
								<div className="fields-form">
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
								</div>
								<div className="m-t-16"></div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
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
								<h3 className="mb-16 font-stand">Thông tin liên hệ</h3>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Tên tác giả
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tên đầy đủ`}
														name='author'
														onChange={handleGetValue}></InputBox>
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
														placeholder={`Nhập số điện thoại`}
														name='phone'
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
												Địa chỉ
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập địa chỉ`}
														name='addressOfAuthor'
														onChange={handleGetValue}></InputBox>
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
														placeholder={`Nhập email`}
														name='email'
														onChange={handleGetValue}></InputBox>
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
							<div className="second-col-content">
								<div className="sc-kkjstb ghUCIz">
									<div className="sc-dwqbIM lgnhdE">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Loại tin đăng</div>
										<div className="sc-fTNIDv ieXpgb">
											<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
												<div className="sc-licaXj kCALOO" data-tracking-id="vip-menu-lcp">
													<div id="vip_type" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>Tin thường</div>
													<div className="sc-gUUzQN jMensr icon-clear">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#F2F2F2" />
															<path d="M15 9L9 15" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M15 15L9 9" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
													<div className="sc-cuWcWY eXAtTF div-button-right">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="sc-iODzbV lcjFa">
									<div className="sc-iWqcje strFK">
										<div className="sc-jDhKup hUHjNk">
											<div data-tracking-id="spotlight-feature-lcp" data-tracking-label="status=on" id="add_on" color="#CCCCCC" className="sc-jGVbCA gwrfxZ">
												<svg fontSize="24px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
												</svg>
												<div className="sc-bQdQlF bLRIRM">
													<div className="sc-iBPRYJ jfvWqv sc-knLdlU gGDRwY">Làm nổi bật tin đăng</div>
												</div>
											</div>
										</div>
										<div className="sc-elrsxY cDeHpU">
											<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="16px">
												<path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 7.75C10.8917 7.75 9.96738 8.47508 9.72413 9.3771C9.61628 9.77702 9.20465 10.0138 8.80472 9.90595C8.40479 9.7981 8.16802 9.38647 8.27587 8.98654C8.70934 7.37913 10.2678 6.25 12 6.25C14.0801 6.25 15.75 7.87091 15.75 9.90909C15.75 11.3648 14.6776 12.0945 13.9756 12.5722C13.9577 12.5844 13.9399 12.5964 13.9225 12.6083C13.0988 13.1699 12.75 13.4581 12.75 14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14C11.25 12.6066 12.3013 11.8947 12.9848 11.4319C13.0165 11.4104 13.0475 11.3894 13.0775 11.369C13.8779 10.8232 14.25 10.5071 14.25 9.90909C14.25 8.73398 13.2867 7.75 12 7.75ZM12 16.24C12.4142 16.24 12.75 16.5758 12.75 16.99V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V16.99C11.25 16.5758 11.5858 16.24 12 16.24Z" fill="currentColor" />
											</svg>
										</div>
									</div>
									<div className="sc-fodVxV sUpQc sc-ja-dpGc gYusMa">HOT</div>
								</div>
								<div className="sc-kokycZ eLXxaX" />
								<div className="sc-ilnoAu cCAAwg">
									<div className="sc-kkjstb ghUCIz sc-lxjJS EYtuj">
										<div className="sc-dwqbIM lgnhdE">
											<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Số ngày đăng</div>
											<div className="sc-fTNIDv ieXpgb">
												<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
													<div type="number" className="sc-licaXj kCALOO" data-tracking-id="listing-duration-lcp">
														<div id="duration" placeholder="Số ngày đăng" type="number" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
															<div className="sc-gGTGfU fSjCQg sc-hguquU itkkfU">
																<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.8548139793643366" id="duration" placeholder="Số ngày đăng" rightmode="button" inputMode="numeric" className="sc-ehsPrw ylxsH" defaultValue={10} style={{ width: '100%' }} /></div>
															</div>
														</div>
														<div className="sc-gUUzQN jMensr icon-clear">
															<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#F2F2F2" />
																<path d="M15 9L9 15" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
																<path d="M15 15L9 9" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														</div>
														<div className="sc-cuWcWY eXAtTF div-button-right">
															<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="sc-dcxYdx dRpxbW">
										<div className="sc-kstrdz dPmahJ">Ngày bắt đầu</div>
										<div className="sc-eWuggI eoRZvm" />
										<div id="start_date" className="sc-dLyFMm iIKOVn">
											<div className="ant-picker" style={{ flex: '1 1 0%', display: 'flex', borderRadius: '4px', height: '32px', maxHeight: '32px' }}>
												<div className="ant-picker-input">
													<input readOnly placeholder="[object Object]" title="08/08/2022" size={12} defaultValue="08/08/2022" />
													<span className="ant-picker-suffix">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path xmlns="http://www.w3.org/2000/svg" d="M15 3V7M9 3V7M4 11H20M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</span>
												</div>
											</div>
										</div>
										<div className="sc-eWuggI eoRZvm" />
										<div className="sc-fubCfw iAFymC" style={{ color: 'rgb(80, 80, 80)' }}>Kết thúc ngày 18/08/2022</div>
									</div>
								</div>
								<div className="sc-kstrdz hDEJxc">Hẹn giờ đăng tin</div>
								<div className="sc-kkjstb ghUCIz sc-cYKKGz dNJaIH">
									<div className="sc-dwqbIM lgnhdE">
										<div className="sc-fTNIDv ieXpgb">
											<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
												<div disabled className="sc-licaXj hVHrkG">
													<div id="posting_hours" disabled className="sc-hJxCPi aoAxu" style={{ width: '100%' }}>Chọn khung giờ</div>
													<div className="sc-gUUzQN jMensr icon-clear">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#F2F2F2" />
															<path d="M15 9L9 15" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M15 15L9 9" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
													<div className="sc-cuWcWY eXAtTF div-button-right">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</div>
											</div>
										</div>
										<div className="sc-fubCfw eeaWWy sc-ihnbgO dWVYgZ" type="secondary">
											<div className="sc-kAZAHP defSOh">
												Áp dụng với tài khoản Pro
												<a target="_blank" state="normal" href="/sellernet/pro/dang-ky" className="sc-irlOZD dKZfrk">
													<div className="sc-iBPRYJ jfvWqv sc-dwcuIR czySrX">Tìm hiểu thêm</div>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="sc-iYbQIX dcoLOm">
									<div className="sc-dZRBTR iWzTrZ">
										<div className="sc-dZRBTR koAKWo">
											<div className="sc-imZdan hXFdSH">
												<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path xmlns="http://www.w3.org/2000/svg" d="M3 2V8M3 8H9M3 8L5.64033 5.63067C7.02134 4.25209 8.81301 3.35964 10.7454 3.08779C12.6777 2.81593 14.6461 3.17941 16.3539 4.12343C18.0617 5.06746 19.4165 6.54091 20.214 8.32177C21.0115 10.1026 21.2086 12.0944 20.7756 13.997C20.3426 15.8996 19.303 17.61 17.8133 18.8704C16.3237 20.1308 14.4647 20.873 12.5165 20.9851C10.5684 21.0972 8.63652 20.5732 7.01208 19.492C5.38765 18.4108 4.15862 16.831 3.51018 14.9907" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<div className="sc-kstrdz dPmahJ">Tự động đăng lại</div>
											<div className="sc-gTgzIj fTLLNh">
												<div className="sc-fyMrPw hoZOND">
													<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="16px">
														<path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 7.75C10.8917 7.75 9.96738 8.47508 9.72413 9.3771C9.61628 9.77702 9.20465 10.0138 8.80472 9.90595C8.40479 9.7981 8.16802 9.38647 8.27587 8.98654C8.70934 7.37913 10.2678 6.25 12 6.25C14.0801 6.25 15.75 7.87091 15.75 9.90909C15.75 11.3648 14.6776 12.0945 13.9756 12.5722C13.9577 12.5844 13.9399 12.5964 13.9225 12.6083C13.0988 13.1699 12.75 13.4581 12.75 14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14C11.25 12.6066 12.3013 11.8947 12.9848 11.4319C13.0165 11.4104 13.0475 11.3894 13.0775 11.369C13.8779 10.8232 14.25 10.5071 14.25 9.90909C14.25 8.73398 13.2867 7.75 12 7.75ZM12 16.24C12.4142 16.24 12.75 16.5758 12.75 16.99V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V16.99C11.25 16.5758 11.5858 16.24 12 16.24Z" fill="currentColor" />
													</svg>
												</div>
											</div>
										</div>
										<div tracking-id="auto-renew-lcp" tracking-label="loc=lcp" tracking-action="Activate-Auto Renew">
											<div id="auto_renew_switch" className="sc-jVKKsU bocbMg sc-eOuESm dxvkAc" color="#CCCCCC">
												<svg width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fontSize="32px">
													<path fillRule="evenodd" clipRule="evenodd" d="M9.94949 6.05945C11.0413 5.99494 12.1318 6.0001 13.2235 6.0001C13.2311 6.0001 18.7558 6.0001 18.7558 6.0001C19.8689 6.0001 20.9594 5.99494 22.0505 6.05945C23.0425 6.11752 24.0088 6.24139 24.9707 6.51816C26.9955 7.10009 28.7636 8.31557 30.0417 10.0388C31.3123 11.751 32 13.8472 32 15.9994C32 18.1542 31.3123 20.2491 30.0417 21.9613C28.7636 23.6839 26.9955 24.9 24.9707 25.4819C24.0088 25.7587 23.0425 25.8819 22.0505 25.9406C20.9594 26.0052 19.8689 25.9994 18.7771 25.9994C18.7696 25.9994 13.2436 26 13.2436 26C12.1318 25.9994 11.0413 26.0052 9.94949 25.9406C8.95812 25.8819 7.99184 25.7587 7.02996 25.4819C5.00518 24.9 3.23702 23.6839 1.9589 21.9613C0.688314 20.2491 0 18.1542 0 16C0 13.8472 0.688314 11.751 1.9589 10.0388C3.23702 8.31557 5.00518 7.10009 7.02996 6.51816C7.99184 6.24139 8.95812 6.11752 9.94949 6.05945Z" />
													<path fillRule="evenodd" clipRule="evenodd" d="M10 22C13.3137 22 16 19.3137 16 16C16 12.6863 13.3137 10 10 10C6.68629 10 4 12.6863 4 16C4 19.3137 6.68629 22 10 22Z" fill="white" />
												</svg>
											</div>
										</div>
									</div>
								</div>
								<div className="sc-lmcoqz hYBrVm" />
								<div>
									<div className="sc-jeUVsa fieuxM">
										<div className="sc-gVqjZp bTDDKS">
											<div className="sc-hRNfvg hfkMCN">
												<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M2.00001 2.3501C1.64102 2.3501 1.35001 2.64111 1.35001 3.0001V6.1251C1.35001 6.48408 1.64102 6.7751 2.00001 6.7751C2.48801 6.7751 2.98637 7.21066 2.98637 8.0001C2.98637 8.78954 2.48801 9.2251 2.00001 9.2251C1.64102 9.2251 1.35001 9.51611 1.35001 9.8751V13.0001C1.35001 13.3591 1.64102 13.6501 2.00001 13.6501H14C14.359 13.6501 14.65 13.3591 14.65 13.0001V9.8751C14.65 9.51611 14.359 9.2251 14 9.2251C13.512 9.2251 13.0136 8.78954 13.0136 8.0001C13.0136 7.21066 13.512 6.7751 14 6.7751C14.359 6.7751 14.65 6.48408 14.65 6.1251V3.0001C14.65 2.64111 14.359 2.3501 14 2.3501H2.00001ZM2.65001 5.57127V3.6501H13.35V5.57127C12.3498 5.87977 11.7136 6.88941 11.7136 8.0001C11.7136 9.11079 12.3498 10.1204 13.35 10.4289V12.3501H2.65001V10.4289C3.65021 10.1204 4.28637 9.11079 4.28637 8.0001C4.28637 6.8894 3.65021 5.87977 2.65001 5.57127ZM10.1261 6.5525C10.3621 6.28204 10.3342 5.87143 10.0638 5.63538C9.79329 5.39934 9.38268 5.42724 9.14663 5.69771L5.87391 9.44771C5.63786 9.71818 5.66577 10.1288 5.93623 10.3648C6.2067 10.6009 6.61731 10.573 6.85336 10.3025L10.1261 6.5525ZM6.30002 7C6.8523 7 7.30002 6.55228 7.30002 6C7.30002 5.44772 6.8523 5 6.30002 5C5.74773 5 5.30002 5.44772 5.30002 6C5.30002 6.55228 5.74773 7 6.30002 7ZM10.5455 10.2495C10.5455 10.8018 10.0978 11.2495 9.5455 11.2495C8.99322 11.2495 8.5455 10.8018 8.5455 10.2495C8.5455 9.69723 8.99322 9.24951 9.5455 9.24951C10.0978 9.24951 10.5455 9.69723 10.5455 10.2495Z" fill="currentColor" />
												</svg>
											</div>
											<div className="sc-kstrdz dPmahJ">Khuyến mãi (0)</div>
										</div>
										<div data-tracking-id="promotion-menu-lcp" id="promotion" className="sc-bvVdbW fsfWuT">
											<div color="cyan" className="sc-btdgZA RmMeE" />
											<div color="cyan" className="sc-kstrdz dPmahJ sc-ekboDZ cDjKGE">Chọn mã</div>
										</div>
									</div>
								</div>
								<div className="sc-hlsFIz lIXQu">
									<div className="sc-cYleCd eHWHtv">
										<div className="sc-hBEYos bZZRSL">Đơn giá / ngày</div>
										<span className="sc-kEjbxe gPdhKL"><span className="sc-kEjbxe bhKKEC">2.727</span> VND</span>
									</div>
									<div className="sc-cniqTt hBbKKl" />
									<div className="sc-cYleCd eHWHtv">
										<div className="sc-hBEYos bZZRSL">Số ngày đăng tin</div>
										<div className="sc-iBPRYJ jfvWqv">10 ngày</div>
									</div>
									<div className="sc-hmWXE iGASab" />
									<div>
										<div className="sc-cYleCd ldrBKU">
											<div className="sc-kstrdz dPmahJ">Bạn trả</div>
											<div className="sc-cYleCd fJsoKh">
												<div className="sc-bqyKva kNPgPf">27.270</div>
												<div className="sc-euuyea cevGYU" />
												<div className="sc-bqyKva kVEyIa">VND</div>
											</div>
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