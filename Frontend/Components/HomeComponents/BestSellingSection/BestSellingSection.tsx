import './BestSellingSection.css'
import ProductsCard from "../ProductsCard/ProductsCard"
import { useContext } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";

import { useRef } from 'react';
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import { Link } from 'react-router-dom';
const BestSellingSection = () => {
  
      const context = useContext(ProductContext);
      if (!context) {
      throw new Error("useProductContext must be used within a ProductContextProvider");
    }
   
  const { data, isLoading, error } = context;
   const products = data?.data || []; 
    const scrollRef = useRef<HTMLDivElement>(null);
    const details = {
        title:"This Month",
        type:"Best Selling Product",
        showArrow:false,
        scrollRef:scrollRef,
        showAllBtn:true
    }
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading content</p>;
    if (!products || products.length === 0) return <p>No items to display</p>;
   
  return (
    <div className='best-selling-category-container'>
        <SectionHeaders details={details}/>
        <div className="best-selling-scroller" ref={scrollRef}>
          {products.map((item)=>(
            <Link to={`/products/${item._id}`} key={item._id}>
              <ProductsCard singleItem={item}/>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default BestSellingSection