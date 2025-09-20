import "./ProductsCard.css" 

import { LiaEyeSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

interface ProductsCardProps {
  singleItem: any;  
}
const ProductsCard = ({singleItem}:ProductsCardProps) => {
  return (
    <div className="product-card">
            <div className="product-image">
                <img src={singleItem.images[0]} alt={singleItem.
blob} />
                <span className="product-percent-off">30%</span>
                <span className="product-view"><LiaEyeSolid /></span>
                <span className="product-like"><FaHeart /></span>
            </div>
            <div className="product-details">
                <div className="product-details-name">{singleItem.name}</div>
                <div className="product-details-price">${singleItem.price} <span style={{textDecoration:"line-through", marginLeft:"10px", color:"#9b9b9b"}}>${singleItem.price}</span></div>
                <div className="product-details-stars"><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /> <span style={{marginLeft:"10px", color:"#9b9b9b"}}>(90)</span></div>
            </div>
        </div>
  )
}

export default ProductsCard