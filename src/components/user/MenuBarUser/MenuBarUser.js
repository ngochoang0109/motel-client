import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { dataCommon } from '../../../common/data.common'
import user from './../../../assets/user.png'
import './MenuBarUser.css'
const MenuBarUser = () => {
	const [showManagement, setShowManagement] = useState(false)
	const [isActive, setActive] = useState({ id: 0, status: false })
	const handleShowManagement = () => {
		setShowManagement(!showManagement)
	}
	const showDropListManagement = () => {
		return dataCommon.menuBarNewsManagement.map((el, i) => {
			return < Link to="/trang-chu/tao-bai-viet" onClick={() => setActive({ id: i, status: !isActive.status })} key={i}>
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
			<div className='news-management' onClick={handleShowManagement}>
				<div className='news-management-core'>
					<div className='left'>
						<span class="icon-left" className={showManagement ? 'color-red' : ''}>
							<svg fontSize="24px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M4.5 13C5.32843 13 6 12.3284 6 11.5C6 10.6716 5.32843 10 4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M4.5 20C5.32843 20 6 19.3284 6 18.5C6 17.6716 5.32843 17 4.5 17C3.67157 17 3 17.6716 3 18.5C3 19.3284 3.67157 20 4.5 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8.5 4.5H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8.5 11.5H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8.5 18.5H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
						<h3 className={showManagement ? 'color-red' : ''}>Quản lý tin đăng</h3>
					</div>
					<div className='right'>
						<svg fontSize="16px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path xmlns="http://www.w3.org/2000/svg" d="M9 20L17 12L9 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
							</path>
						</svg>
					</div>
				</div>
			</div>
			{showManagement ? <div className='dropdown'>
				{showDropListManagement()}
			</div> : <Fragment></Fragment>}

		</div>
	</div>
}

export default MenuBarUser;