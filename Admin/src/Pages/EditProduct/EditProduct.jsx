import "./EditProduct.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {  DataContext } from "../../../lib/Context/DataContext"; // adjust path
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { categories, tags, loading } = useContext(DataContext);

  // Fetch product only
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProduct(res.data.data || res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setProduct((prev) => {
        const array = [...(prev[name] || [])];
        if (checked) array.push(value);
        else array.splice(array.indexOf(value), 1);
        return { ...prev, [name]: array };
      });
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/products/${id}`,
        product
      );
      console.log("Product updated:", res.data);
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="edit-product-container">
      <h1>Edit {product.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleInputChange} />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleInputChange} />

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleInputChange} />

        <fieldset>
          <legend>Categories</legend>
          {categories.map((cat) => (
            <label key={cat._id}>
              <input
                type="checkbox"
                name="category_id"
                value={cat._id}
                checked={product.category_id?.includes(cat._id)}
                onChange={handleInputChange}
              />
              {cat.name}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Tags</legend>
          {tags.map((tag) => (
            <label key={tag._id}>
              <input
                type="checkbox"
                name="tag_ids"
                value={tag._id}
                checked={product.tag_ids?.includes(tag._id)}
                onChange={handleInputChange}
              />
              {tag.name}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Sizes</legend>
          {["Small", "Medium", "Large", "Extra Large"].map((sz) => (
            <label key={sz}>
              <input
                type="checkbox"
                name="size"
                value={sz}
                checked={product.size?.includes(sz)}
                onChange={handleInputChange}
              />
              {sz}
            </label>
          ))}
        </fieldset>

        <label>Color:</label>
        <input type="text" name="color" value={product.color} onChange={handleInputChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} />

        <label>Status:</label>
        <select name="status" value={product.status} onChange={handleInputChange}>
          <option value="Available">Available</option>
          <option value="Sold Out">Sold Out</option>
        </select>

        <label>Rating:</label>
        <input type="number" name="rating" min={1} max={5} step={0.1} value={product.rating.count} onChange={handleInputChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
