import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { message } from "../../../action/message";
import { AuthService } from "../../../service/AuthService";
import { authentication } from "../../../action/authentication"
import { messageConstant } from "../../../constant/messageConstant";
const AuthForm = ({ form }) => {

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [userInfor, setUserInfor] = useState({
		email: '',
		username: '',
		fullname: '',
		phone: '',
		password: '',
		usernameOrEmail: ''
	});

	const inputOnChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setUserInfor({
			...userInfor,
			[name]: value
		})
	}

	const handleSubmitForm = async (event) => {
		event.preventDefault();
		dispatch(message.information(true))
		if (form === 'login') {
			await AuthService.login({ usernameOrEmail: userInfor.usernameOrEmail, password: userInfor.password })
				.then(async (response) => {
					dispatch(message.information(false))
					if (response.data) {
						localStorage.setItem('tokenUser', JSON.stringify(response.data));
						dispatch(authentication.loginSuccess())
						dispatch(message.successfully(true, 'Đăng nhập thành công'))
						await navigate('/', { replace: true })
					} else {
						dispatch(authentication.loginFailure())
						dispatch(message.error(true, 'Đăng nhập thất bại'))
					}
				})
				.catch((error) => {
					dispatch(message.error(true, error.response.data.message))
					dispatch(authentication.loginFailure())
					dispatch(message.error(true, 'Đăng nhập thất bại'))
				})
		} else {
			await AuthService.register(userInfor)
				.then(async (response) => {
					dispatch(message.information(false))
					if (response.data.status) {
						dispatch(message.successfully(true, response.data.message))
						await navigate('/login', { replace: true })
					}
				})
				.catch((error) => {
					dispatch(message.error(true, error.response.data.message))
				})
		}
	}


	return (form === 'login' ? <section className="card__CardContent-sc-1rk0phi-2 koZRhX">
		<div className="signup__EmailSignupWrapper-sc-sn7qg1-2 cqjIZs">
			<form className="styles__EmailForm-sc-12i1x7w-0 jmUouI" onSubmit={handleSubmitForm}>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz" >Tài khoản hoặc email</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text" className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" 
					name="usernameOrEmail" onChange={inputOnChangeHandler}/>
				</div>
				<label htmlFor="password" className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Mật khẩu</label>
				<div className="sc-icwmWt irvEUu">
					<input type="password" name="password" onChange={inputOnChangeHandler}
					className="sc-dYdBQb daEQsZ sc-gqARDb fdSsJr styles__PasswordField-sc-12i1x7w-3 gcaSJR" />
				</div>
				<div className="email-signup-form__SubmitButtonWrapper-sc-40f0rp-4 knXhLd">
					<button className="sc-jJEJSO iJncOT sc-gbHxpA ePtOai" type="submit">Đăng nhập</button>
				</div>
			</form>
		</div>
		<ul className="login-more">
			<li>
				<span className="txt1">
					Quên&nbsp;
				</span>
				<Link to={'/'} className="txt2">
					mật khẩu?
				</Link>
			</li>
			<li>
				<span className="txt1">
					Chưa có tài khoản&nbsp;
				</span>
				<Link to={`/register`} className="txt2">
					Đăng ký
				</Link>
			</li>
			<li>
				<span className="txt1">
					Xem các phòng đang có sẵn&nbsp;
				</span>
				<Link to={'/'} className="txt2">
					Trang chủ
				</Link>
			</li>
		</ul>
	</section> : <section className="card__CardContent-sc-1rk0phi-2 koZRhX">
		<div className="signup__EmailSignupWrapper-sc-sn7qg1-2 cqjIZs">
			<form className="styles__EmailForm-sc-12i1x7w-0 jmUouI" onSubmit={handleSubmitForm}>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Địa chỉ email</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="email"
						className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe"
						name="email"
						onChange={inputOnChangeHandler} />
				</div>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Tên tài khoản</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text"
						className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe"
						name="username"
						onChange={inputOnChangeHandler} />
				</div>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Họ và tên</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text" className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" name="fullname"
						onChange={inputOnChangeHandler} />
				</div>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Số điện thoại liên lạc</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text" className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" name="phone"
						onChange={inputOnChangeHandler} />
				</div>
				<label htmlFor="password" className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Mật khẩu</label>
				<div className="sc-icwmWt irvEUu">
					<input type="password" name="password"
						className="sc-dYdBQb daEQsZ sc-gqARDb fdSsJr styles__PasswordField-sc-12i1x7w-3 gcaSJR"
						onChange={inputOnChangeHandler} />
				</div>
				<div className="email-signup-form__SubmitButtonWrapper-sc-40f0rp-4 knXhLd">
					<button className="sc-jJEJSO iJncOT sc-gbHxpA ePtOai" type="submit">Đăng ký</button>
				</div>
			</form>
		</div>
		<ul className="login-more">
			<li>
				<span className="txt1">
					Bạn đã có tài khoản&nbsp;
				</span>
				<Link to="/login" className="txt2">
					{messageConstant.msgAutheticatedFalse}
				</Link>
			</li>
			<li>
				<span className="txt1">
					Xem các phòng đang có sẵn&nbsp;
				</span>
				<Link to="/" className="txt2">
					Trang chủ
				</Link>
			</li>
		</ul>
	</section>)

}

export default AuthForm;