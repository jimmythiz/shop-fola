import "./Products.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../../lib/fetchData";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityQuery, setAvailabilityQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchproducts = async () => {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data.data || data); // adjust to backend response
      } catch (error) {
        console.log(error);
      }
    };

    fetchproducts();
    return () => controller.abort();
  }, []);

  // ---- Filtering ----
  let filteredProducts = [...products];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (availabilityQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.status.toLowerCase() === availabilityQuery.toLowerCase()
    );
  }

  if (priceQuery === "High - Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (priceQuery === "Low - High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (categoryQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category_id?.some(
        (cat) => cat.name.toLowerCase() === categoryQuery.toLowerCase()
      )
    );
  }

  // ---- Render ----
  return (
    <div className="product-container">
      <h3>Product List</h3>

      {/* Search + Filters */}
      <div className="product-search">
        <input
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch />
      </div>

      <label>
        Filter By Availability :
        <select
          value={availabilityQuery}
          onChange={(e) => setAvailabilityQuery(e.target.value)}
        >
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </label>

      <label>
        Filter By Price :
        <select
          value={priceQuery}
          onChange={(e) => setPriceQuery(e.target.value)}
        >
          <option value="">All</option>
          <option value="High - Low">High - Low</option>
          <option value="Low - High">Low - High</option>
        </select>
      </label>

      <label>
        Filter By Category :
        <select
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
        >
          <option value="">All</option>
          {/* ideally populate this dynamically from backend */}
          <option value="Phones">Phones</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Children">Children</option>
        </select>
      </label>

      {/* Table Header */}
      <div className="product-header">
        <p>Image</p>
        <p>Product Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      {/* Product List */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-grid-list">
              
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                />
                <p>{product.name}</p>
              
              <p>
                {product.category_id?.length > 0
                  ? product.category_id.map((cat) => cat.name).join(", ")
                  : "Uncategorized"}
              </p>
              <p>${product.price}</p>
              <p>{product.status}</p>
              <Link to={`/products/${product._id}`}>Edit</Link>
            </div>
          ))
        ) : (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#999",
              marginTop: "2rem",
            }}
          >
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
