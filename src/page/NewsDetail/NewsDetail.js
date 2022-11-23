import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatCommon } from '../../common/format.common'
import SlideImage from '../../components/user/SlideImage/SlideImage'
import { PostNewsService } from '../../service/PostNewsService'
import './NewsDetail.css'
import user from './../../assets/user.png'

const NewsDetail = () => {

	const param = useParams()
	const [detailPost, setDetailPost] = useState({ price: 0 })

	useEffect(() => {
		PostNewsService.getPostDetail(param.id).then((data) => {
			console.log(data)
			setDetailPost(data)
		})
	}, [])

	return <div className='news-detail-layout'>
		<div className='news-detail-left'>
			<SlideImage></SlideImage>
			<div className='news-detail-tag'>
				<Link className="re__link-se" to="/ban-can-ho-chung-cu-tp-hcm" >
					{detailPost.province}
				</Link>
				<span>/</span>
				<Link className="re__link-se" to="/ban-can-ho-chung-cu-quan-2" >{detailPost.district}</Link>
				<span>/</span>
				<Link className="re__link-se" to="/ban-can-ho-chung-cu-quan-2" >{detailPost.ward}</Link>
				<span>/</span>
				<Link className="re__link-se" to="/ban-can-ho-chung-cu-empire-city-thu-thiem" >
					{`${detailPost.typeOfPost} tại ${detailPost.street}`}
				</Link>
			</div>
			<div className='news-detail-content'>
				<h1 className="re__pr-title pr-title">{detailPost.title}</h1>
				<span className="re__pr-short-description js__pr-address">
					{`${detailPost.typeOfPost} ${detailPost.tower}, ${detailPost.street}, ${detailPost.ward}, ${detailPost.district}, ${detailPost.province}`}
				</span>
				<div>
					<div className="re__pr-short-info js__pr-short-info">
						<div className="re__pr-short-info-item js__pr-short-info-item">
							<span className="title">Mức giá</span>
							<span className="value">{formatCommon.convertPriceToStringVn(detailPost.price)}</span>
						</div>
						<div className="re__pr-short-info-item js__pr-short-info-item">
							<span className="title">Diện tích</span>
							<span className="value">{detailPost.area} m²</span>
						</div>
						{detailPost.numOfBed === 0 ? <Fragment></Fragment> : <div className="re__pr-short-info-item js__pr-short-info-item">
							<span className="title">Phòng ngủ</span>
							<span className="value">{detailPost.numOfBed} PN</span>
						</div>}

						<div className="js__marking-product 
							re__btn re__btn-se-ghost--md re__btn-icon--md 
							re__pr-short-info-action re__marking-product">
						</div>

					</div>
					<div className="re__section re__pr-description js__section">
						<span className="re__section-title">Thông tin mô tả</span>
						<div className="re__section-body re__detail-content js__section-body js__pr-description js__tracking"
							style={{ "whiteSpace": "pre-line" }}>
							{detailPost.description}</div>
					</div>
				</div>
			</div>
			<div className="re__section re__pr-specs re__pr-specs-v1 js__section">
				<span className="re__section-title">Đặc điểm bất động sản</span>
				<div className="re__section-body re__border--std js__section-body">
					<span className="re__pr-specs-product-type">Loại tin đăng: {detailPost.typeOfPost}</span>
					<div className="re__pr-specs-content js__other-info">
						<div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon">
								<i className="re__icon-size" /></span>
							<span className="re__pr-specs-content-item-title">Diện tích</span>
							<span className="re__pr-specs-content-item-value">{detailPost.area} m²</span>
						</div>
						<div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-money" /></span>
							<span className="re__pr-specs-content-item-title">Mức giá</span>
							<span className="re__pr-specs-content-item-value">{formatCommon.convertPriceToStringVn(detailPost.price)}</span>
						</div>
						{detailPost.directionHouse ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-front-view" /></span>
							<span className="re__pr-specs-content-item-title">Hướng nhà</span>
							<span className="re__pr-specs-content-item-value">{detailPost.directionHouse}</span>
						</div> : <Fragment></Fragment>}
						{detailPost.directionBalcony ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-front-view" /></span>
							<span className="re__pr-specs-content-item-title">Hướng ban công</span>
							<span className="re__pr-specs-content-item-value">{detailPost.directionBalcony}</span>
						</div> : <Fragment></Fragment>}
						{detailPost.numOfBed ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-bedroom" /></span>
							<span className="re__pr-specs-content-item-title">Số phòng ngủ</span>
							<span className="re__pr-specs-content-item-value">{detailPost.numOfBed} phòng</span>
						</div> : <Fragment></Fragment>}
						{detailPost.numOfToilet ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-bath" /></span>
							<span className="re__pr-specs-content-item-title">Số toilet</span>
							<span className="re__pr-specs-content-item-value">{detailPost.numOfToilet} phòng</span>
						</div> : <Fragment></Fragment>}
						{detailPost.numOfFloor ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-bath" /></span>
							<span className="re__pr-specs-content-item-title">Số tầng</span>
							<span className="re__pr-specs-content-item-value">{detailPost.numOfFloor} tầng</span>
						</div> : <Fragment></Fragment>}
						{detailPost.floorNumber ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-document" /></span>
							<span className="re__pr-specs-content-item-title">Thuộc tầng số</span>
							<span className="re__pr-specs-content-item-value">{detailPost.floorNumber}</span>
						</div> : <Fragment></Fragment>}
						{detailPost.furniture ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-document" /></span>
							<span className="re__pr-specs-content-item-title">Tình trạng nội thất</span>
							<span className="re__pr-specs-content-item-value">{detailPost.furniture}</span>
						</div> : <Fragment></Fragment>}
						{detailPost.tower ? <div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-document" /></span>
							<span className="re__pr-specs-content-item-title">Tên bất động sản</span>
							<span className="re__pr-specs-content-item-value">{detailPost.tower}</span>
						</div> : <Fragment></Fragment>}
						<div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-document" /></span>
							<span className="re__pr-specs-content-item-title">Tiện ích đi kèm</span>
							<span className="re__pr-specs-content-item-value">Đang xử lý</span>
						</div>
						<div className="re__pr-specs-content-item">
							<span className="re__pr-specs-content-item-icon"><i className="re__icon-document" /></span>
							<span className="re__pr-specs-content-item-title">Pháp lý</span>
							<span className="re__pr-specs-content-item-value">Hợp đồng mua bán</span>
						</div>
					</div>
				</div>
			</div>
			<div className="re__section re__pr-map js__section">
				<span className="re__section-title">Xem trên bản đồ</span>
				<div className="re__section-body js__section-body">
					<iframe className=" lazyloaded" data-src="https://www.google.com/maps/embed/v1/place?q=10.7698259353638,106.716209411621&key=AIzaSyAMd45cCGHSmsM2a5APxYRdOwV8kX-4m40" frameBorder={0} style={{ border: 0 }} allowFullScreen />
					<div className="map-overlay" />
				</div>
			</div>
			<div className="re__section re__pr-short-info re__pr-config js__pr-config">
				<div className="re__pr-short-info-item js__pr-config-item">
					<span className="title">Ngày đăng</span>
					<span className="value">{formatCommon.formatWithTimeDate(detailPost.startedDate)}</span>
				</div>
				<div className="re__pr-short-info-item js__pr-config-item">
					<span className="title">Ngày hết hạn</span>
					<span className="value">{formatCommon.formatWithTimeDate(detailPost.closedDate)}</span>
				</div>
				<div className="re__pr-short-info-item js__pr-config-item">
					<span className="title">Loại tin</span>
					<span className="value">{detailPost.typeExpense}</span>
				</div>
				<div className="re__pr-short-info-item js__pr-config-item">
					<span className="title">Mã tin</span>
					<span className="value">#{detailPost.postId}</span>
				</div>
			</div>
			<div className="re__section re__pr-more-listing re__similar-listing js__section js__similar-listing">
				<span tracking-id="same-area-title-ldp" className="re__section-title" data-gtm-vis-recent-on-screen-30361783_307={107345} data-gtm-vis-first-on-screen-30361783_307={107345} data-gtm-vis-total-visible-time-30361783_307={100} data-gtm-vis-has-fired-30361783_307={1}>
					Bất động sản dành cho bạn
					<a className="re__btn re__btn-se-border--sm re__btn-icon--sm js__go-right">
						<i className="re__icon-chevron-right--sm" />
						<a>Video icons created by gungyoga04 - Flaticon</a>
					</a>
					<a className="re__btn re__btn-se-border--sm re__btn-icon--sm js__go-left swiper-button-disabled">
						<i className="re__icon-chevron-left--sm" />
					</a>
				</span>
				<div className="re__section-body js__section-body">
					<div className="swiper-container re__swiper-container swiper-container-initialized swiper-container-horizontal">
						<div className="swiper-wrapper js__similar-listing-recommendations" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
							<div className="swiper-slide swiper-slide-visible swiper-slide-active" style={{ display: 'inline-block', width: 'unset' }}>
								<div className="js__card js__card-compact-web
     pr-container re__card-compact vip5 re__vip-5" prav="https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg" uid={1874228} prid={35728415} vtp="vipFive" clo="ldre">
									<a className="js__product-link-for-product-id" data-product-id={35728415} href="/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415" title="Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí" tracking-id="same-area-listing-ldp" tracking-label="prid=35728415,src=pg">
										<div className="re__card-image">
											<img alt="Ảnh đại diện" className="pr-img lazyloaded" abc="3.20221014110532-fc1f_wm.jpg" data-src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" />

										</div>
										<div className="re__card-info">
											<div className="re__card-info-content">
												<div className="re__card-title">
													<h3 className="js__card-title vipFive">
														Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí
													</h3>
												</div>
												<div className="re__card-config">
													<span className="re__card-config-price">7.6 tỷ</span>
													<span className="re__card-config-dot">·</span><span className="re__card-config-area">103 m²</span>
													<div style={{ clear: 'left' }} />
												</div>
												<div className="re__card-location">
													Quận 2, Hồ Chí Minh
												</div>
												<div style={{ clear: 'left' }} />
												<div className="re__card-contact">
													<div className="re__card-published-info">
														<span className="re__card-published-info-published-at" aria-label="21/11/2022" data-microtip-position="right" role="tooltip">
															2 ngày trước
														</span>
													</div>
													<div className="re__card-contact-button">
														<span className="js__marking-product re__btn re__btn-se-border--sm re__btn-icon--sm" data-marked-product-info-as-json="{&quot;productId&quot;:35728415,&quot;avatarinfowap&quot;:&quot;https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg&quot;,&quot;vipType&quot;:5,&quot;title&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;titleHiddenMobile&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;url&quot;:&quot;/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415&quot;}" aria-label="Bấm để lưu tin" data-microtip-position="bottom" role="tooltip" tracking-id="save-listing" tracking-label="loc=Sale-Listing Details,src=pg,status=save" title>
															<i className="re__icon-heart--sm" />
															<i className="re__icon-heart-pressed--sm" />
														</span>
													</div>
													<div style={{ clear: 'left' }} />
												</div>
											</div>
										</div>
										<div style={{ clear: 'left' }} />
									</a>
								</div>
							</div>
							<div className="swiper-slide swiper-slide-visible swiper-slide-active" style={{ display: 'inline-block', width: 'unset' }}>
								<div className="js__card js__card-compact-web
     pr-container re__card-compact vip5 re__vip-5" prav="https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg" uid={1874228} prid={35728415} vtp="vipFive" clo="ldre">
									<a className="js__product-link-for-product-id" data-product-id={35728415} href="/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415" title="Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí" tracking-id="same-area-listing-ldp" tracking-label="prid=35728415,src=pg">
										<div className="re__card-image">
											<img alt="Ảnh đại diện" className="pr-img lazyloaded" abc="3.20221014110532-fc1f_wm.jpg" data-src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" />

										</div>
										<div className="re__card-info">
											<div className="re__card-info-content">
												<div className="re__card-title">
													<h3 className="js__card-title vipFive">
														Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí
													</h3>
												</div>
												<div className="re__card-config">
													<span className="re__card-config-price">7.6 tỷ</span>
													<span className="re__card-config-dot">·</span><span className="re__card-config-area">103 m²</span>
													<div style={{ clear: 'left' }} />
												</div>
												<div className="re__card-location">
													Quận 2, Hồ Chí Minh
												</div>
												<div style={{ clear: 'left' }} />
												<div className="re__card-contact">
													<div className="re__card-published-info">
														<span className="re__card-published-info-published-at" aria-label="21/11/2022" data-microtip-position="right" role="tooltip">
															2 ngày trước
														</span>
													</div>
													<div className="re__card-contact-button">
														<span className="js__marking-product re__btn re__btn-se-border--sm re__btn-icon--sm" data-marked-product-info-as-json="{&quot;productId&quot;:35728415,&quot;avatarinfowap&quot;:&quot;https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg&quot;,&quot;vipType&quot;:5,&quot;title&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;titleHiddenMobile&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;url&quot;:&quot;/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415&quot;}" aria-label="Bấm để lưu tin" data-microtip-position="bottom" role="tooltip" tracking-id="save-listing" tracking-label="loc=Sale-Listing Details,src=pg,status=save" title>
															<i className="re__icon-heart--sm" />
															<i className="re__icon-heart-pressed--sm" />
														</span>
													</div>
													<div style={{ clear: 'left' }} />
												</div>
											</div>
										</div>
										<div style={{ clear: 'left' }} />
									</a>
								</div>
							</div>
							<div className="swiper-slide swiper-slide-visible swiper-slide-active" style={{ display: 'inline-block', width: 'unset' }}>
								<div className="js__card js__card-compact-web
     pr-container re__card-compact vip5 re__vip-5" prav="https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg" uid={1874228} prid={35728415} vtp="vipFive" clo="ldre">
									<a className="js__product-link-for-product-id" data-product-id={35728415} href="/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415" title="Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí" tracking-id="same-area-listing-ldp" tracking-label="prid=35728415,src=pg">
										<div className="re__card-image">
											<img alt="Ảnh đại diện" className="pr-img lazyloaded" abc="3.20221014110532-fc1f_wm.jpg" data-src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" />

										</div>
										<div className="re__card-info">
											<div className="re__card-info-content">
												<div className="re__card-title">
													<h3 className="js__card-title vipFive">
														Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí
													</h3>
												</div>
												<div className="re__card-config">
													<span className="re__card-config-price">7.6 tỷ</span>
													<span className="re__card-config-dot">·</span><span className="re__card-config-area">103 m²</span>
													<div style={{ clear: 'left' }} />
												</div>
												<div className="re__card-location">
													Quận 2, Hồ Chí Minh
												</div>
												<div style={{ clear: 'left' }} />
												<div className="re__card-contact">
													<div className="re__card-published-info">
														<span className="re__card-published-info-published-at" aria-label="21/11/2022" data-microtip-position="right" role="tooltip">
															2 ngày trước
														</span>
													</div>
													<div className="re__card-contact-button">
														<span className="js__marking-product re__btn re__btn-se-border--sm re__btn-icon--sm" data-marked-product-info-as-json="{&quot;productId&quot;:35728415,&quot;avatarinfowap&quot;:&quot;https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg&quot;,&quot;vipType&quot;:5,&quot;title&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;titleHiddenMobile&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;url&quot;:&quot;/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415&quot;}" aria-label="Bấm để lưu tin" data-microtip-position="bottom" role="tooltip" tracking-id="save-listing" tracking-label="loc=Sale-Listing Details,src=pg,status=save" title>
															<i className="re__icon-heart--sm" />
															<i className="re__icon-heart-pressed--sm" />
														</span>
													</div>
													<div style={{ clear: 'left' }} />
												</div>
											</div>
										</div>
										<div style={{ clear: 'left' }} />
									</a>
								</div>
							</div>
							<div className="swiper-slide swiper-slide-visible swiper-slide-active" style={{ display: 'inline-block', width: 'unset' }}>
								<div className="js__card js__card-compact-web
     pr-container re__card-compact vip5 re__vip-5" prav="https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg" uid={1874228} prid={35728415} vtp="vipFive" clo="ldre">
									<a className="js__product-link-for-product-id" data-product-id={35728415} href="/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415" title="Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí" tracking-id="same-area-listing-ldp" tracking-label="prid=35728415,src=pg">
										<div className="re__card-image">
											<img alt="Ảnh đại diện" className="pr-img lazyloaded" abc="3.20221014110532-fc1f_wm.jpg" data-src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" />

										</div>
										<div className="re__card-info">
											<div className="re__card-info-content">
												<div className="re__card-title">
													<h3 className="js__card-title vipFive">
														Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí
													</h3>
												</div>
												<div className="re__card-config">
													<span className="re__card-config-price">7.6 tỷ</span>
													<span className="re__card-config-dot">·</span><span className="re__card-config-area">103 m²</span>
													<div style={{ clear: 'left' }} />
												</div>
												<div className="re__card-location">
													Quận 2, Hồ Chí Minh
												</div>
												<div style={{ clear: 'left' }} />
												<div className="re__card-contact">
													<div className="re__card-published-info">
														<span className="re__card-published-info-published-at" aria-label="21/11/2022" data-microtip-position="right" role="tooltip">
															2 ngày trước
														</span>
													</div>
													<div className="re__card-contact-button">
														<span className="js__marking-product re__btn re__btn-se-border--sm re__btn-icon--sm" data-marked-product-info-as-json="{&quot;productId&quot;:35728415,&quot;avatarinfowap&quot;:&quot;https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg&quot;,&quot;vipType&quot;:5,&quot;title&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;titleHiddenMobile&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;url&quot;:&quot;/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415&quot;}" aria-label="Bấm để lưu tin" data-microtip-position="bottom" role="tooltip" tracking-id="save-listing" tracking-label="loc=Sale-Listing Details,src=pg,status=save" title>
															<i className="re__icon-heart--sm" />
															<i className="re__icon-heart-pressed--sm" />
														</span>
													</div>
													<div style={{ clear: 'left' }} />
												</div>
											</div>
										</div>
										<div style={{ clear: 'left' }} />
									</a>
								</div>
							</div>
							<div className="swiper-slide swiper-slide-visible swiper-slide-active" style={{ display: 'inline-block', width: 'unset' }}>
								<div className="js__card js__card-compact-web
     pr-container re__card-compact vip5 re__vip-5" prav="https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg" uid={1874228} prid={35728415} vtp="vipFive" clo="ldre">
									<a className="js__product-link-for-product-id" data-product-id={35728415} href="/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415" title="Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí" tracking-id="same-area-listing-ldp" tracking-label="prid=35728415,src=pg">
										<div className="re__card-image">
											<img alt="Ảnh đại diện" className="pr-img lazyloaded" abc="3.20221014110532-fc1f_wm.jpg" data-src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" src="https://file4.batdongsan.com.vn/crop/257x147/2022/10/14/20221014110532-fc1f_wm.jpg" />

										</div>
										<div className="re__card-info">
											<div className="re__card-info-content">
												<div className="re__card-title">
													<h3 className="js__card-title vipFive">
														Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí
													</h3>
												</div>
												<div className="re__card-config">
													<span className="re__card-config-price">7.6 tỷ</span>
													<span className="re__card-config-dot">·</span><span className="re__card-config-area">103 m²</span>
													<div style={{ clear: 'left' }} />
												</div>
												<div className="re__card-location">
													Quận 2, Hồ Chí Minh
												</div>
												<div style={{ clear: 'left' }} />
												<div className="re__card-contact">
													<div className="re__card-published-info">
														<span className="re__card-published-info-published-at" aria-label="21/11/2022" data-microtip-position="right" role="tooltip">
															2 ngày trước
														</span>
													</div>
													<div className="re__card-contact-button">
														<span className="js__marking-product re__btn re__btn-se-border--sm re__btn-icon--sm" data-marked-product-info-as-json="{&quot;productId&quot;:35728415,&quot;avatarinfowap&quot;:&quot;https://file4.batdongsan.com.vn/crop/200x140/2022/10/14/20221014110532-fc1f_wm.jpg&quot;,&quot;vipType&quot;:5,&quot;title&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;titleHiddenMobile&quot;:&quot;Bán Duplex 2PN Feliz En Vista - giá tốt 7.6 tỷ (TL) - nội thất cao cấp - xem nhà miễn phí&quot;,&quot;url&quot;:&quot;/ban-can-ho-chung-cu-duong-phan-van-dang-phuong-thanh-my-loi-prj-feliz-en-vista/ban-duplex-2pn-gia-tot-7-6-ty-tl-noi-that-cao-cap-xem-nha-mi-phi-pr35728415&quot;}" aria-label="Bấm để lưu tin" data-microtip-position="bottom" role="tooltip" tracking-id="save-listing" tracking-label="loc=Sale-Listing Details,src=pg,status=save" title>
															<i className="re__icon-heart--sm" />
															<i className="re__icon-heart-pressed--sm" />
														</span>
													</div>
													<div style={{ clear: 'left' }} />
												</div>
											</div>
										</div>
										<div style={{ clear: 'left' }} />
									</a>
								</div>
							</div>
						</div>
						<span className="swiper-notification" aria-live="assertive" aria-atomic="true" /></div>
					<div className="re__card-gradient-right re__hide-item js__card-gradient-right" style={{ display: 'block' }} />
				</div>
			</div>
		</div>
		<div className='news-detail-right'>
			<div className="re__sidebar-box re__contact-box js__contact-box">
				<img className="re__contact-avatar"
					src={detailPost.avatar ? detailPost.avatar : user} />
				<span className="re__prefix-contact-name">Được đăng bởi</span>
				<div className="re__contact-name js_contact-name">{detailPost.fullname}</div>
				<div className="re__contact-link">
					<a tracking-id="user-listing-ldp" className="re__link-se" href="/tin-rao-cung-nguoi-dang-nha-dat-ban-us204789">
						Xem thêm {detailPost.otherPost} tin khác
					</a>
				</div>
				<div className="re__btn re__btn-cyan-solid--md phone js__phone" tracking-id="lead-phone-ldp" tracking-label="loc=Sale-Listing Details-main-button,prid=35769250">
					<span className="phoneEvent js__phone-event" raw="07bf82caafbe4d431dc7486e88a18f7a">
						{detailPost.phone} *** · Hiện số
					</span>
				</div>
			</div>

			<div className="re__sidebar-box re__product-count-box">
				<h2 className="re__sidebar-box-title">Bán căn hộ chung cư theo dự án tại  Quận 2</h2>
				<div className="re__sidebar-box-content">
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-can-ho-dlusso" title="Bán căn hộ chung cư Căn hộ D’Lusso">
							Căn hộ D’Lusso (68)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-can-ho-precia-quan-2" title="Bán căn hộ chung cư Căn hộ Precia Quận 2">
							Căn hộ Precia Quận 2 (42)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-centana-thu-thiem" title="Bán căn hộ chung cư Centana Thủ Thiêm">
							Centana Thủ Thiêm (56)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-diamond-island" title="Bán căn hộ chung cư Diamond Island">
							Diamond Island (328)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-empire-city-thu-thiem" title="Bán căn hộ chung cư Empire City Thủ Thiêm">
							Empire City Thủ Thiêm (103)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-estella-heights" title="Bán căn hộ chung cư Estella Heights">
							Estella Heights (102)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-feliz-en-vista" title="Bán căn hộ chung cư Feliz En Vista">
							Feliz En Vista (234)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-masteri-an-phu" title="Bán căn hộ chung cư Masteri An Phú">
							Masteri An Phú (53)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-masteri-thao-dien" title="Bán căn hộ chung cư Masteri Thảo Điền">
							Masteri Thảo Điền (160)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item ">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-new-city-thu-thiem" title="Bán căn hộ chung cư New City Thủ Thiêm">
							New City Thủ Thiêm (41)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item re__hide-item">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-one-verandah-mapletree" title="Bán căn hộ chung cư One Verandah Mapletree">
							One Verandah Mapletree (101)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item re__hide-item">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-parcspring" title="Bán căn hộ chung cư PARCSpring">
							PARCSpring (34)
						</a>
					</h3>
					<h3 className="re__sidebar-box-item re__hide-item">
						<a tracking-id="srp-suggestion-link" tracking-label="loc=Sale-Listing Details;type=related" className="re__link-se" href="/ban-can-ho-chung-cu-the-estella" title="Bán căn hộ chung cư The Estella">
							The Estella (61)
						</a>
					</h3>
				</div>
			</div>
		</div>

	</div>
}

export default NewsDetail