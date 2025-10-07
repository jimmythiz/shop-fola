import "./TimeSection.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";

import { useRef } from 'react';
import ProductsCard from "../ProductsCard/ProductsCard";
import SectionHeaders from "../SectionHeaders/SectionHeaders";

const TimeSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
    const context = useContext(ProductContext);
        if (!context) {
        throw new Error("useProductContext must be used within a ProductContextProvider");
      }
     
    const { allProducts, isLoading, error } = context;
     if (isLoading) {
    return <div>Loading Products... ⏳</div>;
  }
  if (error) {
    return <div>Error loading  products: {error.message} 😞</div>;
  }
    
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

    if (!allProducts || allProducts.length === 0) return <p>No items to display</p>;
  return (
    <div className="time-section-container">
        <SectionHeaders details={details}/>
        <div className="time-section-slider" ref={scrollRef}>
            {allProducts.map((item)=>(
            <Link to={`/products/${item._id}`} key={item._id}>
              <ProductsCard key={item._id} singleItem={item}/>
              </Link>
            ))}
        </div>
        <div className="time-section-all-link">
            <Link to="/allproducts">View All Product</Link>
        </div>
    </div>
  )
}

export default TimeSection