import './Allproducts.css'
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../utilities/Context/productscontext";
import ProductsCard from "../../Components/HomeComponents/ProductsCard/ProductsCard";
import { Link } from "react-router-dom";

const AllProducts: React.FC = () => {
  const context = useContext(ProductContext);
  const [page, setPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error("useProductContext must be used within ProductContextProvider");
  }

  const { fetchPaginatedProducts } = context;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchPaginatedProducts(page);
      if (data) {
        setPaginatedProducts(data.products);
        setTotalPages(data.totalPages);
      }
      setLoading(false);
    };
    loadProducts();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (!paginatedProducts || paginatedProducts.length === 0)
    return <p className="no-products">No products available.</p>;

  return (
    <div className="allproducts-container">
      <h2 className="allproducts-title">All Products</h2>
      <div className="allproducts-grid">
        {paginatedProducts.map((product: any) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <ProductsCard singleItem={product} />
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
