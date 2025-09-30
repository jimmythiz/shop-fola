import "./SignIn.css"
import { FaGoogle } from "react-icons/fa";
import loginimage from "../../src/assets/loginimage.png"
import { useState } from "react";
import {Link} from "react-router-dom"
import api from "../../utilities/api";

const SignIn = () => {
  const [formData, setFormData] = useState({
    firstname : "",
    lastname : "",
    username : "",
    email : "",
    password : "",
    confirmPassword : "",
    phoneNumber: ""
  })

  const handleChange = (e) =>{
      const {name, value} = e.target;
      setFormData((prev)=>({
        ...prev, [name] : value
        }))
  }
  const handleSubmit = (e) =>{
      e.preventDefault()
      try{
        const response = api.post('',formData)
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
            <input type="text" placeholder="First name" name="firstname" onChange={handleChange} />
            <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} />
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="text" placeholder="Emai" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange}/>
            <input type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleChange}/>
            <button className="create-account">Create Account</button>
            <button className="sign-with-google"><FaGoogle />Sign Up With Google</button>
            <p className="already-have">Already have an account ?<Link to="/login">Log In</Link></p>
          </form>
        </div>
    </div>
  )
}

export default SignIn