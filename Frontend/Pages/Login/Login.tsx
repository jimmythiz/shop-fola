import './Login.css'
import loginimage from "../../src/assets/loginimage.png"

const Login = () => {
  return (
    <div className="log-in-container">
        <div className="log-in-image">
          <img src={loginimage} alt="login-image" className="log-in-img" />
        </div>
        <div className="log-in-content">
          <p className="log-in-create">Log In To ShopFola</p>
          <p className="log-in-enterdetails">Enter your details</p>
          <form action="">
            <input type="text" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password"/>
            <div className='log-in-actions'>
            <button className="create-account">Log In</button>
            <a className="already-have" href=''>Forgot Password ?</a>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login