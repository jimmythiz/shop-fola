import { useState } from "react";
import "./AddProducts.css";
import axios from "axios";

const AddProducts = () => {
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
  const categories = ["Phones", "Computers", "SmartWatches", "Cameras", "Headphones", "Gaming", "Clothing", "Electronics", "Household", "Shoes", "Beauty", "Perfume", "Women", "Men", "Children", "Baby", "Groceries", "Others"];
            

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const array = [...prev[name]];
        if (checked) array.push(value);
        else array.splice(array.indexOf(value), 1);
        return { ...prev, [name]: array };
      });
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.price) {
        console.error("Please fill in all required fields.");
        return;
    }
const data = new FormData();
 const price = formData.price ? parseFloat(formData.price) : 0;
  const quantity = formData.quantity ? parseInt(formData.quantity) : 0;
  const rating = formData.rating ? parseFloat(formData.rating) : 1;
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", price);
  data.append("color", formData.color);
  data.append("quantity", quantity);
  data.append("status", formData.status);
  data.append("rating", rating);

  formData.size.forEach((s) => data.append("size", s)); // no []
  formData.tag_ids.forEach((t) => data.append("tag_ids", t));
  formData.category_id.forEach((c) => data.append("category_id", c));

  // Images if any
  formData.images.forEach((file) => data.append("images", file));

    console.log("Form Data Submitted:", formData);
    for (let pair of data.entries()) {
  console.log(pair[0], pair[1]);
}

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Product Created:", res.data);
  } catch (err) {
    console.error("Error:", err);
  }
};
  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      <div className="add-product-grid">
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            required
            maxLength={50}
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />

          {/* Description */}
          <textarea
            placeholder="Full Product Description"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea-field"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price (₦)"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
          />

          {/* Category */}
          <fieldset className="checkbox-fieldset">
            <legend>Category</legend>
            {categories.map((cat) => (
              <label key={cat} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="category_id"
                    value={cat}
                    onChange={handleChange}
                    className="checkbox-input"
                  /> {cat}
              </label>
                ))}
          </fieldset>

          {/* Tags */}
          <fieldset className="checkbox-fieldset">
            <legend>Tag</legend>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="Best Seller"
                onChange={handleChange}
              />{" "}
              Best Seller
            </label>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="New"
                onChange={handleChange}
              />{" "}
              New
            </label>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="Trending"   
                onChange={handleChange}
              />{" "}
              Trending
            </label>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="Male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="Female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="checkbox"
                name="tag_ids"
                value="Children"
                onChange={handleChange}
              />{" "}
              Children
            </label>
          </fieldset>

          {/* Sizes */}
          <fieldset className="checkbox-fieldset">
            <legend>Available Sizes</legend>
            <label>
              <input
                type="checkbox"
                name="size"
                value="Small"
                onChange={handleChange}
              />{" "}
              Small
            </label>
            <label>
              <input
                type="checkbox"
                name="size"
                value="Medium"
                onChange={handleChange}
              />{" "}
              Medium
            </label>
            <label>
              <input
                type="checkbox"
                name="size"
                value="Large"
                onChange={handleChange}
              />{" "}
              Large
            </label>
            <label>
              <input
                type="checkbox"
                name="size"
                value="Extra Large"
                onChange={handleChange}
              />{" "}
              Extra Large
            </label>
          </fieldset>

          {/* Color */}
          <input
            type="text"
            placeholder="Available Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="input-field"
          />

          {/* Quantity */}
          <input
            type="number"
            placeholder="Available Quantity"
            min="0"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
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
            placeholder="Ratings (1-5)"
            min={1}
            max={5}
            name="rating"
            value={formData.rating}
            onChange={handleChange}
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

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
