import { Fragment } from "react";
import { formatCommon } from "../../../common/format.common";
import { modeNews } from "../../../constant/mode.news";

const NewsCard = ({ title, price, area, province, district, description,
	fullName, phone, startedDate, closedDate,
	avatar, mode, totalAmount, id, addToCart, fromCalled, viewReasonReject,
	onHindden, updateReShowToPost, extendedTime, deletedPost, editPost }) => {

	const clickAddItemToCart = () => {
		addToCart(id)
	}

	const showBtnFooter = () => {
		switch (mode) {
			case modeNews.WAITING_APROVED:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							onClick={() => {
								editPost(id)
							}}>
							<span>Chỉnh sửa</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.NEWS_REJECT:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								viewReasonReject(id)
							}}>
							<span>Xem lý do</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							onClick={() => {
								editPost(id)
							}}>
							<span>Chỉnh sửa</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.NEWS_WAIT_PAYMENT:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} &ensp; &ensp;</span>
						<span className="re__card-published-info-published-at">	Tổng tiền:&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatNumberic(totalAmount)} VNĐ </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" onClick={clickAddItemToCart}>
							<span>Thêm vào giỏ tin</span></span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.WAITING_SHOW:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.SHOWING:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						{fromCalled === "HOME" ? <Fragment>
							<span className="re__card-published-info-published-at"> Đăng bởi: {fullName}&ensp;&ensp;</span>
							<span className="re__card-published-info-published-at"> {formatCommon.getResultDiffDate(new Date(startedDate), new Date())}</span>
						</Fragment> : <Fragment>
							<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
							<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
							<span className="re__card-published-info-published-at"> --- &ensp;</span>
							<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
						</Fragment>}
					</div>
					{fromCalled === "HOME" ? <div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" >
							<span>Liên hệ: {formatCommon.phoneNumberFormat(phone).slice(0, 8)} ***</span>
						</span>
					</div> : <div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							onClick={() => {
								onHindden(id)
							}}>
							<span>Ẩn bài viết</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>}
					<div style={{ clear: 'left' }} />
				</div>

			case modeNews.EXPRIED:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							onClick={() => {
								extendedTime(id)
							}}>
							<span>Gia hạn</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.HINDDEN:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>

					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" onClick={() => {
							updateReShowToPost(id)
						}}>
							<span>Hiện thị lại</span>
						</span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							style={{ "background": "#A52A2A" }}
							onClick={() => {
								deletedPost(id)
							}}>
							<span>Xóa bài</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			default:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Đăng bởi {fullName} &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.getResultDiffDate(new Date(startedDate), new Date())}</span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" >
							<span>Liên hệ: {phone}</span>
						</span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
		}
	}
	return <div className="re__card-full re__card-full-no-label vip5 re__vip-5">
		{<a className="link-item" href={fromCalled === 'HOME' ? '/trang-chu/chi-tiet-bai-viet/' + id : null}>
			<div className="re__card-image re__card-image-no-image">
				<img src={avatar} />
				<div className="re__card-image-feature" />
			</div>
			<div className="re__card-info">
				<div className="re__card-info-content">
					<h3 className="re__card-title">
						<span className="vipFive pr-title js__card-title">
							{title}
						</span>
					</h3>
					<div className="re__card-config">
						<span className="re__card-config-price">{formatCommon.formatNumberic(price)}/tháng</span>
						<span className="re__card-config-dot">·</span>
						<span className="re__card-config-area">{area} m²</span>
						<span className="re__card-config-dot">·</span>
						<span className="re__card-config-area"> {district}, {province}</span>
					</div>
					<div className="re__card-description">{description}</div>
					{showBtnFooter()}
				</div>
			</div>
			<div style={{ clear: 'left' }} />
		</a>}
	</div>
}

export default NewsCard;