import WhatWeoffer from "../../Components/HomeComponents/WhatWeoffer/WhatWeoffer"
import "./About.css"

import profile from "../../src/assets/attractivewoman.png"

import shopladies from "../../src/assets/shopladies.png"
import { MdStore } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

const About = () => {
  return (
    <>
    <div className="about-page-container">
      <p className="about-location"><a href="/">Home / </a>  About</p>
      <div className="about-page-details">
        <div className="about-page-ejor">
          <p>Our Story</p>
          <p>Launced in 2025, ShopFola is Africa’s premier online shopping makterplace with an active presense in Nigeria. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.</p>
          <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.</p>
        </div>
        <div className="about-page-image">
          <img src={shopladies} alt="shopping ladies" />
        </div>
      </div>

      <div className="about-page-container-2">

        <div className="about-page-card">
          <div className="active-seller-circle">
            <div className="inner-active-seller-circle">
              <MdStore />
            </div>
          </div>
          <p className="how-many-k">10.5K</p>
          <p className="active-sell">Active Sellers On Our Site</p>
        </div>

        <div className="about-page-card">
          <div className="active-seller-circle">
            <div className="inner-active-seller-circle">
              <MdAttachMoney />
            </div>
          </div>
          <p className="how-many-k">33K</p>
          <p className="active-sell">Monthly Product Sale</p>
        </div>

        <div className="about-page-card">
          <div className="active-seller-circle">
            <div className="inner-active-seller-circle">
              <FaShoppingBag />
            </div>
          </div>
          <p className="how-many-k">45.5K</p>
          <p className="active-sell">Active Customers On Our Site</p>
        </div>

        <div className="about-page-card">
          <div className="active-seller-circle">
            <div className="inner-active-seller-circle">
              <TbMoneybag />
            </div>
          </div>
          <p className="how-many-k">24.5K</p>
          <p className="active-sell">Annual Gross Sale On Our Site</p>
        </div>

      </div>

      <div className="share-holders">
        <div className="shareholder-card">
          <div className="share-holder-image">
              <img src={profile} alt="share-holder-image" />
          </div>
          <p className="shareholder-name">Folajimi Omolola</p>
          <p className="shareholder-position">Founder & Chairman</p>
          <div className="shareholder-socials">
            <a href=""><FaXTwitter/></a>
            <a href=""><CiInstagram/></a>
            <a href=""><CiLinkedin/></a>
          </div>
        </div>
      </div>
    </div>
    <WhatWeoffer/>
    </>
  )
}

export default About