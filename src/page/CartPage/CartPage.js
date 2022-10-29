import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "../../action/message";
import MenuBarUser from "../../components/user/MenuBarUser/MenuBarUser";
import NewsCard from "../../components/user/NewsCard/NewsCard";
import { modeNews } from "../../constant/mode.news";
import { NewsManagementService } from "../../service/NewsManagementService";

const CartPage = () => {

	const [getNewsCard, setNewsCard] = useState({ content: [] })
	const dispatch = useDispatch()

	useEffect(() => {
		NewsManagementService.getAllPostOfUser(0,20, 'startedDate', 2).then((page) => {
			setNewsCard(page)
			dispatch(message.information(false))
		})
	}, [])

	const showNewsCard = () => {
		if (getNewsCard) {
			return getNewsCard.content
				.map((el) => {
					return <NewsCard key={el.id} title={el.title}
						price={el.price}
						area={el.area}
						province={el.province}
						district={el.district}
						description={el.description}
						fullName={el.fullName}
						phone={el.phone}
						startedDate={el.startedDate}
						closedDate={el.closedDate}
						avatar={el.avatar}
						mode={el.mode}
						totalAmount={el.totalAmount}
						id={el.id}></NewsCard>
				})
		}
	}

	return <Fragment>
		<MenuBarUser></MenuBarUser>
		<div className="right-bar">
			<div className="container-header">
				<div className='container-center'>
					<div className="title">
						<h3 className="sc-giIncl kuvrBD">Danh sách giỏ tin</h3>
					</div>
				</div>
			</div>
			<div className='table-data' style={{ "marginTop": "16px" }}>
				{showNewsCard()}
			</div>
		</div>
	</Fragment>
}

export default CartPage;