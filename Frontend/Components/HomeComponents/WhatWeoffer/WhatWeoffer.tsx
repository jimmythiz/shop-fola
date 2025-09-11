import './WhatWeoffer.css'
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { SiAdguard } from "react-icons/si";

const WhatWeoffer = () => {
  return (
    <div className='what-we-offer'>
        <div className='what-we-offer-sec-1'>
            <div className='eightybyeighty'>
                <div className='fiftyeightbyfiftyeight'>
                    <TbTruckDelivery />
                </div>
            </div>
            <h3>Free and Fast Delivery</h3>
            <p>Free Delivery For All Orders Over $140</p>
        </div>
        <div className='what-we-offer-sec-2'>
            <div className='eightybyeighty'>
                <div className='fiftyeightbyfiftyeight'>
                    <RiCustomerService2Fill />
                </div>
            </div>
            <h3>24/7 Customer Service</h3>
            <p>Friendly 24/7 Customer Support</p>
        </div>
        <div className='what-we-offer-sec-3'>
            <div className='eightybyeighty'>
                <div className='fiftyeightbyfiftyeight'>
                    <SiAdguard />
                </div>
            </div>
            <h3>Money Back Guarantee</h3>
            <p>We rerun money within 30 days</p>
        </div>
    </div>
  )
}

export default WhatWeoffer