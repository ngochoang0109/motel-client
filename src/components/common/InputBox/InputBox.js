import { Fragment, useEffect, useRef, useState } from "react";
import { inputConstant } from "../../../constant/inputConstant";
import { useDispatch, useSelector } from 'react-redux';
import generated from "../../../common/generated.common";
import { storageKey } from "../../../constant/storageKey";
import { InputBoxAction } from "./InputBox.action";
import { formatCommon } from "../../../common/format.common";
import upload from './../../../assets/upload.png'
import cross from './../../../assets/cross.png'
import down from './../../../assets/down.png'
import add from './../../../assets/add.png'
import calendar from './../../../assets/calendar.png'
import { DatePicker } from "antd";
import 'antd/dist/antd.min.css';
import moment from "moment";

const InputBox = ({ mode, placeholder, data,
	name, getValueDropList, onChange,
	maxlength, minlength, row, type, value, title, disable, addItem,icon,clickIcon, checked }) => {

	const showModal = useSelector(state => state.controllDropDownModal)
	const dispatch = useDispatch()
	const [id] = useState(generated(storageKey.SIZE_ID))
	const [currentInput, setCurrentInput] = useState({})
	const [inputValue, setInputValue] = useState({ value: "", nameOfinput: "" })
	const mediaInput = useRef(null);

	useEffect(() => {
		dispatch(InputBoxAction.addInputBox(id))
	}, [])
	useEffect(() => {
		if (value) {
			setInputValue({ value: value.el || value, nameOfinput: name })
		}
	}, [value])



	const onFocusInputBox = () => {
		controllInput()
	}

	const controllTextBoxMode = () => {
		switch (mode) {
			case inputConstant.INPUT_SEARCH:
				return <Fragment>
					<div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}>
						<input id={id} type="text" className="placeholder input-box"
							placeholder={placeholder} style={{ width: "100%", height: "100%" }}
							onFocus={onFocusInputBox}
							onChange={handleOnChangeInputSearch}
							value={inputValue.value}
							name={name}></input>
						{currentInput.show ? <div className="icon-clear" onClick={clearInputData}>
							<img src={cross}></img>
						</div> : <div className="div-button-right">
							<img src={down}></img>
						</div>}
					</div>
				</Fragment>
			case inputConstant.DROP_DOWN_LIST:
				return <div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}>
					<div className="input-selection-font"
						onClick={onFocusInputBox}
						style={{ width: '100%' }} id={id}>
						<div className={inputValue.value.length === 0 ? `placeholder` : `placeholder value-selected`}>
							{inputValue.value.length === 0 ? `${placeholder}` : inputValue.value}
						</div>
					</div>
					{icon?<div onClick={clearInputData} className="icon-clear">
						<img src={icon}></img>
					</div>:currentInput.show ? <div onClick={clearInputData} className="icon-clear">
						<img src={cross}></img>
					</div> : <div className="div-button-right">
						<img src={down}></img>
					</div>}
				</div>
			case inputConstant.INPUT_TEXT_BOX:
				return <div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}>
					<input id={id} type={type} className="placeholder input-box"
						placeholder={placeholder}
						style={{ width: "100%", height: "100%" }}
						onFocus={onFocusInputBox}
						onChange={handleOnChangeInput}
						value={inputValue.value}
						min='0'
						onBlur={onFocusOutInputBox}
						name={name}
						disabled={disable ? disable : false}></input>

					{name === 'area' ? <div className="icon-clear color-bl">
						m&sup2;
					</div> : (name === 'price' ? <div className="icon-clear div-text-right">
						VND
					</div> : (name === 'video-add' ? <div className="icon-clear" onClick={clickIconAdd}>
						<img src={add}></img>
					</div> : (name === 'video-close' ? <div className="icon-clear" onClick={clearInputData}>
						<img src={cross}></img>
					</div> : type === 'calendar' ? <div className="icon-clear">
						<img src={calendar}></img>
					</div> : null)))}
					{icon? <div className="icon-clear" onClick={clickIconButton}>
						<img src={icon}></img>
					</div>:<Fragment></Fragment>}
				</div>
			case inputConstant.INPUT_BIG_BOX:
				return <div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}><textarea rows={row} id={id} type="text"
					className="placeholder input-box p-11"
					placeholder={placeholder} style={{ width: "100%", height: "100%" }}
					onFocus={onFocusInputBox}
					onChange={handleOnChangeInput}
					value={inputValue.value}
					maxLength={maxlength}
					minLength={minlength}
					onBlur={onFocusOutInputBox}
					name={name}
					disabled={disable ? disable : false}></textarea>
					</div>
			case inputConstant.CHECK_BOX:
				return <div className="checkbox-row">
					<div color="#CCCCCC" className="size-checkbox">
						<input type='checkbox'
							className="check-box"
							onChange={clickCheckBox}
							checked={checked} />
						<div className="mr-l-8">
							<div className="text-of-checkbox">{title}</div>
						</div>
					</div>
				</div>
			case inputConstant.MEDIA_BOX:
				return <div className="input-media" onClick={clickChooseFiles}>
					<input multiple
						type="file"
						style={{ display: 'none' }}
						ref={mediaInput}
						onChange={handleChooseFiles} />
					<img src={upload}></img>
					<p className="input-media-text">Bấm để chọn ảnh cần tải lên</p>
					<p className="input-media-text" style={{ marginBottom: '16px' }}>hoặc kéo thả ảnh vào đây</p>
				</div>

			case inputConstant.CALENDAR_BOX:
				return <DatePicker format={formatCommon.formatDate()}
					defaultValue={moment(inputValue.value.toString().length !== 0 ? new Date(inputValue.value) : new Date())}
					disabledDate={!disable?false:disabledDate}
					onChange={onChangeCalendar}></DatePicker>
		}
	}

	function disabledDate(current) {
		const temp =new Date()
		temp.setDate(temp.getDate()-1)
		return current && current.valueOf() < temp;
	}

	const onChangeCalendar = (value) => {
		if (value.length === 0) {
			return
		}
		onChange({ ...inputValue, value: value.toDate(), nameOfinput: name })
	}

	const handleChooseFiles = (event) => {
		const filesObj = event.target.files[0] && event.target.files;
		let arrFiles = []
		for (let i = 0; i < Object.keys(filesObj).length; i++) {
			arrFiles.push(filesObj[i.toString()])
		}
		onChange({ value: arrFiles, nameOfinput: name })
		//reset file input
		event.target.value = null;
	}

	const clickChooseFiles = () => {
		mediaInput.current.click()
	}

	const selectedItemOfDropDownList = (event, value) => {
		setInputValue({ ...inputValue, id: value.id, value: value.name, nameOfinput: name })
		controllInput()
		getValueDropList({ ...inputValue, id: value.id, value: value.name, nameOfinput: name })
	}

	const controllInput = () => {
		showModal.map((input) => {
			if (input.id === id) {
				if (input.show) {
					document.activeElement.blur()
				}
				dispatch(InputBoxAction.controllInput(inputConstant.CHANGE_STATUS, input.show, id))
				setCurrentInput(input)
			}
		})
	}

	const controllDropDownList = () => {
		switch (mode) {
			case inputConstant.DROP_DOWN_LIST:
				return currentInput.show ? <div className="pgds-popover-content">
					<div className="popover-content">
						<div className="list-item-selected">
							{data.map((value, index) => {
								return <div className="item-wrapper" key={index}
									onClick={(event) => selectedItemOfDropDownList(event, value)}>
									<div className="item-detail">{value.name}</div>
								</div>
							})}
						</div>
					</div>
				</div> : <Fragment></Fragment>
			case inputConstant.INPUT_SEARCH:
				return currentInput.show ? <div className="pgds-popover-content">
					<div className="popover-content">
						<div className="list-item-selected">
							{data.map((value, index) => {
								return <div className="item-wrapper" key={index}
									onClick={(event) => selectedItemOfDropDownList(event, value)}>
									<div className="item-detail">{value.name}</div>
								</div>
							})}
						</div>
					</div>
				</div> : <Fragment></Fragment>
		}
	}


	const clickCheckBox = (event) => {
		setInputValue({ value: event.target.checked, nameOfinput: name })
		onChange({ value: event.target.checked, nameOfinput: name })
	}

	const handleOnChangeInputSearch = (event) => {
		setInputValue({ value: event.target.value, nameOfinput: name })
		onChange({ ...inputValue, value: event.target.value, nameOfinput: name })
	}

	const handleOnChangeInput = (event) => {
		if (onChange) {
			let value = event.target.value
			if (type === 'number' && value) {
				value = parseInt(value)
			}
			setInputValue({ ...inputValue, value: value, nameOfinput: name })
			if (name === 'video') {
				return
			}
			onChange({ ...inputValue, value: value, nameOfinput: name })
		}
	}

	const clearInputData = () => {
		setInputValue({ value: "", nameOfinput: "" })
		try{
			onChange({ ...inputValue, value: "", nameOfinput: name, index: value.index})
		}catch{
			onChange({ ...inputValue, value: "", nameOfinput: name})
		}
	}

	const clickIconAdd = () => {
		if (inputValue.value.length > 0) {
			addItem({ ...inputValue, value: inputValue.value, nameOfinput: inputValue.nameOfinput })
			setInputValue({ value: "", nameOfinput: "" })
		}
	}

	const onFocusOutInputBox = (event) => {
		if (name === 'price') {
			setInputValue({ ...inputValue, value: formatCommon.formatNumberic(event.target.value), nameOfinput: name })
		}
		controllInput()
	}

	const clickIconButton=()=>{
		clickIcon()
	}

	return <Fragment>
		{controllTextBoxMode()}
		{controllDropDownList()}
	</Fragment>

}

export default InputBox;