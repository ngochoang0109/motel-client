
import AuthForm from "../../components/common/AuthForm/AuthForm";

const Login = () => {
	return (
		<div className="auth-form-styles__FormWrapper-sc-16d3ww9-0 eVBJAS">
			<h1 aria-live="polite" tabIndex={-1} className="sc-eIgblV eYwFVu">Đăng nhập</h1>
			<div className="card__Card-sc-1rk0phi-0 eBAZyN">
				<AuthForm form='login'></AuthForm>
			</div>
		</div>
	)
}

export default Login;