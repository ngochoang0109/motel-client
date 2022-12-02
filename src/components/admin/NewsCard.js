import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "../../action/message";
import { formatCommon } from "../../common/format.common";
import { modeNews } from "../../constant/mode.news";
import { NewsManagementService } from "../../service/NewsManagementService";

const NewsCard = ({ title, price, area, province, district, description,
	fullName, phone, startedDate, closedDate,
	avatar, mode, totalAmount, id }) => {

	const dispatch = useDispatch()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reason, setReason] = useState('')

	const approvedNews = () => {
		dispatch(message.information(true))
		NewsManagementService.approvedNews(id).then((data) => {
			dispatch(message.information(false))
			if (data) {
				dispatch(message.successfully(true, "Bài đã được duyệt, chuyển đến trạng thái chờ thanh toán"))
			} else {
				dispatch(message.successfully(true, "Đang có lỗi, vui lòng thử lại sau"))
			}
		})
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		setReason('')
	}

	const handleOk = () => {
		setIsModalOpen(false);
		NewsManagementService.insertReason({ id: id, reason: reason }).then((data) => {
			console.log(data)
		})
	}

	const rejectNews = () => {
		NewsManagementService.showReason(id).then((data) => {
			setReason(data)
			NewsManagementService.rejectedNews(id).then((data) => {
				if (data) {
					setIsModalOpen(true)
				} else {
					dispatch(message.successfully(true, "Đang có lỗi, vui lòng thử lại sau"))
				}
			})
		})
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
					<div className="re__card-contact-button" >
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm"
							onClick={approvedNews}>
							<span>Duyệt bài</span></span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}
							onClick={rejectNews}>
							<span>Từ chối</span></span>
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
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" onClick={rejectNews}>
							<span>Sửa lý do</span></span>
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
						<span className="re__card-published-info-published-at">	Thanh toán:&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatNumberic(totalAmount)} VNĐ </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Xóa bài</span></span>
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
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Xóa bài</span></span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			case modeNews.SHOWING:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Mã bài viết: #{id}&ensp;&ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(startedDate)} &ensp;</span>
						<span className="re__card-published-info-published-at"> --- &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.formatWithTimeDate(closedDate)} </span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" >
							<span>Ẩn bài viết</span></span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Xóa bài</span></span>
					</div>
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
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Gia hạn</span></span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Xóa bài</span></span>
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
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Hiện thị lại</span></span>
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" style={{ "background": "#A52A2A" }}>
							<span>Xóa bài</span></span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
			default:
				return <div className="re__card-contact">
					<div className="re__card-published-info">
						<span className="re__card-published-info-published-at"> Đăng bởi {fullName} &ensp;</span>
						<span className="re__card-published-info-published-at"> {formatCommon.getResultDiffDate(new Date(startedDate), new Date())} trước</span>
					</div>
					<div className="re__card-contact-button">
						<span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm" >
							<span>Liên hệ: {phone}</span></span>
					</div>
					<div style={{ clear: 'left' }} />
				</div>
		}
	}
	console.log(reason)

	return <div className="re__card-full re__card-full-no-label vip5 re__vip-5">
		<Modal title="Lý do từ chối bài viết"
			visible={isModalOpen}
			footer={[
				<Button type="primary" onClick={handleOk}>
					Tạo lý do
				</Button>,
				<Button onClick={handleCancel}>
					Bỏ qua
				</Button>]}>
			<div style={{ "padding": "0px 24px", "marginBottom": "1rem", "width": "100%" }}>
				<TextArea
					name='description'
					onChange={(event) => setReason(event.target.value)}
					placeholder="Ví dụ: Nội dung không hợp lệ...."
					autoSize={{ minRows: 0, maxRows: 14 }}
					value={reason}
				/>
			</div>
		</Modal>
		<a className="link-item">
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
		</a>
	</div>
}

export default NewsCard;