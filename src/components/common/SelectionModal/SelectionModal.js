import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import './SelectionModal.css'

const SelectionModal = ({ data, input }) => {

	const showModal = useSelector(state => state.controllDropDownModal)

	const showDropDownItem = () => {
		let show = false

		for (let i = 0; i < showModal.length; i++) {
			if (input && showModal[i].id === input.id && input.show) {
				show = true
			}
			break;
		}
		return show ? <div width="100%" className="pgds-popover-content">
			<div width="100%" className="popover-content">
				<div className="list-item-selected">
					{console.log("render list")}
					{data.map((value, index) => {
						return <div className="item-wrapper" key={index}>
							<div className="item-detail" type="primary">{value.name}</div>
						</div>
					})}
				</div>
			</div>
		</div> : <Fragment></Fragment>
	}

	return showDropDownItem()
}

export default SelectionModal;