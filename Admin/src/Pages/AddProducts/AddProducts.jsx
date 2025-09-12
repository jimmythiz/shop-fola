import {  useState,useContext } from "react";
import { DataContext } from "../../../lib/Context/DataContext";
import "./AddProducts.css";
import axios from "axios";

const AddProducts = () => {
  const { categories, tags, loading } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: [],
    tag_ids: [],
    size: [],
    color: "",
    quantity: "",
    status: "Available",
    rating: "",
    images: [],
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const arr = [...prev[name]];
        if (checked) arr.push(value);
        else arr.splice(arr.indexOf(value), 1);
        return { ...prev, [name]: arr };
      });
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", parseFloat(formData.price) || 0);
    data.append("color", formData.color);
    data.append("quantity", parseInt(formData.quantity) || 0);
    data.append("status", formData.status);
    data.append("rating", parseFloat(formData.rating) || 1);

    formData.size.forEach((s) => data.append("size", s));
    formData.tag_ids.forEach((t) => data.append("tag_ids", t));
    formData.category_id.forEach((c) => data.append("category_id", c));
    formData.images.forEach((file) => data.append("images", file));

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product Created:", res.data);
      // Reset form if needed
      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: [],
        tag_ids: [],
        size: [],
        color: "",
        quantity: "",
        status: "Available",
        rating: "",
        images: [],
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      <div className="add-product-grid">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            maxLength={50}
            className="input-field"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Full Product Description"
            rows={4}
            className="textarea-field"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (₦)"
            min={0}
            className="input-field"
          />

          {/* Categories */}
          <fieldset className="checkbox-fieldset">
            <legend>Category</legend>
            {categories.map((cat) => (
              <label key={cat._id} className="checkbox-label">
                <input
                  type="checkbox"
                  name="category_id"
                  value={cat._id}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                {cat.name}
              </label>
            ))}
          </fieldset>

          {/* Tags */}
          <fieldset className="checkbox-fieldset">
            <legend>Tags</legend>
            {tags.map((tag) => (
              <label key={tag._id} className="checkbox-label">
                <input
                  type="checkbox"
                  name="tag_ids"
                  value={tag._id}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                {tag.name}
              </label>
            ))}
          </fieldset>

          {/* Sizes */}
          <fieldset className="checkbox-fieldset">
            <legend>Available Sizes</legend>
            {["Small", "Medium", "Large", "Extra Large"].map((sz) => (
              <label key={sz}>
                <input
                  type="checkbox"
                  name="size"
                  value={sz}
                  onChange={handleChange}
                />
                {sz}
              </label>
            ))}
          </fieldset>

          {/* Color */}
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Available Color"
            className="input-field"
          />

          {/* Quantity */}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Available Quantity"
            min={0}
            className="input-field"
          />

          {/* Status */}
          <label>Availability</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select-field"
          >
            <option value="Available">Available</option>
            <option value="Sold Out">Sold Out</option>
          </select>

          {/* Rating */}
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Ratings (1-5)"
            min={1}
            max={5}
            className="input-field"
          />

          {/* Images */}
          <fieldset className="file-fieldset">
            <legend>Upload Product Images</legend>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="file-input"
            />
          </fieldset>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
