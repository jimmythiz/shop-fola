import "./TimeSection.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";

import { useRef } from 'react';
import ProductsCard from "../ProductsCard/ProductsCard";
import SectionHeaders from "../SectionHeaders/SectionHeaders";

const TimeSection = () => {
    const context = useContext(ProductContext);
        if (!context) {
        throw new Error("useProductContext must be used within a ProductContextProvider");
      }
     
    const { data, isLoading, error } = context;
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const details = {
        title:"Today's",
        type:"Flash Sales",
         days :"Days",
        hours: "Hours",
        minutes:"Minutes",
        seconds:"Seconds",
        daystime:12,
        hourtime:13,
        minutetime:45,
        secondstime: 0,
        showTimer:true,
        showArrow:true,
        scrollRef:scrollRef
    }


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading content</p>;
    if (!data || data.length === 0) return <p>No items to display</p>;
  return (
    <div className="time-section-container">
        <SectionHeaders details={details}/>
        <div className="time-section-slider" ref={scrollRef}>
            {data.map((item)=>(
            <Link to={`/products/${item.id}`} key={item.id}>
              <ProductsCard key={item.id} singleItem={item}/>
              </Link>
            ))}
        </div>
        <div className="time-section-all-link">
            <a href="/">View All Product</a>
        </div>
    </div>
  )
}

export default TimeSection