import "./AdvertComponent.css"
import { useContext,useRef } from "react";
import { ProductContext } from "../../../utilities/Context/productscontext";

const AdvertComponent = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
        const context = useContext(ProductContext);
            if (!context) {
            throw new Error("useProductContext must be used within a ProductContextProvider");
          }
         
        const { trending, isLoading, error } = context;
         if (isLoading) {
        return <div>Loading Products... ⏳</div>;
      }
      if (error) {
        return <div>Error loading  products: {error.message} 😞</div>;
      }


    if (!trending || trending.length === 0) return <p>No Promo Items At The Moment</p>;
     const promoImage = trending[0]?.images?.[0] ;
    return (
    <div className="advert-container">
        <div className="advert-text">
            <h5>Categories</h5>
            <h1>Enhance your music experience</h1>
            <div className="advert-text-div">
                <div><h4>12</h4><p>Days</p></div>
                <div><h4>9</h4><p>Hours</p></div>
                <div><h4>45</h4><p>Minutes</p></div>
                <div><h4>55</h4><p>Seconds</p></div>
            </div>
            <button className="home-advert-button">Buy Now</button>
        </div>
        <div className="advert-image">
            <img src={promoImage} alt="" />
        </div>
    </div>
  )
}

export default AdvertComponent