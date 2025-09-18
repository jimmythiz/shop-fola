import { useState, useEffect } from "react";
import axios from "axios";
import "./AddProducts.css";
import { useContext } from "react";
import { DataContext } from "../../../lib/Context/DataContext";
import { useAuth } from "../../../lib/Context/AuthContext";
import { useNavigate } from "react-router";

const AddProducts = () => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL;

  const { categories, tags } = useContext(DataContext);
  const { accessToken, loading } = useAuth();

if (loading) return <p>Loading...</p>; // wait for refresh token
if (!accessToken) return <p>Please log in to add products</p>;


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: [],
    tag_ids: [],
    size: [],
    color: [], // ✅ Keep as a string for single color
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
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...Array.from(files)] })); // ✅ Corrected: Spread `files` into an array
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleArrayInputChange = (fieldName, index, value) => {
  setFormData((prev) => {
    const newArray = [...(prev[fieldName] || [])];
    newArray[index] = value;
    return { ...prev, [fieldName]: newArray };
  });
};
const addArrayItem = (fieldName) => {
  setFormData((prev) => ({
    ...prev,
    [fieldName]: [...(prev[fieldName] || []), ""],
  }));
};

const removeArrayItem = (fieldName, index) => {
  setFormData((prev) => {
    const newArray = [...(prev[fieldName] || [])];
    newArray.splice(index, 1);
    return { ...prev, [fieldName]: newArray };
  });
};
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", parseFloat(formData.price) || 0);
    data.append("quantity", parseInt(formData.quantity) || 0);
    data.append("status", formData.status);
    data.append("rating", parseFloat(formData.rating) || 1);

    formData.color.forEach((c) => data.append("color[]", c));
    // ✅ CORRECTED: Use `[]` notation for arrays
    formData.size.forEach((s) => data.append("size[]", s));
    formData.tag_ids.forEach((t) => data.append("tag_ids[]", t));
    formData.category_id.forEach((c) => data.append("category_id[]", c));
    formData.images.forEach((file) => data.append("images", file));

for (let [key, value] of data.entries()) {
  console.log(key, value);
}
const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${accessToken}`,
};


    try {
      const res = await axios.post(`${API_URL}/api/products`, data, {headers });
      console.log("Product Created:", res.data);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: [],
        tag_ids: [],
        size: [],
        color: [],
        quantity: "",
        status: "Available",
        rating: "",
        images: [],

      });
navigate("/products")
    } catch (err) {
      console.error("Error:", err.response?.data || err.message); // ✅ Better error logging
    }
  };


  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      <div className="add-product-grid">
        <form onSubmit={handleSubmit}>
          {/* ... (rest of the form remains the same) ... */}
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


        {/* ✅ Dynamic Colors Fieldset */}
<fieldset className="dynamic-inputs">
  <legend>Colors</legend>
  {(formData.color || [""]).map((color, index) => (
    <div key={index} className="input-group">
      <input
        type="text"
        placeholder="Enter color (e.g., Red, Blue)"
        value={color}
        name="color"
        onChange={(e) => handleArrayInputChange("color", index, e.target.value)}
      />
      {/* Button to remove a color input field */}
      <button
        type="button"
        onClick={() => removeArrayItem("color", index)}
        disabled={formData.color.length <= 1}
        className="remove-btn"
      >
        Remove
      </button>
    </div>
  ))}
  {/* Button to add a new color input field */}
  <button
    type="button"
    onClick={() => addArrayItem("color")}
    className="add-btn"
  >
    + Add Color
  </button>
</fieldset>

{/* ✅ Update Sizes fieldset to use the new dynamic logic */}
<fieldset className="dynamic-inputs">
  <legend>Available Sizes</legend>
  {(formData.size || [""]).map((size, index) => (
    <div key={index} className="input-group">
      <input
        type="text"
        placeholder="Enter size (e.g., Small, 32)"
        value={size}
        onChange={(e) => handleArrayInputChange("size", index, e.target.value)}
        name="size"
      />
      <button
        type="button"
        onClick={() => removeArrayItem("size", index)}
        disabled={formData.size.length <= 1}
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
</fieldset>

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

          <button type="submit" disabled={loading || !accessToken} className="submit-btn">
  {loading ? "Loading..." : "Add Product"}
</button>

        </form>
      </div>
    </div>
  );
};

export default AddProducts;