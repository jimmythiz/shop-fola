import "./Products.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import { fetchProducts } from "../../../lib/fetchData";
import { Link } from "react-router-dom";
import { DataContext } from "../../../lib/Context/DataContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityQuery, setAvailabilityQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const data = useContext(DataContext);

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();

    const fetchProductsData = async () => {
      try {
        const res = await fetchProducts(controller.signal);
        setProducts(res.data || res); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductsData();
    return () => controller.abort();
  }, []);

  // ---- Debounced search ----
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // ---- Filtering ----
  let filteredProducts = [...products];

  if (debouncedSearch) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  if (availabilityQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.status.toLowerCase() === availabilityQuery.toLowerCase()
    );
  }

  if (categoryQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category_id?.some(
        (cat) => cat.name.toLowerCase() === categoryQuery.toLowerCase()
      )
    );
  }

  if (priceQuery === "High - Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (priceQuery === "Low - High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  // ---- Render ----
  return (
    <div className="product-container">
      <h3>Product List</h3>

      {/* Search + Filters */}
      <div className="product-search">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <label>
        Filter By Availability:
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
        Filter By Price:
        <select value={priceQuery} onChange={(e) => setPriceQuery(e.target.value)}>
          <option value="">All</option>
          <option value="High - Low">High - Low</option>
          <option value="Low - High">Low - High</option>
        </select>
      </label>

      <label>
        Filter By Category:
        <select
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
        >
          <option value="">All</option>
          {data.categories?.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
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
              <Link to={`/products/${product._id}`} className="edit-btn">
                Edit
              </Link>
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
