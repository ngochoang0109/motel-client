import './Register.css'
import {Link} from "react-router-dom";
import AuthForm from '../../components/common/AuthForm/AuthForm';

const Register = () => {
	return (<div className="auth-form-styles__FormWrapper-sc-16d3ww9-0 eVBJAS">
		<h1 aria-live="polite" tabIndex={-1} className="sc-eIgblV eYwFVu">Đăng ký tài khoản</h1>
		<div className="card__Card-sc-1rk0phi-0 eBAZyN">
			<AuthForm form='register'></AuthForm>
		</div>
	</div>)
}

export default Register;