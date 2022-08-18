import { Fragment, useEffect, useState } from "react"
import InputBox from "../../components/common/InputBox/InputBox"
import SearchSelection from "../../components/common/SelectionModal/SelectionModal"
import { inputConstant } from "../../constant/inputConstant"
import { integrationConstant } from "../../constant/integrationConstant"
import { PostNewsService } from "./../../service/PostNewsService"
import { useDispatch, useSelector } from 'react-redux';
import './CreatePost.css'
import { AddressApiService } from "../../service/AddressApiService"

const CreatePost = () => {
	const typesOfAcc = useSelector(state => state.integration)
	const dispatch = useDispatch()
	const [getAllProvinces, setGetAllProvinces] = useState([{
		id: 0,
		name: ''
	}])
	const [getAllDistrictByProvinceId, setGetAllDistrictByProvinceId] = useState([{
		id: 0,
		name: ''
	}])
	const [getAllWardByDistrictId, setGetAllWardByDistrictId] = useState([{
		id: 0,
		name: ''
	}])
	const [postNews, setPostNews] = useState({
		typesOfAcc: 0,
		province: '',
		district: '',
		ward:'',
		street:'',
	})

	useEffect(() => {
		PostNewsService.getTypeOfAcc()
			.then((response) => {
				dispatch({
					type: integrationConstant.GET_TYPE_OF_ACC,
					data: response.data
				})
			})
		AddressApiService.getAllProvince().then((data) => {
			setGetAllProvinces(data)
		})
	}, [])

	const handleGetValue = (value) => {
		if (value.nameOfinput === 'province') {
			AddressApiService.getAllDistricByProvinceId(value.id).then((data) => {
				setGetAllDistrictByProvinceId(data)
			})
		} else if(value.nameOfinput === 'district'){
			AddressApiService.getAllWardByDistrictId(value.id).then((data) => {
				setGetAllWardByDistrictId(data)
			})
		}
		setPostNews({
			...postNews,
			[value.nameOfinput]: value.name
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
														getValue={handleGetValue}
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
														data={getAllProvinces}
														getValue={handleGetValue}
														name='province'></InputBox>
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
														getValue={handleGetValue}
														name='district'></InputBox>
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
														getValue={handleGetValue}
														name='ward'></InputBox>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-input-level-1">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Đường, phố
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX} placeholder={`Chọn đường`}
														data={getAllDistrictByProvinceId}
														getValue={handleGetValue}
														name='street'
														onChange={handleGetValue}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="sc-JMrIS gyxkLD">
									<div className="sc-ffEnQn foItZU">
										{/* <div className="sc-kkjstb ghUCIz sc-gcNxir eDFzMO">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
													Phường, xã
													<div className="sc-kstrdz kihuz">&nbsp;*</div>
												</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div id="ward" data-tracking-id="ward-address-dropdown-lcp" placeholder="Chọn" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-gGTGfU fSjCQg sc-hguquU itkkfU">
																	<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.30670992685148724" id="ward" data-tracking-id="ward-address-dropdown-lcp" placeholder="Chọn" className="sc-dcwrBW iDAuKv" defaultValue style={{ width: '100%' }} /></div>
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
										</div> */}
										{/* <div className="sc-kkjstb ghUCIz sc-ehlwGc ckxeCE">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Đường, phố</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div placeholder="Chọn" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-gGTGfU fSjCQg sc-hguquU itkkfU">
																	<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.313960864505594" placeholder="Chọn" className="sc-dcwrBW iDAuKv" defaultValue style={{ width: '100%' }} /></div>
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
										</div> */}
									</div>
									{/* <div className="sc-dkcnnY cJuolF">
										<div className="sc-kkjstb ghUCIz sc-iDdsNx duLAok">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Dự án</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div data-tracking-id="project-address-dropdown-lcp" placeholder="Chọn" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-gGTGfU fSjCQg sc-hguquU itkkfU">
																	<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.39832992093027064" data-tracking-id="project-address-dropdown-lcp" placeholder="Chọn" className="sc-dcwrBW iDAuKv" defaultValue style={{ width: '100%' }} /></div>
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
									</div> */}
								</div>
								{/* <div className="sc-hFUjvt cXVkiD">
									<div className="sc-gGTGfU fSjCQg sc-dBnTLu Koial">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
											Địa chỉ hiển thị trên tin đăng
											<div className="sc-kstrdz kihuz">&nbsp;*</div>
										</div>
										<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.8482008063843314" id="address" maxLength={200} placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ..." data-tracking-id="adress-detail-input-lcp" className="sc-dcwrBW iDAuKv" defaultValue /></div>
									</div>
								</div> */}
							</div>
							<div className="sc-gzYaIe gSRNsV">
								{/* <h3 className="sc-dlfnbm lhekIy sc-euHYbB peett">Thông tin bài viết</h3> */}
								{/* <div className="sc-jvJioj enGzWK">
									<div className="sc-fkubWd iXQHrd">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
											Tiêu đề
											<div className="sc-kstrdz kihuz">&nbsp;*</div>
										</div>
										<textarea id="title" placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy" rows={2} className="sc-iuGMqu cbgjuq" defaultValue={""} />
										<div className="sc-fubCfw eeaWWy sc-ihnbgO dWVYgZ" type="secondary">Tối thiểu 30 ký tự, tối đa 99 ký tự</div>
									</div>
								</div> */}
								{/* <div className="sc-fkubWd iXQHrd sc-bynpOE kjsGCr">
									<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
										Mô tả
										<div className="sc-kstrdz kihuz">&nbsp;*</div>
									</div>
									<textarea id="descContent" placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học ... " className="sc-iuGMqu Asfdz" defaultValue={""} />
									<div className="sc-fubCfw eeaWWy sc-ihnbgO dWVYgZ" type="secondary">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</div>
								</div> */}
							</div>
							<div className="sc-gvnAtk fykAqp">
								{/* <h3 className="sc-dlfnbm lhekIy sc-jPavhj azStf">Thông tin bất động sản</h3>
								<div className="sc-gGTGfU fSjCQg sc-iTbZsn kYFBIE">
									<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
										Diện tích
										<div className="sc-kstrdz kihuz">&nbsp;*</div>
									</div>
									<div className="sc-hFXnzx fjFzkC">
										<input name="pgds-0.5978529368648222" id="acreage" placeholder="Nhập diện tích, VD 80" rightmode="icon" inputMode="numeric" className="sc-ehsPrw dHwiZa" defaultValue />
										<div mode="icon" className="sc-iuAqxS OkBJE">
											<div className="sc-fubCfw iAFymC">m²</div>
										</div>
									</div>
								</div> */}
								<div style={{ display: 'flex', marginBottom: '16px' }}>
									{/* <div className="sc-kkjstb ghUCIz sc-exkdkS gLiJnq">
										<div className="sc-dwqbIM lgnhdE">
											<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
												Mức giá
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="sc-fTNIDv ieXpgb">
												<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
													<div type="number" className="sc-licaXj kCALOO">
														<div name="price" placeholder="Nhập giá, VD 12000000" type="number" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
															<div className="sc-gGTGfU fSjCQg sc-hguquU itkkfU">
																<div className="sc-hFXnzx fjFzkC"><input name="price" placeholder="Nhập giá, VD 12000000" rightmode="button" inputMode="numeric" className="sc-ehsPrw ylxsH" defaultValue style={{ width: '100%' }} /></div>
															</div>
														</div>
														<div className="sc-gUUzQN jMensr icon-clear">
															<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#CCCCCC" />
																<path d="M15 9L9 15" stroke="white" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
																<path d="M15 15L9 9" stroke="white" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div> */}
									{/* <div className="sc-gwMuRV Druhw">
										<div className="sc-kkjstb ghUCIz">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Đơn vị</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div id="price" placeholder className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>VND</div>
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
									</div> */}
								</div>
								{/* <div className="sc-kstrdz dPmahJ">Giấy tờ pháp lý</div> */}
								{/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
									<div className="sc-gYhigD gdlclw">
										<div mode="tag" className="sc-kHNMoK hSbJLH sc-dFkSPt gBnblK" type="solid" color="gray2"><span color="#2C2C2C" className="sc-kEjbxe bhKKEC sc-bGqQkm leOoTK">Sổ đỏ/ Sổ hồng</span></div>
									</div>
									<div className="sc-gYhigD gdlclw">
										<div mode="tag" className="sc-kHNMoK hSbJLH sc-dFkSPt gBnblK" type="solid" color="gray2"><span color="#2C2C2C" className="sc-kEjbxe bhKKEC sc-bGqQkm leOoTK">Hợp đồng mua bán</span></div>
									</div>
									<div className="sc-gYhigD gdlclw">
										<div mode="tag" className="sc-kHNMoK hSbJLH sc-dFkSPt gBnblK" type="solid" color="gray2"><span color="#2C2C2C" className="sc-kEjbxe bhKKEC sc-bGqQkm leOoTK">Đang chờ sổ</span></div>
									</div>
									<div className="sc-gYhigD gdlclw">
										<div mode="tag" className="sc-kHNMoK eCPwoe sc-dFkSPt gBnblK" type="solid" color="gray2">
											<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<line x1="4.75" y1="12.25" x2="18.25" y2="12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
												<line x1="11.75" y1="5.75" x2="11.75" y2="19.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
									</div>
								</div> */}
								<div className="sc-jQliKr bhqNCP" />
								<div>
									{/* <div className="sc-kGNybE iqergQ sc-futmCW buzJvC">
										<div className="sc-kstrdz dPmahJ sc-bAfeAT kgPYcZ">Số phòng ngủ</div>
										<div className="sc-bxniyx bACUYk">
											<button type="solid" color="secondary" disabled className="sc-kLgntA iKxMds">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="11.25" x2="19.25" y2="11.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
											<div className="sc-gGTGfU fSjCQg sc-jYCGvq MiXGF">
												<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.18255941915314478" widthinput={55} rightmode="button" inputMode="numeric" className="sc-ehsPrw ylxsH" defaultValue={0} /></div>
											</div>
											<button type="solid" color="secondary" className="sc-kLgntA ecqTvW">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="12.25" x2="18.25" y2="12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<line x1="11.75" y1="5.75" x2="11.75" y2="19.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
										</div>
									</div> */}
									{/* <div className="sc-kGNybE iqergQ sc-futmCW buzJvC">
										<div className="sc-kstrdz dPmahJ sc-bAfeAT kgPYcZ">Số phòng tắm, vệ sinh</div>
										<div className="sc-bxniyx bACUYk">
											<button type="solid" color="secondary" disabled className="sc-kLgntA iKxMds">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="11.25" x2="19.25" y2="11.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
											<div className="sc-gGTGfU fSjCQg sc-jYCGvq MiXGF">
												<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.6509005068917875" widthinput={55} rightmode="button" inputMode="numeric" className="sc-ehsPrw ylxsH" defaultValue={0} /></div>
											</div>
											<button type="solid" color="secondary" className="sc-kLgntA ecqTvW">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="12.25" x2="18.25" y2="12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<line x1="11.75" y1="5.75" x2="11.75" y2="19.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
										</div>
									</div> */}
									{/* <div className="sc-kGNybE iqergQ">
										<div className="sc-kstrdz dPmahJ sc-bAfeAT kgPYcZ">Số tầng</div>
										<div className="sc-bxniyx bACUYk">
											<button type="solid" color="secondary" disabled className="sc-kLgntA iKxMds">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="11.25" x2="19.25" y2="11.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
											<div className="sc-gGTGfU fSjCQg sc-jYCGvq MiXGF">
												<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.0250708528148178" widthinput={55} rightmode="button" inputMode="numeric" className="sc-ehsPrw ylxsH" defaultValue={0} /></div>
											</div>
											<button type="solid" color="secondary" className="sc-kLgntA ecqTvW">
												<span className="sc-jJEJSO hYLcNg">
													<div className="sc-gWHgXt ikxKmn">
														<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<line x1="4.75" y1="12.25" x2="18.25" y2="12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															<line x1="11.75" y1="5.75" x2="11.75" y2="19.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													</div>
												</span>
											</button>
										</div>
									</div> */}
									{/* <div style={{ display: 'flex', marginBottom: '24px', marginTop: '24px' }}>
										<div className="sc-hBEYos dWFkPG">Mô tả bổ sung</div>
										<div className="sc-kyOGgU jcUoDI" />
									</div> */}
									<div className="sc-tIXxi jBxEZE">
										{/* <div className="sc-kkjstb ghUCIz sc-gCgac bXLEsq">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Hướng nhà</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div name="houseDirection" placeholder="Chọn hướng" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-iBPRYJ jfvWqv sc-bTRMAZ gfyNKU placeholder">Chọn hướng</div>
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
										</div> */}
										{/* <div className="sc-kkjstb ghUCIz sc-eCuchx fkeIdG">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Hướng ban công</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div name="balconyDirection" placeholder="Chọn hướng" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-iBPRYJ jfvWqv sc-bTRMAZ gfyNKU placeholder">Chọn hướng</div>
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
										</div> */}
									</div>
									<div className="sc-tIXxi jBxEZE">
										{/* <div className="sc-gGTGfU fSjCQg sc-hsKQGR erSnjP">
											<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Đường vào</div>
											<div className="sc-hFXnzx fjFzkC">
												<input name="pgds-0.16781607605161364" placeholder="Nhập số" rightmode="icon" inputMode="numeric" className="sc-ehsPrw dHwiZa" defaultValue />
												<div mode="icon" className="sc-iuAqxS OkBJE">
													<div className="sc-fubCfw iAFymC">m</div>
												</div>
											</div>
										</div> */}
										{/* <div className="sc-gGTGfU fSjCQg sc-jmPcvM fKlXbV">
											<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Mặt tiền</div>
											<div className="sc-hFXnzx fjFzkC">
												<input name="pgds-0.3118992730587453" placeholder="Nhập số" rightmode="icon" inputMode="numeric" className="sc-ehsPrw dHwiZa" defaultValue />
												<div mode="icon" className="sc-iuAqxS OkBJE">
													<div className="sc-fubCfw iAFymC">m</div>
												</div>
											</div>
										</div> */}
									</div>
									{/* <div className="sc-gGTGfU fSjCQg">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Nội thất</div>
										<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.8138832698892464" maxLength={512} placeholder="VD: Nội thất đầy đủ" className="sc-dcwrBW iDAuKv" defaultValue /></div>
									</div> */}
								</div>
							</div>
							<div className="sc-hrKtqM chsvWH">
								{/* <div className="sc-bYgjwZ jiJypP">
									<h3 className="sc-dlfnbm lhekIy">Hình ảnh &amp; Video</h3>
									<div className="sc-cbFqsP bkAFvh" />
									<div className="sc-gTgzIj fTLLNh">
										<div className="sc-kQoRyN eZqfDk">
											<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="16px">
												<path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 7.75C10.8917 7.75 9.96738 8.47508 9.72413 9.3771C9.61628 9.77702 9.20465 10.0138 8.80472 9.90595C8.40479 9.7981 8.16802 9.38647 8.27587 8.98654C8.70934 7.37913 10.2678 6.25 12 6.25C14.0801 6.25 15.75 7.87091 15.75 9.90909C15.75 11.3648 14.6776 12.0945 13.9756 12.5722C13.9577 12.5844 13.9399 12.5964 13.9225 12.6083C13.0988 13.1699 12.75 13.4581 12.75 14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14C11.25 12.6066 12.3013 11.8947 12.9848 11.4319C13.0165 11.4104 13.0475 11.3894 13.0775 11.369C13.8779 10.8232 14.25 10.5071 14.25 9.90909C14.25 8.73398 13.2867 7.75 12 7.75ZM12 16.24C12.4142 16.24 12.75 16.5758 12.75 16.99V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V16.99C11.25 16.5758 11.5858 16.24 12 16.24Z" fill="currentColor" />
											</svg>
										</div>
									</div>
								</div> */}
								<div className="sc-cMJmvu hGyZNO">
									{/* <div className="sc-glnKDv dGlbCW">
										<span type="secondary" className="sc-iqHYGH fwttXz">Hãy dùng ảnh thật, không trùng, không chèn số điện thoại. Mỗi ảnh kích thước tối thiểu 400x400, tối đa 15 MB. Số lượng ảnh tối đa tuỳ theo loại tin. Xem thêm <a href="/quy-dinh-dang-tin/hinh-anh" target="_blank" rel="noreferrer"> <span className="sc-dIUggk xEfgI">Quy định đăng tin</span></a>.</span>
										<section>
											<div>
												<div className="sc-kZNjfP kdniOn">
													<input accept="image/*,.heic" multiple type="file" style={{ display: 'none' }} />
													<svg width={80} height={80} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M118.42 75.84C118.43 83.2392 116.894 90.5589 113.91 97.33H16.09C12.8944 90.0546 11.3622 82.1579 11.6049 74.2154C11.8477 66.2728 13.8593 58.4844 17.4932 51.4177C21.1271 44.3511 26.2918 38.1841 32.6109 33.3662C38.93 28.5483 46.2443 25.2008 54.0209 23.5676C61.7976 21.9345 69.8406 22.0568 77.564 23.9257C85.2873 25.7946 92.4965 29.363 98.6661 34.3709C104.836 39.3787 109.81 45.6999 113.228 52.8739C116.645 60.0478 118.419 67.8937 118.42 75.84Z" fill="#F2F2F2" />
														<path d="M5.54 97.33H126.37" stroke="#63666A" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" />
														<path d="M97 97.33H49.91V34.65C49.91 34.3848 50.0154 34.1305 50.2029 33.9429C50.3904 33.7554 50.6448 33.65 50.91 33.65H84.18C84.6167 33.6541 85.0483 33.7445 85.4499 33.9162C85.8515 34.0878 86.2152 34.3372 86.52 34.65L96.02 44.15C96.3321 44.4533 96.5811 44.8153 96.7527 45.2151C96.9243 45.615 97.0152 46.0449 97.02 46.48L97 97.33Z" fill="#D7D7D7" stroke="#63666A" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M59.09 105.64H42.09C41.8248 105.64 41.5704 105.535 41.3829 105.347C41.1954 105.16 41.09 104.905 41.09 104.64V41.79C41.09 41.5248 41.1954 41.2705 41.3829 41.0829C41.5704 40.8954 41.8248 40.79 42.09 40.79H77.33L89 52.42V104.62C89 104.885 88.8946 105.14 88.7071 105.327C88.5196 105.515 88.2652 105.62 88 105.62H74.86" fill="white" />
														<path d="M59.09 105.64H42.09C41.8248 105.64 41.5704 105.535 41.3829 105.347C41.1954 105.16 41.09 104.905 41.09 104.64V41.79C41.09 41.5248 41.1954 41.2705 41.3829 41.0829C41.5704 40.8954 41.8248 40.79 42.09 40.79H77.33L89 52.42V104.62C89 104.885 88.8946 105.14 88.7071 105.327C88.5196 105.515 88.2652 105.62 88 105.62H74.86" stroke="#63666A" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" />
														<path d="M88.97 52.42H77.33V40.77L88.97 52.42Z" fill="#D7D7D7" stroke="#63666A" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M27.32 65.49V70.6" stroke="#D7D7D7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M29.88 68.04H24.76" stroke="#D7D7D7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M110.49 32.5601V39.9901" stroke="#D7D7D7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M114.2 36.27H106.77" stroke="#D7D7D7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M34.07 14.58V25.59" stroke="#D7D7D7" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
														<path d="M39.57 20.08H28.57" stroke="#D7D7D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M67 115.86V67.12" stroke="#63666A" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" />
														<path d="M55.5 78.61L67 67.12L78.5 78.61" fill="white" />
														<path d="M55.5 78.61L67 67.12L78.5 78.61" stroke="#63666A" strokeWidth={1} strokeMiterlimit={10} />
													</svg>
													<div className="sc-iBPRYJ jfvWqv">Bấm để chọn ảnh cần tải lên</div>
													<div className="sc-iBPRYJ oLMna" style={{ marginBottom: '16px' }}>hoặc kéo thả ảnh vào đây</div>
												</div>
											</div>
										</section>
									</div> */}
									<div className="sc-Fyfyc eqtGSF">
										<div className="sc-jXktwP hMtZrn">
											{/* <div className="sc-dUrnRO AXFeE">
												<span className="sc-fXoxut bWOcTw">
													<div className="sc-aAhaV hmZIoz">
														<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="24px">
															<circle cx="12.5" cy="12.5" r="9.5" stroke="currentColor" strokeWidth="1.5" />
															<path d="M10.5 10.5017C10.5 9.70299 11.3901 9.22659 12.0547 9.66963L15.2519 11.8011C15.8457 12.1969 15.8457 13.0694 15.2519 13.4652L12.0547 15.5967C11.3901 16.0397 10.5 15.5633 10.5 14.7646V10.5017Z" fill="currentColor" />
														</svg>
													</div>
												</span>
												<div className="sc-iBPRYJ jfvWqv sc-fmlJLJ fOPGoU">Thêm video từ Youtube</div>
											</div> */}
											{/* <div className="sc-jmhFOf fFGAIg">
												<div className="sc-gYfyDA juKlQY">
													<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</div>
											</div> */}
										</div>
									</div>
									<div className="sc-bKfpMw bDFxcZ" />
									<div className="sc-Fyfyc eqtGSF">
										<div className="sc-jXktwP hMtZrn">
											{/* <div className="sc-dUrnRO AXFeE">
												<span className="sc-fXoxut bWOcTw">
													<div className="sc-aAhaV hmZIoz">
														<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="24px">
															<path d="M20.3333 12.3335C21.3864 12.9618 22 13.7159 22 14.5268C22 16.4457 18.5644 18.0466 14 18.4141C13.3538 18.4662 12.6849 18.4935 12 18.4935C11.776 18.4935 11.5537 18.4906 11.3333 18.4848C11.109 18.479 10.8867 18.4702 10.6667 18.4585M3.67756 12.3335C2.62005 12.961 2 13.7137 2 14.5268C2 16.2538 4.78277 17.7232 8.66667 18.2678M8.66667 18.2678L7.33333 16.2535M8.66667 18.2678L6 19.3335" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M5.58569 7.02734H6.33765C6.69572 7.02734 6.96102 6.93783 7.13354 6.75879C7.30607 6.57975 7.39233 6.34212 7.39233 6.0459C7.39233 5.75944 7.30607 5.53646 7.13354 5.37695C6.96427 5.21745 6.7299 5.1377 6.43042 5.1377C6.16024 5.1377 5.934 5.21257 5.75171 5.3623C5.56942 5.50879 5.47827 5.70085 5.47827 5.93848H4.06714C4.06714 5.56738 4.16642 5.23535 4.36499 4.94238C4.56681 4.64616 4.84676 4.41504 5.20483 4.24902C5.56616 4.08301 5.9633 4 6.39624 4C7.14819 4 7.73739 4.18066 8.16382 4.54199C8.59025 4.90007 8.80347 5.39486 8.80347 6.02637C8.80347 6.35189 8.70418 6.65137 8.50562 6.9248C8.30705 7.19824 8.04663 7.4082 7.72437 7.55469C8.12476 7.69792 8.42261 7.91276 8.61792 8.19922C8.81649 8.48568 8.91577 8.82422 8.91577 9.21484C8.91577 9.84635 8.68465 10.3525 8.22241 10.7334C7.76343 11.1143 7.1547 11.3047 6.39624 11.3047C5.6866 11.3047 5.10555 11.1175 4.65308 10.7432C4.20386 10.3688 3.97925 9.87402 3.97925 9.25879H5.39038C5.39038 9.52572 5.48966 9.74381 5.68823 9.91309C5.89006 10.0824 6.13745 10.167 6.43042 10.167C6.76571 10.167 7.02775 10.0791 7.21655 9.90332C7.40861 9.72428 7.50464 9.48828 7.50464 9.19531C7.50464 8.48568 7.11401 8.13086 6.33276 8.13086H5.58569V7.02734Z" fill="currentColor" />
															<path d="M13.7205 4.02441V5.18652H13.5837C12.9457 5.19629 12.4314 5.3623 12.0408 5.68457C11.6534 6.00684 11.4207 6.45443 11.3425 7.02734C11.7201 6.64323 12.197 6.45117 12.7732 6.45117C13.3917 6.45117 13.8832 6.67253 14.2478 7.11523C14.6124 7.55794 14.7947 8.14062 14.7947 8.86328C14.7947 9.32552 14.6938 9.74381 14.4919 10.1182C14.2934 10.4925 14.0102 10.7839 13.6423 10.9922C13.2778 11.2005 12.8643 11.3047 12.4021 11.3047C11.6534 11.3047 11.0479 11.0443 10.5857 10.5234C10.1267 10.0026 9.89722 9.30762 9.89722 8.43848V7.93066C9.89722 7.15918 10.0421 6.47884 10.3318 5.88965C10.6248 5.2972 11.043 4.83984 11.5867 4.51758C12.1335 4.19206 12.7667 4.02767 13.4861 4.02441H13.7205ZM12.3435 7.58398C12.1156 7.58398 11.9089 7.64421 11.7234 7.76465C11.5378 7.88184 11.4011 8.03809 11.3132 8.2334V8.66309C11.3132 9.13509 11.406 9.50456 11.5916 9.77148C11.7771 10.0352 12.0375 10.167 12.3728 10.167C12.6755 10.167 12.9197 10.0482 13.1052 9.81055C13.294 9.56966 13.3884 9.25879 13.3884 8.87793C13.3884 8.49056 13.294 8.17806 13.1052 7.94043C12.9164 7.7028 12.6625 7.58398 12.3435 7.58398Z" fill="currentColor" />
															<path d="M20.4197 8.26758C20.4197 9.25065 20.2162 10.0026 19.8093 10.5234C19.4024 11.0443 18.8067 11.3047 18.0222 11.3047C17.2475 11.3047 16.655 11.0492 16.2449 10.5381C15.8347 10.027 15.6248 9.2946 15.615 8.34082V7.03223C15.615 6.03939 15.8201 5.28581 16.2302 4.77148C16.6436 4.25716 17.2377 4 18.0125 4C18.7872 4 19.3796 4.25553 19.7898 4.7666C20.2 5.27441 20.4099 6.00521 20.4197 6.95898V8.26758ZM19.0085 6.83203C19.0085 6.24284 18.9272 5.81478 18.7644 5.54785C18.6049 5.27767 18.3542 5.14258 18.0125 5.14258C17.6804 5.14258 17.4347 5.27116 17.2751 5.52832C17.1189 5.78223 17.0359 6.18099 17.0261 6.72461V8.45312C17.0261 9.03255 17.1042 9.46387 17.2605 9.74707C17.42 10.027 17.6739 10.167 18.0222 10.167C18.3673 10.167 18.6163 10.0319 18.7693 9.76172C18.9223 9.49154 19.002 9.07812 19.0085 8.52148V6.83203Z" fill="currentColor" />
														</svg>
													</div>
												</span>
												<div className="sc-iBPRYJ jfvWqv sc-fmlJLJ fOPGoU">Hướng dẫn đăng ảnh 360°</div>
											</div> */}
											{/* <div className="sc-jmhFOf fFGAIg">
												<div className="sc-gYfyDA juKlQY">
													<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="sc-jrpKwx jChZsf">
								{/* <h3 className="sc-dlfnbm lhekIy sc-jKzNgy cuXlHH">Thông tin liên hệ</h3> */}
								<div className="sc-gQqokz hBrndl">
									{/* <div className="sc-gGTGfU fSjCQg sc-hxhkai cKGeJg">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
											Tên liên hệ
											<div className="sc-kstrdz kihuz">&nbsp;*</div>
										</div>
										<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.9837390651593634" id="name" maxLength={200} placeholder="Nhập tên" className="sc-dcwrBW iDAuKv" defaultValue="Tran Ngoc Hoang" /></div>
									</div> */}
									<div className="sc-frRhtF ehlgdK">
										{/* <div className="sc-bvVdbW fsfWuT sc-WdzTA icDWSI">
											<div color="cyan" className="sc-btdgZA RmMeE">
												<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<line x1="4.75" y1="12.25" x2="18.25" y2="12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
													<line x1="11.75" y1="5.75" x2="11.75" y2="19.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<div color="cyan" className="sc-kstrdz dPmahJ sc-ekboDZ hzGhJg">Thêm</div>
										</div> */}
										{/* <div className="sc-kkjstb ghUCIz sc-cvwzgI daXzoq">
											<div className="sc-dwqbIM lgnhdE">
												<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">
													Số điện thoại
													<div className="sc-kstrdz kihuz">&nbsp;*</div>
												</div>
												<div className="sc-fTNIDv ieXpgb">
													<div className="sc-gTgzIj fTLLNh sc-biOYSp enqmnf" style={{ width: '100%' }}>
														<div className="sc-licaXj kCALOO">
															<div id="mobile" placeholder="Chọn số đã đăng ký" className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>
																<div className="sc-iBPRYJ jfvWqv sc-bTRMAZ gfyNKU placeholder">Chọn số đã đăng ký</div>
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
										</div> */}
									</div>
								</div>
								<div className="sc-ktBSnf klQNLu">
									{/* <div className="sc-gGTGfU fSjCQg sc-hxhkai cKGeJg">
										<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Địa chỉ</div>
										<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.03807821970499603" maxLength={200} placeholder="Nhập địa chỉ" className="sc-dcwrBW iDAuKv" defaultValue /></div>
									</div> */}
									{/* <div className="sc-frRhtF ehlgdK">
										<div className="sc-gGTGfU fSjCQg sc-jwsIVb gMKkZH">
											<div className="sc-kstrdz dPmahJ sc-JooDp cMcpet">Email</div>
											<div className="sc-hFXnzx fjFzkC"><input name="pgds-0.7746497900775222" id="email" maxLength={100} placeholder="Nhập email" type="email" className="sc-dcwrBW iDAuKv" defaultValue="ngochoang0109giolinh@gmail.com" /></div>
										</div>
									</div> */}
								</div>
							</div>
						</div>
						{/* <div className="sc-fQHbyX fwOWeI">
							<div>
								<div className="sc-hSaFeN hCKySk">
									<div>
										<div className="sc-gMFxnT ffKXqq">
											<button data-tracking-id="preview-listing-lcp" type="border" color="secondary" className="sc-kLgntA jXvlyk">
												<div className="sc-iktFzd gaGeRK"><span className="sc-iwyYcG gBmyGv">Xem trước giao diện</span></div>
											</button>
											<button data-tracking-id="submit-checkout-lcp" id="save-button" type="solid" color="primary" className="sc-kLgntA hjHBEZ">
												<div className="sc-iktFzd gaGeRK">
													<span className="sc-iwyYcG gBmyGv">Tiếp tục</span>
													<span className="sc-hiSbYr huRFSL">
														<div className="sc-gWHgXt ikxKmn">
															<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path xmlns="http://www.w3.org/2000/svg" d="M9 20L17 12L9 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														</div>
													</span>
												</div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div> */}
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
													<div id="vip_type" placeholder className="sc-hJxCPi gpzJyv" style={{ width: '100%' }}>Tin thường</div>
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
													<div id="posting_hours" placeholder disabled className="sc-hJxCPi aoAxu" style={{ width: '100%' }}>Chọn khung giờ</div>
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