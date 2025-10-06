import './Login.css'
import loginimage from "../../src/assets/loginimage.png"
import { useState, ChangeEvent, FormEvent } from 'react'
import api, { setAccessToken } from "../../utilities/api"
import { Link } from 'react-router-dom'

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email : "",
    password : ""
  })
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)  =>{
    e.preventDefault();
    try{
      const response = await api.post(`/auth/login`,formData)
      if (response.data?.accessToken) {
        setAccessToken(response.data.accessToken)
      }
      window.location.href = "/"
    }catch(error:any){
        console.error("Error Login in:", error.response?.data || error.message);
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
            <input type="text" placeholder="Email or Phone Number" name='email' onChange={handleChange} value={formData.email}/>
            <input type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password}/>
            <div className='log-in-actions'>
            <button className="create-account" type='submit'>Log In</button>
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