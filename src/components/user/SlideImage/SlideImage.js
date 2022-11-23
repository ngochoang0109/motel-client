const SlideImage = () => {
	return <div className='news-detail-media'>
		<div className="re__media-preview 
		js__media-preview swiper-container
		swiper-container-initialized 
		swiper-container-horizontal">
			<ul className="swiper-wrapper"
				style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
				<li className="swiper-slide 
			js__media-item-container 
			swiper-slide-active"
					style={{ width: '696px', marginRight: '10px' }}>
					<a className="re__pr-image-cover js__pr-image-cover youtubeMaxres"
						style={{ backgroundImage: 'url("https://i1.ytimg.com/vi/pHnk2Z26hPM/maxresdefault.jpg")' }}> </a>

					<div className="re__overlay js__overlay">
						<img src="https://i1.ytimg.com/vi/pHnk2Z26hPM/maxresdefault.jpg"
							className="pr-img youtubeMaxres" />
					</div>
					<span className="re__bg-media re__icon-play--xl" >
						<svg width="50px" height="50px" style={{
							"border": "2px solid #f2f2f2",
							"borderRadius": "4px",
							"backgroundColor": "#fff"
						}}
							viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
							<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
								<path d="M2368 4325 c-647 -106 -1091 -718 -993 -1368 76 -503 468 -901 985
-998 104 -20 329 -15 440 8 777 166 1184 1013 826 1716 -164 322 -455 548
-806 628 -114 26 -336 33 -452 14z m347 -910 c242 -142 446 -262 452 -268 9
-7 -113 -83 -430 -269 -243 -143 -450 -264 -459 -269 -17 -9 -18 19 -18 531 0
298 3 539 8 537 4 -3 205 -120 447 -262z" />
								<path d="M240 957 c0 -346 3 -454 14 -489 18 -63 68 -132 121 -168 93 -64 -44
-60 2211 -58 l2049 3 55 26 c70 33 126 89 159 159 l26 55 3 458 3 457 -2321 0
-2320 0 0 -443z m1505 79 c88 -41 136 -116 136 -215 1 -99 -47 -176 -136 -217
-89 -42 -185 -28 -259 38 -53 46 -79 104 -79 178 0 177 178 291 338 216z" />
							</g>
						</svg>
					</span>
				</li>
				<li className="swiper-slide js__media-item-container swiper-slide-next" data-filter="image" data-index={1} style={{ width: '696px', marginRight: '10px' }}>
					<a className="re__pr-image-cover js__pr-image-cover lazyloaded" data-bg="https://file4.batdongsan.com.vn/resize/1275x717/2022/11/16/20221116135732-b64e_wm.jpg" style={{ backgroundImage: 'url("https://file4.batdongsan.com.vn/resize/1275x717/2022/11/16/20221116135732-b64e_wm.jpg")' }}></a>
					<div className="re__overlay js__overlay">
						<img data-src="https://file4.batdongsan.com.vn/resize/1275x717/2022/11/16/20221116135732-b64e_wm.jpg" alt="Chính chủ bán nhanh căn 1 phòng ngủ Empire City giá sốc 6.8 tỷ ảnh 0"
							className="pr-img lazyloaded"
							src="https://file4.batdongsan.com.vn/resize/1275x717/2022/11/16/20221116135732-b64e_wm.jpg" />
					</div>
				</li>

			</ul>
			{/* Add Pagination */}
			<div className="swiper-pagination swiper-pagination-fraction">
				<span className="swiper-pagination-current">1</span> / <span className="swiper-pagination-total">11</span>
			</div>
			<div action="go-right" >
				<a className="re__btn re__btn-se-border--sm re__btn-icon--sm">
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						width="16px" height="20px" viewBox="0 0 512.000000 512.000000"
						preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
							fill="#000000" stroke="none">
							<path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594
-662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31
-565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220
412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45
498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132
296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180
476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193
-740 235 -147 23 -475 34 -615 20z m-110 -1291 c34 -15 175 -150 583 -557 296
-295 553 -557 570 -582 29 -41 32 -52 32 -120 0 -68 -3 -79 -32 -120 -17 -25
-274 -287 -570 -582 -566 -565 -581 -577 -668 -578 -44 0 -131 36 -157 66 -29
33 -58 107 -58 149 0 86 17 106 508 598 l467 467 -467 468 c-491 491 -508 511
-508 597 0 42 29 116 58 149 26 30 113 66 157 66 22 0 60 -10 85 -21z"/>
						</g>
					</svg>
				</a>
			</div>
			<div action="go-left" className="swiper-button-disabled">
				<a className="re__btn re__btn-se-border--sm re__btn-icon--sm">
					<svg version={1.0} xmlns="http://www.w3.org/2000/svg" width="16px" height="20px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
						<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
							<path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594
-662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31
-565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220
412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45
498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132
296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180
476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193
-740 235 -147 23 -475 34 -615 20z m740 -1291 c24 -11 53 -28 64 -37 30 -26
66 -113 66 -157 -1 -87 -17 -106 -508 -597 l-467 -468 467 -467 c491 -492 508
-512 508 -598 0 -42 -29 -116 -58 -149 -26 -30 -113 -66 -157 -66 -87 1 -102
13 -668 578 -296 295 -553 557 -570 582 -29 41 -32 52 -32 120 0 68 3 79 32
120 17 25 274 287 570 582 566 565 581 578 668 578 22 0 60 -10 85 -21z" />
						</g>
					</svg>
				</a>
			</div>
			<span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
		</div>
		<div className="re__media-thumbs js__media-thumbs ">
			<div className="js__slick-thumb slick-initialized slick-slider">
				<div aria-live="polite" className="slick-list draggable"><div className="slick-track" role="listbox" style={{ opacity: 1, width: '1265px', transform: 'translate3d(0px, 0px, 0px)' }}><div className="re__media-thumb-item js__media-thumbs-item slick-slide slick-current slick-active item-thumb-active" data-filter="video" style={{ width: '107px', height: "80px" }} data-slick-index={0} aria-hidden="false" tabIndex={-1} role="option" aria-describedby="slick-slide00">
					<img data-src="https://i1.ytimg.com/vi/pHnk2Z26hPM/default.jpg" alt="Chính chủ bán nhanh căn 1 phòng ngủ Empire City giá sốc 6.8 tỷ"
						className=" lazyloaded" src="https://i1.ytimg.com/vi/pHnk2Z26hPM/default.jpg" />
					<span className="re__bg-media re__icon-play--xl"><span className="path1" /><span className="path2" /></span>
				</div>
					<div className="re__media-thumb-item js__media-thumbs-item slick-slide slick-active" data-filter="image" style={{ width: '107px', height: "80px" }} data-slick-index={1} aria-hidden="false" tabIndex={-1} role="option" aria-describedby="slick-slide01">
						<img data-src="https://file4.batdongsan.com.vn/resize/200x200/2022/11/16/20221116135732-b64e_wm.jpg" alt="Chính chủ bán nhanh căn 1 phòng ngủ Empire City giá sốc 6.8 tỷ"
							className=" lazyloaded" src="https://file4.batdongsan.com.vn/resize/200x200/2022/11/16/20221116135732-b64e_wm.jpg" />
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
}
export default SlideImage