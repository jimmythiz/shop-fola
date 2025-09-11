import { useNavigate } from 'react-router';
import { useAuth } from '../../../lib/Context/AuthContext';
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
   const { login } = useAuth();
  const loginfunction =()=>{
    login();
    navigate("/", { replace: true });
  }
  return (
    <div className='login-container'>
      <button onClick={loginfunction}>Login</button>
    </div>
  )
}

export default Login