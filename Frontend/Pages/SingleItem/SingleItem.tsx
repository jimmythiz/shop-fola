import './SingleItem.css'
import {useParams,Link} from "react-router-dom"
import { useContext } from 'react';
import { ProductContext } from '../../utilities/Context/productscontext';
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

import { useRef } from 'react';

import ProductsCard from '../../Components/HomeComponents/ProductsCard/ProductsCard';
import SectionHeaders from "../../Components/HomeComponents/SectionHeaders/SectionHeaders"

const SingleItem:React.FC = () => {
    const {id} = useParams<{ id: string }>();
    
    const context = useContext(ProductContext);
     if (!context) {
      throw new Error("useProductContext must be used within a ProductContextProvider");
    }
   
  const { data, isLoading, error } = context;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading content</p>;
    if (!data || data.length === 0) return <p>No items to display</p>;
  
    const product = data.find((item) => item.id.toString() === id);
    const scrollRef = useRef<HTMLDivElement>(null);
    const details = {
        title:"Related Item",
        type:"",
        showArrow:false,
        scrollRef:scrollRef,
        showAllBtn:false
    }

  return (
    <div className="singleitem-container">
      <p className="singleitem-location"><Link to="/">Home / </Link>  Product / {product.title}</p>
      <div className="singleitem-details">
        <div className='anything-division'>
            <div className='singleitem-images'>
              <div className='singleitem-images-1'>
                <img src={product.images[0]} alt={product.slug} />
              </div>
              <div className='singleitem-images-2'>
                <img src={product.category.image} alt={product.slug} />
              </div>
              <div className='singleitem-images-3'>
                <img src={product.images[1]} alt={product.slug} />
              </div>
              <div className='singleitem-images-4'>
                <img src={product.images[2]} alt={product.slug} />
              </div>
              <div className='singleitem-images-5'>
                <img src={product.images[1]} alt={product.slug} />
              </div>
            </div>
            <div className="singleitem-description">
              <div className='singleitem-main-description'>
                <p className='product-title'>{product.title}</p>
                <p className='product-ratings'>Rating : 5 Stars</p>
                <p className='product-price'>$ {product.price}</p>
                <p className='product-desc'>{product.description}</p>
              </div>
              <div className='product-colors'>
                <p>Colors : </p>
                <div className='single-product-color'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="product-size">
                <p>Size : </p>
                <div className='single-product-size'>
                  <div>XL</div>
                  <div>X</div>
                  <div>M</div>
                  <div>L</div>
                  <div>S</div>
                </div>
              </div>
              <div className='product-action'>
                <div className='product-action-1'>
                  <button className='minus-button'>-</button>
                  <div>2</div>
                  <button className='plus-button'>+</button>
                </div>
                <div className='product-action-2'>
                  <button >Buy Now</button>
                </div>
              </div>
              <div className='product-footer'>
                <div className='product-footer-1'>
                  <div>
                    <TbTruckDelivery />
                  </div>
                  <div>
                    <p className='product-footer-p1'>Free Delivery</p>
                    <p className='product-footer-p2'>Enter Your Postal Code For Delivery Availability</p>
                  </div>
                </div>
                <div className='product-footer-1'>
                  <div>
                    <HiArrowPathRoundedSquare />
                  </div>
                  <div>
                    <p className='product-footer-p1'>Return Delivery</p>
                    <p className='product-footer-p2'>Free 30 Days Delivery Return</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='related-item'>
              <SectionHeaders details={details}/>
              <div className="best-selling-scroller" ref={scrollRef}>
              {data.map((item)=>(
                <Link to={`/products/${item.id}`} key={item.id}>
                    <ProductsCard singleItem={item}/>
                </Link>
            ))}
        </div>
        </div>
    </div>
    </div>
  )
}

export default SingleItem