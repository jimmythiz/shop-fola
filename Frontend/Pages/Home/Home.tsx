import "./Home.css"
import HeroSection from "../../Components/HomeComponents/HeroSection/HeroSection"
import TimeSection from "../../Components/HomeComponents/TimeSection/TimeSection"
import HomeCategory from "../../Components/HomeComponents/HomeCategory/HomeCategory" 
import BestSellingSection from "../../Components/HomeComponents/BestSellingSection/BestSellingSection"
import AdvertComponent from "../../Components/HomeComponents/AdvertComponent/AdvertComponent"
import NewArrival from "../../Components/HomeComponents/NewArrival/NewArrival"
import WhatWeoffer from "../../Components/HomeComponents/WhatWeoffer/WhatWeoffer"

const Home = () => {
  return (
    <div className="home-container">
        <HeroSection/>
        <TimeSection/>
        <HomeCategory/>
        <BestSellingSection/>
        <AdvertComponent/>
        <NewArrival/>
        <WhatWeoffer/>
    </div>
  )
}

export default Home