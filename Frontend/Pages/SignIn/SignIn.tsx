import "./SignIn.css"
import { FaGoogle } from "react-icons/fa";
import loginimage from "../../src/assets/loginimage.png"
import { useState, ChangeEvent, FormEvent } from "react";
import {Link} from "react-router-dom"
import api from "../../utilities/api";

type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname : "",
    lastname : "",
    username : "",
    email : "",
    password : "",
    confirmPassword : "",
    phoneNumber: ""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
      const {name, value} = e.target;
      setFormData((prev)=>({
        ...prev, [name] : value
        }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        const response = await api.post('/auth/signUp',formData)
        console.log("User registered:", response.data);
      }catch(error:any){
        console.error("Error registering:", error.response?.data || error.message);
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
            <input type="text" placeholder="First name" name="firstname" onChange={handleChange} required />
            <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} required />
            <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} required />
            <input type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleChange} required />
            <button className="create-account" type="submit">Create Account</button>
            <button className="sign-with-google" type="button"><FaGoogle />Sign Up With Google</button>
            <p className="already-have">Already have an account ?<Link to="/login">Log In</Link></p>
          </form>
        </div>
    </div>
  )
}

export default SignIn