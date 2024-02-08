import { Fragment, useEffect, useState } from "react"
import { inputConstant } from "../../../constant/inputConstant"
import InputBox from "../../../components/common/InputBox/InputBox"

const UserInfor = () => {
	const [currentUser, setCurrentUser] = useState({
		fullname: '',
		phone: '',
		address: '',
		email: ''
	})

	useEffect(() => {
	}, [])
	return <Fragment>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Thông tin tài khoản</h3>
					</div>
				</div>
			</div>
			<div className="container-right-bar">
				<div className="ant-row wrap-table">
					<div className="ant-col first-col">
						<div style={{ display: 'flex', flexDirection: 'column' }} className='first-col-wrap'>
							<div className="infor-basic">
								<h3 className="mb-16 font-stand">Thông tin tài khoản</h3>
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
														value={currentUser.fullname}
														onChange={()=>{}}></InputBox>
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
														name='phone'
														onChange={()=>{}}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div style={{ "marginBottom": "16px" }}>

								</div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="title-index">
												Địa chỉ
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														placeholder={`Nhập tên bất động sản`}
														// onChange={handleGetValue}
														name='tower'
														type='text'
														onChange={()=>{}}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div style={{ "marginBottom": "16px" }}>

								</div>
								<div className="input-selection">
									<div className="input-selection-level-one" style={{ width: '100%' }}>
										<InputBox mode={inputConstant.DROP_DOWN_LIST}
											placeholder={`Chọn quyền`}
											data={[{name:'Quản trị viên',id :0},{name:'Người dùng', id:1}]}
											name='typeOfPost'
											onChange={()=>{}}></InputBox>
									</div>
								</div>
								<div className="fields-form">
									<div className="wrapper-input-level-1 p-r-8">
										<div className="wrapper-input-level-2">
											<div className="label-input">
												Tên tài khoản
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<div className="input-selection">
												<div className="input-selection-level-one" style={{ width: '100%' }}>
													<InputBox mode={inputConstant.INPUT_TEXT_BOX}
														name='addressOfAuthor'
														value={currentUser.address ? currentUser.address : 'HoangTN'}
														type='text'
														onChange={()=>{}}></InputBox>
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
														name='email'
														onChange={()=>{}}></InputBox>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div style={{ "marginBottom": "16px" }}>

								</div>
								<div className="flex-col">
									<div className="grid">
										<div className="flex-col">
											<div className="label-input">
												Thay đổi ảnh đại diện
												<div className="sc-kstrdz kihuz">&nbsp;*</div>
											</div>
											<InputBox mode={inputConstant.MEDIA_BOX}
												name='images'
											// onChange={handleSetImages}
											></InputBox>
										</div>
										<div className="preview-images">
											{/* {handlePreviewImage()} */}
										</div>
									</div>
								</div>
							</div>
							<div className="footer-button">
								<div className="wrap-button">
									<div className="flex-between">
										<button className="btn-right">
											<div className="bKiBMa">
												<span className="dUUUwk">Thoát</span>
											</div>
										</button>
										<button className="btn-left"
											onClick={() => {

											}}>
											<div className="bKiBMa">
												<span className="dUUUwk">Cập nhật</span>
												<span className="jBNrga">
													<div className="cCSKON">
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
					</div>
				</div>
			</div>
		</div>
	</Fragment>
}

export default UserInfor