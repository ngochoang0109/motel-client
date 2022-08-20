import { Fragment, useEffect, useState } from "react";
import { inputConstant } from "../../../constant/inputConstant";
import { useDispatch, useSelector } from 'react-redux';
import generated from "../../../common/generated.common";
import { storageKey } from "../../../constant/storageKey";
import { InputBoxAction } from "./InputBox.action";
import { formatCommon } from "../../../common/format.common";

const InputBox = ({ mode, placeholder, data,
	name, getValueDropList, onChange,
	maxlength, minlength, row, type, value }) => {

	const showModal = useSelector(state => state.controllDropDownModal)
	const dispatch = useDispatch()
	const [id] = useState(generated(storageKey.SIZE_ID))
	const [currentInput, setCurrentInput] = useState({})
	const [inputValue, setInputValue] = useState({ value: "", nameOfinput: "" })
	
	useEffect(() => {
		dispatch(InputBoxAction.addInputBox(id))
	}, [])

	useEffect(() => {
		if (value) {
			setInputValue({ value: value, nameOfinput: name })
		}
	}, [value])



	const onFocusInputBox = () => {
		controllInput()
	}

	const controllTextBoxMode = () => {
		switch (mode) {
			case inputConstant.INPUT_SEARCH:
				return <Fragment>
					<input id={id} type="text" className="placeholder input-box"
						placeholder={placeholder} style={{ width: "100%", height: "100%" }}
						onFocus={onFocusInputBox}
						onChange={handleOnChangeInput}
						value={inputValue.value}
						name={name}></input>
					{currentInput.show ? <div className="icon-clear" onClick={clearInputData}>
						<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#F2F2F2" />
							<path d="M15 9L9 15" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
							<path d="M15 15L9 9" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div> : <div className="div-button-right">
						<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>}
				</Fragment>
			case inputConstant.DROP_DOWN_LIST:
				return <Fragment>
					<div className="input-selection-font" onClick={onFocusInputBox} 
							style={{ width: '100%' }} id={id}>
						<div className={inputValue.value.length === 0 ? `placeholder` : `placeholder value-selected`}>{inputValue.value.length === 0 ? `Ví dụ: ${placeholder}` : inputValue.value}</div>
					</div>
					{currentInput.show ? <div onClick={clearInputData} className="icon-clear">
						<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#F2F2F2" />
							<path d="M15 9L9 15" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
							<path d="M15 15L9 9" stroke="#999999" strokeWidth="1.9" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div> : <div className="div-button-right">
						<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path xmlns="http://www.w3.org/2000/svg" d="M4 9L12 17L20 9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>}
				</Fragment>
			case inputConstant.INPUT_TEXT_BOX:
				return <Fragment>
					<input id={id} type={type} className="placeholder input-box"
						placeholder={placeholder} style={{ width: "100%", height: "100%" }}
						onFocus={onFocusInputBox}
						onChange={handleOnChangeInput}
						value={inputValue.value}
						min='0'
						onBlur={onFocusOutInputBox}
						name={name}></input>

					{name === 'area' ? <div className="icon-clear color-bl">
						m&sup2;
					</div> : (name === 'price' ? <div className="icon-clear div-text-right">
						VND
					</div> : null)}

				</Fragment>
			case inputConstant.INPUT_BIG_BOX:
				return <textarea rows={row} id={id} type="text"
					className="placeholder input-box p-11"
					placeholder={placeholder} style={{ width: "100%", height: "100%" }}
					onFocus={onFocusInputBox}
					onChange={handleOnChangeInput}
					value={inputValue.value}
					maxLength={maxlength}
					minLength={minlength}
					onBlur={onFocusOutInputBox}
					name={name}></textarea>

		}
	}

	const selectedItemOfDropDownList = (event, value) => {
		setInputValue({...inputValue,id:value.id,value:value.name, nameOfinput:name})
		controllInput()
		getValueDropList({ ...value, nameOfinput: name })
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
				return currentInput.show ? <div width="100%" className="pgds-popover-content">
					<div width="100%" className="popover-content">
						<div className="list-item-selected">
							{data.map((value, index) => {
								return <div className="item-wrapper" key={index} 
									onClick={(event) => selectedItemOfDropDownList(event, value)}>
									<div className="item-detail" type="primary">{value.name}</div>
								</div>
							})}
						</div>
					</div>
				</div> : <Fragment></Fragment>
			case inputConstant.INPUT_SEARCH:
				return currentInput.show ? <div width="100%" className="pgds-popover-content">
					<div width="100%" className="popover-content">
						<div className="list-item-selected">
							{data.map((value, index) => {
								return <div className="item-wrapper" key={index}
									onClick={(event) => selectedItemOfDropDownList(event, value)}>
									<div className="item-detail" type="primary">{value.name}</div>
								</div>
							})}
						</div>
					</div>
				</div> : <Fragment></Fragment>
		}
	}

	const handleOnChangeInput = (event) => {
		let value = event.target.value
		if (type === 'number') {
			value = parseInt(value)
		}
		setInputValue({ ...inputValue, value: value, nameOfinput: name })
		onChange({ ...inputValue, value:value, nameOfinput: name })
	}

	const clearInputData = () => {
		setInputValue({ value: "", nameOfinput: "" })
		onChange({ ...inputValue, value: "", nameOfinput: name })
	}

	const onFocusOutInputBox = (event) => {
		if (name === 'price') {
			setInputValue({ ...inputValue, value: formatCommon.formatNumberic(event.target.value), nameOfinput: name })
		}
		controllInput()
	}

	return <Fragment>
		<div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}>
			{controllTextBoxMode()}
		</div>
		{controllDropDownList()}
	</Fragment>

}

export default InputBox;