import "./HeroSection.css"
import { FaArrowRightLong } from "react-icons/fa6";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";


const HeroSection = () => {
    const context = useContext(ProductContext);
    if (!context) {
    throw new Error("useProductContext must be used within a ProductContextProvider");
  }
 
const { data, isLoading, error } = context;
 const products = data?.data || []; 

    const firstThree = products
        .filter(item => item.images[0]?.startsWith("http"))
        .slice(0,3)
    const [imageIndex,setimageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
        setimageIndex(prev => (prev + 1) % firstThree.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [firstThree.length]);
    const handleDotClick = (index:number)=>{
        setimageIndex(index)
    }
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading content</p>;
    if (firstThree.length === 0) return <p>No items to display</p>;
    const currentItem = firstThree[imageIndex]
  return (
    <div className="hero-section-container">
        <div className="hero-section-links">
            <ul>
                <li>Men's Fashion</li>
                <li>Women's Fashion</li>
                <li>Electronics</li>
                <li>Home & Lifestyle</li>
                <li>Medicine</li>
                <li>Sports & Outdoor</li>
                <li>Baby & Toys</li>
                <li>Groceries </li>
                <li>Beauty</li>
            </ul>
        </div>
        <div className="hero-section-corousel">
            <div className="hero-corousel-top">
                <div key={currentItem._id} className="hero-corousel-slide">
                    <div className="hero-corousel-text">
                        <p>{currentItem.name}</p>
                        <h1>Up To 10% Voucher</h1>
                        <p>Shop Now <FaArrowRightLong /></p>
                    </div>
                    <div className="hero-corousel-image">
                        <img src={currentItem.images[0]} alt={currentItem.name} />
                    </div>
                </div>
            </div>
            <div className="hero-corousel-dots">
                {firstThree.map((item,index)=>(
                    <span onClick={()=>handleDotClick(index)} key={item._id} className={`dot ${index ===imageIndex ? "active" : ""}`}></span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HeroSection