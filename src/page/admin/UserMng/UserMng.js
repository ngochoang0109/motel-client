import { Button, DatePicker, Input, Select, Table } from "antd";
import { useEffect, useState } from "react"
import { PlusCircleOutlined } from '@ant-design/icons';
import Modal from "antd/lib/modal/Modal"
import { formatCommon } from "../../../common/format.common";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { message } from "../../../action/message";
import { useDispatch } from "react-redux";
import { userService } from "../../../service/UserService";
import { useNavigate } from "react-router-dom";

const UserMng = () => {
	const [data, setData] = useState([])
	const dispatch = useDispatch()
	const nav = useNavigate()

	const columns = [
		{
			key: "1",
			title: 'Mã người dùng',
			dataIndex: 'id',
			align: "center"
		}, {
			key: "2",
			title: 'Tên tài khoản',
			dataIndex: 'username',
			align: "center",
			render: (text, row, index) => {
				return text
			},
		}, {
			key: "3",
			title: 'Email',
			dataIndex: 'email',
			align: "center",
			render: (text, row, index) => {
				return `${text}`
			}
		}, {
			key: "4",
			title: 'Tên đầy đủ',
			dataIndex: 'fullname',
			align: "center",
			render: (text, row, index) => {
				return `${text}`
			}
		}, {
			key: "5",
			title: 'Số điện thoại',
			dataIndex: 'phone',
			align: "center",
			render: (text, row, index) => {
				return `${text}`
			}
		}, {
			key: "6",
			title: 'Quyền',
			dataIndex: 'role',
			align: "center",
			render: (text, row, index) => {
				return `${text}`
			}
		},
		{
			key: "7",
			title: 'Tác vụ',
			dataIndex: 'actionUser',
			align: "center",
			render: (text, row, index) => {
				return <div style={{ "display": "flex" }}>
					<Button style={{ "marginRight": "1rem" }} onClick={() => { alert("SUA") }}>Sửa</Button>
					<Button type="danger" onClick={() => { alert("XOA") }}>Xóa</Button>
				</div>
			}
		}
	];

	function onChange(pagination, filters, sorter, extra) {
		console.log('params', pagination, filters, sorter, extra);
	}

	useEffect(() => {
		dispatch(message.information(true))
		userService.getListUser().then((data) => {
			setData(data)
			console.log(data)
			dispatch(message.information(false))
		})
	}, [])

	return <div className="right-bar">
		<div className="container-header" style={{ "height": "100%" }}>
			<div className='container-center'>
				<div className="title">
					<h3 className="sc-giIncl kuvrBD">Quản lý mã giảm giá</h3>
				</div>
			</div>
			<div className='table-data' style={{ "marginTop": "16px" }}>
				<div style={{ "marginBottom": "2rem" }}>
					<Button type="primary"
						shape="circle"
						icon={<PlusCircleOutlined />}
						size="large"
						onClick={()=>{
							nav('form',{replace:true})
						}} />
				</div>
				<Table columns={columns}
					dataSource={data}
					onChange={onChange} />
			</div>
		</div>
	</div>
}

export default UserMng