import { modeNews } from "../constant/mode.news";

export const dataCommon = {
	getDirections: [{ id: 0, name: 'Đông' }, { id: 0, name: 'Tây' }, { id: 0, name: 'Nam' },
	{ id: 0, name: 'Bắc' }, { id: 0, name: 'Đông Bắc' }, { id: 0, name: 'Tây Bắc' },
	{ id: 0, name: 'Tây Nam' }, { id: 0, name: 'Đông Nam' }],
	menuBarNewsManagement: [{ className: `item`, title: 'Đăng mới', to:'/trang-chu/tao-bai-viet' },
	{ className: `item`, title: 'Danh sách tin', to:'/trang-chu/quan-ly-bai-viet' },
	{ className: `item`, title: 'Tin nháp', to:'/trang-chu/tin-nhap' }],
	menuBarStatusManagement:[{ className: `active`, title: 'Tất cả', mode:modeNews.NEWS_ALL},
	{ className: `active`, title: 'Chờ Duyệt', mode:modeNews.WAITING_APROVED },
	{ className: `active`, title: 'Không duyệt', mode:modeNews.NEWS_REJECT},
	{ className: `active`, title: 'Chờ thanh toán', mode:modeNews.NEWS_WAIT_PAYMENT},
	{ className: `active`, title: 'Chờ hiển thị' , mode:modeNews.WAITING_SHOW},
	{ className: `active`, title: 'Đang hiển thị', mode:modeNews.SHOWING},
	{ className: `active`, title: 'Đã ẩn' , mode:modeNews.HINDDEN},
	{ className: `active`, title: 'Hết hạn', mode:modeNews.EXPRIED}]
}