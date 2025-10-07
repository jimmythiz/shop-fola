import "./SignUp.css"
import { FaGoogle } from "react-icons/fa";
import loginimage from "../../src/assets/loginimage.png"
import { useState, ChangeEvent, FormEvent } from "react";
import {Link,useNavigate} from "react-router-dom"
import api from "../../utilities/api";
import { useAuth } from "../../utilities/Context/authcontext";

type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname : "",
    lastname : "",
    username : "",
    email : "",
    password : "",
    confirmPassword : "",
    phoneNumber: ""
  })
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

   const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
      const {name, value} = e.target;
      setFormData((prev)=>({
        ...prev, [name] : value
        }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
       setError(null);
    setSuccess(false);
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
      try{
        const response = await api.post('/auth/signUp',formData)
        if (response.data?.accessToken) {
        await login(response.data.accessToken);
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1500); 
      } else {
        navigate("/login");
      }
      }catch(err:any){
        const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed. Please check your details or try again later.";
      setError(message);
      }finally {
      setLoading(false);
    }
  } 
  return (
    <div className="sign-in-container">
        <div className="sign-in-image">
          <img src={loginimage} alt="login-image" className="sign-in-img" />
        </div>
        <div className="sign-in-content">
          <p className="sign-in-create">Create an account</p>
          <p className="sign-in-enterdetails">Enter your details</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" name="firstname" onChange={handleChange} disabled={loading} required />
            <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} disabled={loading} required />
            <input type="text" placeholder="Username" name="username" onChange={handleChange} disabled={loading} required />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} disabled={loading} required />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} disabled={loading} required/>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} disabled={loading} required />
            <input type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleChange} disabled={loading} required />
            {error && <p className="error-text">{error}</p>}
          {success && (
            <p className="success-text">Account created! Redirecting to login...</p>
          )}
            <button className="create-account" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</button>
            <button className="sign-with-google" type="button" disabled={true}><FaGoogle />Sign Up With Google</button>
            <p className="already-have">Already have an account ?<Link to="/login">Log In</Link></p>
          </form>
        </div>
    </div>
  )
}

export default SignUp