import "./SingleItem.css";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../../utilities/Context/productscontext";
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

import ProductsCard from "../../Components/HomeComponents/ProductsCard/ProductsCard";
import SectionHeaders from "../../Components/HomeComponents/SectionHeaders/SectionHeaders";

const SingleItem: React.FC = () => {
  const context = useContext(ProductContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<any | null>(null);
  const { id } = useParams<{ id: string }>();

  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  const { fetchProduct, isLoading, error, allProducts } = context;

  useEffect(() => {
    if (!id) return;
    (async () => {
      const fetched = await fetchProduct(id);
      setProduct(fetched);
    })();
  }, [id, fetchProduct]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading content</p>;
  if (!product) return <p>No product found</p>;

  const details = {
    title: "Related Item",
    type: "",
    showArrow: false,
    scrollRef: scrollRef,
    showAllBtn: false,
  };

  return (
    <div className="singleitem-container">
      <p className="singleitem-location">
        <Link to="/">Home / </Link> Product / {product.name}
      </p>
      <div className="singleitem-details">
        <div className="anything-division">
          <div className="singleitem-images">
            {product.images?.slice(0, 5).map((img: string, i: number) => (
              <div key={i} className={`singleitem-images-${i + 1}`}>
                <img src={img} alt={product.slug} />
              </div>
            ))}
          </div>
          <div className="singleitem-description">
            <div className="singleitem-main-description">
              <p className="product-title">{product.name}</p>
              <p className="product-ratings">Rating : {product.rating} Stars</p>
              <p className="product-price">$ {product.price}</p>
              <p className="product-desc">{product.description}</p>
            </div>
            <div className="product-colors">
              <p>Colors : </p>
              <div className="single-product-color">
                {product.color?.map((c: string, i: number) => (
                  <div key={i} style={{ background: c }}></div>
                ))}
              </div>
            </div>
            <div className="product-size">
              <p>Size : </p>
              <div className="single-product-size">
                {product.size?.map((s: string, i: number) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            </div>
            <div className="product-action">
              <div className="product-action-1">
                <button className="minus-button">-</button>
                <div>1</div>
                <button className="plus-button">+</button>
              </div>
              <div className="product-action-2">
                <button>Buy Now</button>
              </div>
            </div>
            <div className="product-footer">
              <div className="product-footer-1">
                <div>
                  <TbTruckDelivery />
                </div>
                <div>
                  <p className="product-footer-p1">Free Delivery</p>
                  <p className="product-footer-p2">
                    Enter Your Postal Code For Delivery Availability
                  </p>
                </div>
              </div>
              <div className="product-footer-1">
                <div>
                  <HiArrowPathRoundedSquare />
                </div>
                <div>
                  <p className="product-footer-p1">Return Delivery</p>
                  <p className="product-footer-p2">
                    Free 30 Days Delivery Return
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="related-item">
          <SectionHeaders details={details} />
          <div className="best-selling-scroller" ref={scrollRef}>
            {allProducts.map((item) => (
              <Link to={`/products/${item._id}`} key={item._id}>
                <ProductsCard singleItem={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
