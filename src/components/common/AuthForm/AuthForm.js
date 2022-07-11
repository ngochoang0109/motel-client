import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthAction } from "../../../action/AuthAction";
const AuthForm = ({ form }) => {

	const dispatch=useDispatch();

	const [userInfor, setUserInfor] = useState({
		email: '',
		username: '',
		phone: '',
		password: ''
	});

	const inputOnChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setUserInfor({
			...userInfor,
			[name]:value
		})
	}

	const handleSubmitForm = (event) => {
		event.preventDefault();
		dispatch(AuthAction.register(userInfor));
	}


	return (form === 'login' ? <section className="card__CardContent-sc-1rk0phi-2 koZRhX">
		<div className="signup__EmailSignupWrapper-sc-sn7qg1-2 cqjIZs">
			<form className="styles__EmailForm-sc-12i1x7w-0 jmUouI">
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz" >Tài khoản hoặc email</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="email" className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" name="email" />
				</div>
				<label htmlFor="password" className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Mật khẩu</label>
				<div className="sc-icwmWt irvEUu">
					<input type="password" name="password" className="sc-dYdBQb daEQsZ sc-gqARDb fdSsJr styles__PasswordField-sc-12i1x7w-3 gcaSJR" />
				</div>
				<div className="email-signup-form__SubmitButtonWrapper-sc-40f0rp-4 knXhLd">
					<button className="sc-jJEJSO iJncOT sc-gbHxpA ePtOai" type="submit">Đăng nhập</button>
				</div>
			</form>
		</div>
		<ul classname="login-more">
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
									onChange={inputOnChangeHandler}/>
				</div>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Tên tài khoản</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text" 
									className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" 
									name="username" 
									onChange={inputOnChangeHandler}/>
				</div>
				<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Số điện thoại liên lạc</label>
				<div className="sc-icwmWt iXXDXO">
					<input type="text" className="sc-dYdBQb hxqKDG styles__TextField-sc-12i1x7w-2 igEGOe" name="phone" 
									onChange={inputOnChangeHandler}/>
				</div>
				<label htmlFor="password" className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Mật khẩu</label>
				<div className="sc-icwmWt irvEUu">
					<input type="password" name="password" 
									className="sc-dYdBQb daEQsZ sc-gqARDb fdSsJr styles__PasswordField-sc-12i1x7w-3 gcaSJR" 
									onChange={inputOnChangeHandler}/>
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
					Vui lòng đăng nhập
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