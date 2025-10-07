// src/pages/CategoryPage/CategoryPage.tsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../../utilities/Context/productscontext";
import ProductsCard from "../../Components/HomeComponents/ProductsCard/ProductsCard";
import "./CategoryProducts.css";

const ITEMS_PER_PAGE = 8;

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("CategoryPage must be used within ProductContextProvider");
  }

  const { fetchPaginatedProducts, isLoading: globalLoading } = context;

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1); 
  }, [categoryName]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!categoryName) return;
      setLoading(true);
      setError(null);
      const data = await fetchPaginatedProducts(page, ITEMS_PER_PAGE, { categorySlug: categoryName });
      if (!mounted) return;
      if (!data) {
        setProducts([]);
        setTotalPages(1);
        setError("Failed to load products for this category.");
      } else {
        setProducts(data.products);
        setTotalPages(data.totalPages || 1);
      }
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, [categoryName, page, fetchPaginatedProducts]);

  if (globalLoading && loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="category-page-container">
      <h2 className="category-page-title">{categoryName ? categoryName.toUpperCase() : "Category"}</h2>

      <div className="category-products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <Link to={`/products/${p._id}`} key={p._id}>
              <ProductsCard singleItem={p} />
            </Link>
          ))
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
