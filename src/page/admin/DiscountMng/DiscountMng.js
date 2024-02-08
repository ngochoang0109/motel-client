import { Button, DatePicker, Input, Select, Table } from "antd";
import { useEffect, useState } from "react"
import { DiscountMngService } from "../../../service/admin/DiscountMngService";
import "./DiscountMng.css"
import { PlusCircleOutlined } from '@ant-design/icons';
import Modal from "antd/lib/modal/Modal"
import { formatCommon } from "../../../common/format.common";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { message } from "../../../action/message";
import { useDispatch } from "react-redux";

const DiscountMng = () => {
	const [data, setData] = useState([])
	const [expenses, setExpenses] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		percent: 0,
		price: 0,
		startedDate: new Date(),
		endDate: new Date(),
		description: '',
		expenseDatasources: []
	})
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setsearchedColumn] = useState('')
	const dispatch = useDispatch()

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0])
		setsearchedColumn(dataIndex)
	};

	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('')
	};

	const columns = [
		{
			key: "1",
			title: 'Mã giảm giá',
			dataIndex: 'code',
			align: "center"
		}, {
			key: "2",
			title: 'Tiêu đề',
			dataIndex: 'description',
			align: "center",
			render: (text, row, index) => {
				return text
			},
			// filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			// 	<div style={{ padding: 8 }}>
			// 		<Input
			// 			value={selectedKeys[0]}
			// 			onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
			// 			onPressEnter={() => handleSearch(selectedKeys, confirm, 'description')}
			// 			style={{ width: 200, marginBottom: 8, display: 'block' }}
			// 		/>
			// 		<Button
			// 			type="primary"
			// 			onClick={() => handleSearch(selectedKeys, confirm, 'description')}
			// 			size="small"
			// 			style={{ width: 90, marginRight: 8 }}
			// 		>
			// 			Tìm kiếm
			// 		</Button>
			// 		<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
			// 			Đặt lại
			// 		</Button>
			// 	</div>
			// ),
			// onFilter: (value, record) =>
			// 	record['description']
			// 		.toString()
			// 		.toLowerCase()
			// 		.includes(value.toLowerCase())
		}, {
			key: "3",
			title: 'Phần trăm áp dụng (%)',
			dataIndex: 'percent',
			align: "center",
			render: (text, row, index) => {
				return `${text} %`
			}
		}, {
			key: "4",
			title: 'Giá tối đa được giảm (VNĐ)',
			dataIndex: 'price',
			align: "center",
			render: (text, row, index) => {
				return `${formatCommon.formatNumberic(text)} VNĐ`
			}
		}, {
			key: "5",
			title: 'Ngày bắt đầu',
			dataIndex: 'startedDate',
			align: "center",
			render: (text, row, index) => {
				return formatCommon.formatWithTimeDate(new Date(text))
			}
		}, {
			key: "6",
			title: 'Ngày hết hạn',
			dataIndex: 'endDate',
			align: "center",
			render: (text, row, index) => {
				return formatCommon.formatWithTimeDate(new Date(text))
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
		DiscountMngService.getAllDiscount().then((data) => {
			setData(data)
			dispatch(message.information(false))
		})
		DiscountMngService.getExpense().then((data) => {
			setExpenses(data)
		})
	}, [])

	const showModal = () => {
		setIsModalOpen(true);
	}

	const handleOk = () => {
		setIsModalOpen(false);
		dispatch(message.information(true))
		DiscountMngService.createDiscount(formData).then((data) => {
			dispatch(message.information(false))
			dispatch(message.successfully(true, "Tạo mã thành công"))
			setFormData({
				...formData,
				percent: 0,
				price: 0,
				startedDate: new Date(),
				endDate: new Date(),
				description: ''
			})
		})
	}

	const handleCancel = () => {
		setIsModalOpen(false);
		setFormData({
			...formData,
			percent: 0,
			price: 0,
			startedDate: new Date(),
			endDate: new Date(),
			description: ''
		})
	}

	const onChangeCalendarStart = (value) => {
		if (value.length === 0) {
			return
		}
		setFormData({ ...formData, startedDate: value.toDate(), endDate: value.toDate() })
	}

	const onChangeCalendarEnd = (value) => {
		if (value.length === 0 || formData.startedDate > value.toDate()) {
			return
		}
		setFormData({ ...formData, endDate: value.toDate() })
	}

	const handleChange = (value) => {
		const arr = value.map(el => { return { id: el } })
		setFormData({ ...formData, expenseDatasources: arr })
	}

	function disabledDate(current) {
		const temp = new Date()
		temp.setDate(temp.getDate() - 1)
		return current && current.valueOf() < temp;
	}

	const onChangeSimpleInput = (event) => {
		let value = event.target.value
		if (event.target.name === 'price' || event.target.name === 'percent') {
			value = Number(value)
		}
		setFormData({
			...formData,
			[event.target.name]: value
		})
	}
	console.log(formData)
	return <div className="right-bar">
		<Modal title="Tạo mã giảm giá"
			visible={isModalOpen}
			footer={[
				<Button type="primary" onClick={handleOk}>
					Tạo mã
				</Button>,
				<Button onClick={handleCancel}>
					Thoát
				</Button>]}>
			<div style={{ "display": "flex", "marginBottom": "1rem" }}>
				<div style={{ "width": "48%", "padding": "0px 24px" }}>
					<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Phần trăm áp dụng</label>
					<Input style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}
						name='percent' onChange={onChangeSimpleInput}
						value={formData.percent} />
				</div>
				<div style={{ "width": "48%", "padding": "0px 24px" }}>
					<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Giá tối đa áp dụng</label>
					<Input style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}
						name='price'
						onChange={onChangeSimpleInput}
						value={formData.price} />
				</div>
			</div>

			<div style={{ "display": "flex", "marginBottom": "1rem" }}>
				<div style={{ "width": "48%", "padding": "0px 24px" }}>
					<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Ngày áp dụng</label>
					<DatePicker format={formatCommon.formatDate()}
						defaultValue={moment(formData.startedDate.toString())}
						disabledDate={disabledDate}
						onChange={onChangeCalendarStart}
						value={moment(formData.startedDate.toString())}></DatePicker>
				</div>
				<div style={{ "width": "48%", "padding": "0px 24px" }}>
					<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Ngày hết hạn</label>
					<DatePicker format={formatCommon.formatDate()}
						defaultValue={moment(formData.endDate.toString())}
						disabledDate={disabledDate}
						onChange={onChangeCalendarEnd}
						value={moment(formData.endDate.toString())}></DatePicker>
				</div>
			</div>
			<div style={{ "padding": "0px 24px", "marginBottom": "1rem" }}>
				<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Tiêu đề</label>
				<TextArea
					name='description'
					onChange={onChangeSimpleInput}
					placeholder="VD: Giảm giá cho loại tin VIP"
					autoSize={{ minRows: 0, maxRows: 2 }}
					value={formData.description} />
			</div>
			<div style={{ "width": "100%", "padding": "0px 24px" }}>
				<label style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "500" }}>Áp dụng đến loại tin</label>
				<Select
					mode="multiple"
					style={{ width: '100%' }}
					onChange={handleChange}
					optionLabelProp={"label"}>
					{expenses.map((el) => {
						return <Select.Option value={el.id} label={el.type} key={el.id}>
							<div style={{ "fontFamily": "'Roboto', sans-serif", "fontSize": "16px", "fontWeight": "400" }}>
								{el.type} : {formatCommon.formatNumberic(el.cost)} VNĐ
							</div>
						</Select.Option>
					})}
				</Select>
			</div>
		</Modal>
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
						onClick={showModal} />
				</div>
				<Table columns={columns}
					dataSource={data}
					onChange={onChange} />
			</div>
		</div>
	</div>
}

export default DiscountMng