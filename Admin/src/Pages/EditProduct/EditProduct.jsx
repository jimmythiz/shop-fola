import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../lib/Context/DataContext";
import { useAuth } from "../../../lib/Context/AuthContext";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const { categories, tags } = useContext(DataContext);
  const { accessToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        // Ensure initial state for categories and tags is an array
        const productData = res.data.data || res.data;
        setProduct({
          ...productData,
          category_id: productData.category_id || [],
          tag_ids: productData.tag_ids || [],
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  const handleArrayInputChange = (fieldName, index, value) => {
    setProduct((prev) => {
      const newArray = [...(prev[fieldName] || [])];
      newArray[index] = value;
      return { ...prev, [fieldName]: newArray };
    });
  };

  const addArrayItem = (fieldName) => {
    setProduct((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ""],
    }));
  };

  const removeArrayItem = (fieldName, index) => {
    setProduct((prev) => {
      const newArray = [...(prev[fieldName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [fieldName]: newArray };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setProduct((prev) => {
        const arr = [...(prev[name] || [])];
        if (checked) {
          arr.push(value);
        } else {
          const index = arr.indexOf(value);
          if (index > -1) {
            arr.splice(index, 1);
          }
        }
        return { ...prev, [name]: arr };
      });
    } else if (type === "file") {
      setNewImages(Array.from(files));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveExistingImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("name", product.name || "");
      formData.append("description", product.description || "");
      formData.append("price", product.price || 0);
      formData.append("quantity", product.quantity || 0);
      formData.append("status", product.status || "Available");
      formData.append("rating", product.rating || 0);

      // Add arrays - filter out empty values
      const sizes = (product.size || []).filter((s) => s.trim() !== "");
      const colors = (product.color || []).filter((c) => c.trim() !== "");
      
      // ✅ Corrected logic: Ensure only valid IDs are appended
      const category = (product.category_id || []).filter(pc => typeof pc === 'string' && pc.length > 0);
      const tag = (product.tag_ids || []).filter(t => typeof t === 'string' && t.length > 0);

      sizes.forEach((s) => formData.append("size[]", s));
      colors.forEach((c) => formData.append("color[]", c));

      category.forEach((pc) => formData.append("category_id[]", pc));
      tag.forEach((t) => formData.append("tag_ids[]", t));

      // Keep existing images - these are Cloudinary URLs
      (product.images || []).forEach((img) =>
        formData.append("existingImages[]", img)
      );

      // Append new files
      newImages.forEach((file) => formData.append("images", file));

      const res = await axios.put(`${API_URL}/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });

      console.log("Product updated:", res.data);
      alert("Product updated successfully!");
      setNewImages([]);

      const updatedRes = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(updatedRes.data.data || updatedRes.data);
    } catch (err) {
      console.error(
        "Error updating product:",
        err.response?.data || err.message
      );
      alert(
        `Failed to update product: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="edit-product-container">
      <h1>Edit {product.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price || ""}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <fieldset>
          <legend>Categories</legend>
          {categories &&
            categories.map((cat) => (
              <label key={cat._id} style={{ margin: "2rem 2rem 2rem 0" }}>
                <input
                  type="checkbox"
                  name="category_id"
                  value={cat._id}
                  // ✅ Use optional chaining for initial check to prevent errors
                  checked={product.category_id?.includes(cat._id) || false}
                  onChange={handleInputChange}
                />
                {cat.name}
              </label>
            ))}
        </fieldset>

        <fieldset>
          <legend>Tags</legend>
          {tags &&
            tags.map((tag) => (
              <label key={tag._id} style={{ margin: "2rem 2rem 2rem 0" }}>
                <input
                  type="checkbox"
                  name="tag_ids"
                  value={tag._id}
                  // ✅ Use optional chaining for initial check to prevent errors
                  checked={product.tag_ids?.includes(tag._id) || false}
                  onChange={handleInputChange}
                />
                {tag.name}
              </label>
            ))}
        </fieldset>

        <fieldset>
          <legend>Sizes</legend>
          <div className="dynamic-inputs">
            {(product.size || [""]).map((size, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  placeholder="Enter size (e.g., Small, Medium, XL, 32, etc.)"
                  value={size}
                  onChange={(e) =>
                    handleArrayInputChange("size", index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("size", index)}
                  disabled={product.size?.length <= 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("size")}
              className="add-btn"
            >
              + Add Size
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Colors</legend>
          <div className="dynamic-inputs">
            {(product.color || [""]).map((color, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  placeholder="Enter color (e.g., Red, Blue, #FF5733, etc.)"
                  value={color}
                  onChange={(e) =>
                    handleArrayInputChange("color", index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("color", index)}
                  disabled={product.color?.length <= 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("color")}
              className="add-btn"
            >
              + Add Color
            </button>
          </div>
        </fieldset>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity || ""}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={product.status || "Available"}
            onChange={handleInputChange}
          >
            <option value="Available">Available</option>
            <option value="Sold Out">Sold Out</option>
          </select>
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            step={0.1}
            value={product.rating || 0}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Existing Images:</label>
          <div className="existing-images">
            {(product.images || []).map((img, index) => (
              <div key={`${img}-${index}`} className="image-item">
                <img src={img} alt="product" width={80} />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <label>Upload New Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
        />

        {/* Show preview of new images */}
        {newImages.length > 0 && (
          <div className="new-images-preview">
            <p>New images to upload:</p>
            <div className="new-images">
              {newImages.map((file, index) => (
                <div key={index} className="image-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="new upload"
                    width={80}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;