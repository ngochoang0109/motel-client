import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { dataCommon } from '../../../common/data.common'
import user from './../../../assets/user.png'
import './MenuBarUser.css'
const MenuBarUser = () => {
	const [isActive, setActive] = useState({ id: 0, status: false })
	
	const showDropListManagement = () => {
		return dataCommon.menuBarNewsManagement.map((el, i) => {
			return < Link to={el.to} onClick={() => setActive({ id: i, status: !isActive.status })} key={i}>
				<div className={`${el.className} ${i === isActive.id ? `background-gray` : ''}`}>
					<div className="item-core">
						<div className="item-core-2">
							<div className={i === isActive.id ? 'color-red' : ''}>{el.title}</div>
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
						<h4>Tran Ngoc Hoang</h4>
					</a>
					<div className='phone-number'>
						<h2>0329846639</h2>
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