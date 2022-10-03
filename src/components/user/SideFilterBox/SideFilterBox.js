const SideFilterBox = ({ children, title }) => {
	return (<div className="re__sidebar-box re__price-box">
		<h2 className="re__sidebar-box-title">{title}</h2>
		<div className="re__sidebar-box-content">
			{children}
		</div>
	</div>)
}

export default SideFilterBox;