import "./Footer.css"
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
        <div className="footer-exclusive">
            <p className="footer-list">Exclusive</p>
            <h4>Subscribe</h4>
            <form action="">
                <label htmlFor="">Get 10% off your first order</label><br />
                <div className="passthepo">
                <input type="text" placeholder="Enter your email"/> 
                <IoSend />
                </div>
            </form>
        </div>
        <div className="footer-support">
            <p className="footer-list">Support</p>
            <p  className="footer-list-items">Lagos, Nigeria.</p>
            <p className="footer-list-items">folajimiomolola5@gmail.com</p>
            <p className="footer-list-items">+234 815 407 3246</p>
        </div>
        <div className="footer-account">
            <p className="footer-list">Account</p>
            <Link to="/myaccount" className="footer-list-items">My Account</Link>
            <Link to="/login" className="footer-list-items">Login/Register</Link>
            <Link to="/cart" className="footer-list-items">Cart</Link>
            <Link to="/" className="footer-list-items">Shop</Link>
        </div>
        <div className="footer-quick-links">
            <p className="footer-list">Quick Links</p>
            <Link to="" className="footer-list-items">Privacy Policy</Link>
            <Link to="" className="footer-list-items">Terms Of Use</Link>
            <Link to="" className="footer-list-items">FAQ</Link>
            <Link to="/contact" className="footer-list-items">Contact</Link>
        </div>
    </div>
  )
}

export default Footer