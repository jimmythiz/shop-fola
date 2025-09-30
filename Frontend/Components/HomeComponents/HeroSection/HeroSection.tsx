import React, { useContext, useEffect, useState } from "react";
import "./HeroSection.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProductContext } from "../../../utilities/Context/productscontext";

type Product = {
  _id: string;
  name: string;
  images?: string[];
  // add other fields you use
};

const HeroSection: React.FC = () => {
 const context = useContext(ProductContext);
 
  const [imageIndex, setImageIndex] = useState<number>(0);
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

  const firstThree = allProducts
    .filter((p) => p.images?.[0]?.startsWith("http"))
    .slice(0, 3);


  // clamp/reset index when slides change
  // useEffect(() => {
  //   if (firstThree.length === 0) {
  //     setImageIndex(0);
  //     return;
  //   }
  //   setImageIndex((prev) => prev % firstThree.length);
  // }, [firstThree.length]);

  // autoplay only when there's more than 1 slide
  // useEffect(() => {
  //   if (firstThree.length <= 1) return;
  //   const id = setInterval(() => {
  //     setImageIndex((prev) => (prev + 1) % firstThree.length);
  //   }, 5000);
  //   return () => clearInterval(id);
  // }, [firstThree.length]);

  const handleDotClick = (index: number) => {
    setImageIndex(index);
  };

  if (firstThree.length === 0) return <p>No items to display00</p>;

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
          <li>Groceries</li>
          <li>Beauty</li>
        </ul>
      </div>

      <div className="hero-section-corousel">
        <div className="hero-corousel-top">
          {firstThree.map((item, index) => (
            <article
              key={item._id}
              className={`hero-corousel-slide ${index === imageIndex ? "active" : ""}`}
              aria-hidden={index === imageIndex ? "false" : "true"}
            >
              <div className="hero-corousel-text">
                <p>{item.name}</p>
                <h1>Up To 10% Voucher</h1>
                <p>
                  Shop Now <FaArrowRightLong />
                </p>
              </div>
              <div className="hero-corousel-image">
                <img
                  src={item.images?.[0] ?? ""}
                  alt={item.name}
                  onError={(e) => {
                    // optional fallback if image fails
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder-image.png";
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="hero-corousel-dots">
          {firstThree.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`dot ${index === imageIndex ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
