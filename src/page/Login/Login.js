import {Link} from "react-router-dom";

const Login = () => {
	return (
		<div className="auth-form-styles__FormWrapper-sc-16d3ww9-0 eVBJAS">
			<h1 aria-live="polite" tabIndex={-1} className="sc-eIgblV eYwFVu">Đăng nhập</h1>
			<div className="card__Card-sc-1rk0phi-0 eBAZyN">
				<section className="card__CardContent-sc-1rk0phi-2 koZRhX">
					<div className="signup__EmailSignupWrapper-sc-sn7qg1-2 cqjIZs">
						<form className="styles__EmailForm-sc-12i1x7w-0 jmUouI">
							<label className="styles__TextFieldLabel-sc-12i1x7w-1 cvbjEz">Tài khoản hoặc email</label>
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
				</section>
			</div>
		</div>
	)
}

export default Login;