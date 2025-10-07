import './Login.css'
import loginimage from "../../src/assets/loginimage.png"
import { useState, ChangeEvent, FormEvent } from 'react'
import api, { setAccessToken } from "../../utilities/api"
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../utilities/Context/authcontext'

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email : "",
    password : ""
  })
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)  =>{
    e.preventDefault();
    setError(null);
    setLoading(true);
    try{
      const response = await api.post(`/auth/login`,formData)
      if (response.data?.accessToken) {
        await login(response.data.accessToken);
        setSuccess(true);
        setTimeout(() => navigate("/"), 1000); 
      } else {
        setError("Unexpected response from server.");
      }
    }catch(err:any){
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check your credentials or try again.";
      setError(message);
      }finally {
      setLoading(false);
    }
  }
  return (
    <div className="log-in-container">
        <div className="log-in-image">
          <img src={loginimage} alt="login-image" className="log-in-img" />
        </div>
        <div className="log-in-content">
          <p className="log-in-create">Log In To ShopFola</p>
          <p className="log-in-enterdetails">Enter your details</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email or Phone Number" name='email' onChange={handleChange} value={formData.email} disabled={loading} required/>
            <input type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password} disabled={loading} required/>
            {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">Login successful! Redirecting...</p>}
            <div className='log-in-actions'>
            <button className="create-account" type='submit' disabled={loading}>{loading ? "Logging in..." : "Log In"}</button>
            </div>
          </form>
          <div className='form-bottom'>
            <Link className="already-have" to='/forgot-password'>Forgot Password ?</Link>
            <p>Don't have an account ?  <Link className="already-have" to='/signup'>Sign Up</Link></p>
          </div>
            
        </div>
    </div>
  )
}

export default Login