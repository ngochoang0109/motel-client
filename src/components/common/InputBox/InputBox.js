import { Fragment, useEffect, useState } from "react";
import { inputConstant } from "../../../constant/inputConstant";
import { useDispatch, useSelector } from 'react-redux';
import generated from "../../../common/generated.common";
import { storageKey } from "../../../constant/storageKey";
import { InputBoxAction } from "./InputBox.action";

const InputBox = ({ mode, placeholder, data, name, getValue, onChange }) => {

	const showModal = useSelector(state => state.controllDropDownModal)
	const dispatch = useDispatch()
	const [id] = useState(generated(storageKey.SIZE_ID))
	const [currentInput, setCurrentInput] = useState({})
	const [inputValue, setInputValue] = useState({ id: 0, name: "", nameOfinput:"" })

	useEffect(() => {
		dispatch(InputBoxAction.addInputBox(id))
	}, [])



	const handleSelectedInputBox = () => {
		controllModal()
	}

	const controllTextBoxMode = () => {
		switch (mode) {
			case inputConstant.INPUT_SEARCH:
				return <Fragment>
					<input id={id} type="text" className="placeholder input-box"
						placeholder={placeholder} style={{ width: "100%", height: "100%" }}
						onClick={handleSelectedInputBox}
						onChange={handleOnChangeInput}
						value={inputValue.name}></input>
					{currentInput.show ? <div className="icon-clear">
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
					<div className="input-selection-font" onClick={handleSelectedInputBox} style={{ width: '100%' }} id={id}>
						<div className={inputValue.name.length === 0 ? `placeholder` : `placeholder value-selected`}>{inputValue.name.length === 0 ? `Ví dụ: ${placeholder}` : inputValue.name}</div>
					</div>
					{currentInput.show ? <div className="icon-clear">
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
				return <input id={id} type="text" className="placeholder input-box"
					placeholder={placeholder} style={{ width: "100%", height: "100%" }}
					onClick={handleSelectedInputBox}
					onChange={handleOnChangeInput}
					value={inputValue.name}></input>
		}
	}

	const selectedItemOfDropDownList = (event, value) => {
		setInputValue(value)
		controllModal()
		getValue({ ...value, nameOfinput: name })
	}

	const controllModal = () => {
		showModal.map((input) => {
			if (input.id === id) {
				dispatch(InputBoxAction.controllModal(inputConstant.CHANGE_STATUS, input.show, id))
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
								return <div className="item-wrapper" key={index} onClick={(event) => selectedItemOfDropDownList(event, value)}>
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
								return <div className="item-wrapper" key={index} onClick={(event) => selectedItemOfDropDownList(event, value)}>
									<div className="item-detail" type="primary">{value.name}</div>
								</div>
							})}
						</div>
					</div>
				</div> : <Fragment></Fragment>
		}

	}

	const handleOnChangeInput = (event) => {
		setInputValue({...inputValue, name:event.target.value})
		onChange({...inputValue, name:event.target.value, nameOfinput:name})
	}

	return <Fragment>
		<div className={`input-selection-level-second ${currentInput.show ? `input-selection-font-focus` : `not-focus`}`}>
			{controllTextBoxMode()}
		</div>
		{controllDropDownList()}
	</Fragment>

}

export default InputBox;