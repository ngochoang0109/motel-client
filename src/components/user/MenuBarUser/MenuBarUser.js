import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { dataCommon } from '../../../common/data.common'
import user from './../../../assets/user.png'
import './MenuBarUser.css'

const MenuBarUser = () => {
	const currentUser = useSelector(state => state.userReducer)
	const location = useLocation()

	console.log(location)
	
	const showDropListManagement = () => {
		return dataCommon.menuBarNewsManagement.map((el, i) => {
			return < Link to={el.to} key={i}>
				<div className={`${el.className} ${location.pathname === el.to ? `background-gray` : ''}`}>
					<div className="item-core">
						<div className="item-core-2">
							<div className={location.pathname === el.to ? 'color-red' : ''}>{el.title}</div>
						</div>
					</div>
				</div>
			</Link >
		})
	}
	return <div className="left-bar">
		<div className='wrapper-left-bar'>
			<div className='user-infor'>
				<a className='mr-15'>
					<img className='avatar-user' src={user}></img>
				</a>
				<div className='fullname-infor'>
					<a className='fullname'>
						<h4>{currentUser.fullname}</h4>
					</a>
					<div className='phone-number'>
						<h2>{currentUser.phone}</h2>
					</div>
				</div>
			</div>
			<div className='dropdown'>
				{showDropListManagement()}
			</div> : <Fragment></Fragment>
		</div>
	</div>
}

export default MenuBarUser;