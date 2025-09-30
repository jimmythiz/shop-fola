import './BestSellingSection.css'
import ProductsCard from "../ProductsCard/ProductsCard"
import { useContext } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";

import { useRef } from 'react';
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import { Link } from 'react-router-dom';

const BestSellingSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const context = useContext(ProductContext);
  
  if (!context) {
    throw new Error("useProductContext must be used within a ProductContextProvider");
  }
   
  const { bestSelling, isLoading, error } = context;
    if (isLoading) {
    return <div>Loading Best Selling Products... ⏳</div>;
  }
  if (error) {
    return <div>Error loading Best Selling products: {error.message} 😞</div>;
  }
  
  
  const details = {
    title: "This Month",
    type: "Best Selling Product",
    showArrow: false,
    scrollRef: scrollRef,
    showAllBtn: true
  }

  if (!bestSelling || bestSelling.length === 0) return <p>No itemsssss to display</p>;
   
  return (
    <div className='best-selling-category-container'>
      <SectionHeaders details={details}/>
      <div className="best-selling-scroller" ref={scrollRef}>
        {bestSelling.map((item) => (
          <Link to={`/products/${item._id}`} key={item._id}>
            <ProductsCard singleItem={item}/>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BestSellingSection