import "./SignIn.css"
import { FaGoogle } from "react-icons/fa";
import loginimage from "../../src/assets/loginimage.png"

const SignIn = () => {
  return (
    <div className="sign-in-container">
        <div className="sign-in-image">
          <img src={loginimage} alt="login-image" className="sign-in-img" />
        </div>
        <div className="sign-in-content">
          <p className="sign-in-create">Create an account</p>
          <p className="sign-in-enterdetails">Enter your details</p>
          <form action="">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password"/>
            <button className="create-account">Create Account</button>
            <button className="sign-with-google"><FaGoogle />Sign Up With Google</button>
            <p className="already-have">Already have an account ?<a href="/login">Log In</a></p>
          </form>
        </div>
    </div>
  )
}

export default SignIn