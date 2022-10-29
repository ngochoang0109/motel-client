import { Col, Row } from "antd";
import { Fragment } from "react";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import "./PaymentConfirm.css"

const PaymentComfirm = () => {
	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Trang thanh toán</h3>
					</div>
				</div>
			</div>
			<div className="payment-container" style={{ "marginTop": "16px" }}>
				<h3 className="lhekIy joNLqU">Thông tin đơn hàng</h3>
				<h3>Thông tin người tạo</h3>
				<h3>Thông tin bài viết(cần thiết)</h3> 
				<h3>Thông tin bất động sản(cơ bản)</h3>
				<h3>Thông tin loại bài viết</h3>
				<h3>Thông tin giảm giá được áp dụng</h3>
				<h3 className="lhekIy joNLqU">Chọn ngân hàng</h3>
				<div className="grid-bank">
					<Row>
						<Col span={6}><div class="sc-jLjnNq bhhkft">
							<img src="/sellernet/static/media/vietcombank.09686245.jpg"
								alt="Ngân hàng Ngoại thương (Vietcombank)" class="sc-gQZORr dOdYqT"></img></div></Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
					</Row>
					<Row>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
					</Row>
					<Row>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
						<Col span={6}>col-6</Col>
					</Row>
				</div>
			</div>
		</div>
	</Fragment>
}

export default PaymentComfirm;