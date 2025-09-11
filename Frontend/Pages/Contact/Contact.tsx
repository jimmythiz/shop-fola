import "./Contact.css"

import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="contact-container">
      <p className="contact-location"><a href="/">Home / </a>  Contact</p>
      <div className="contact-details">
        <div className="contact-ejor">
          <div className="contact-ejor-1">
            <div className="ejor-1">
              <div><FaPhoneAlt/></div>
              <p>Call Us</p>
            </div>
            <p>We are available 24/7, 7 Days a week</p>
            <p>Phone : +234 815 407 3246</p>
          </div>
          <div className="contact-ejor-2">
            <div className="ejor-1">
              <div><MdOutlineMail/></div>
              <p>Write To Us</p>
            </div>
            <p>Fill out our form and we would contact you within 24 hours</p>
            <p>Email : folajimiomolola5@gmail.com</p>
          </div>
        </div>
        <div className="contact-form">
          <form action="">
            <div>
              <input type="text" placeholder="Your Name"/>
              <input type="text" placeholder="Your Email"/>
              <input type="text" placeholder="Your Phone"/>
            </div>
            <textarea name="" id="" placeholder="Your Message"></textarea>
            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact