import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../lib/Context/AuthContext"; // ✅ import context
import "./Categories.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const { accessToken } = useAuth(); // ✅ get token
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [API_URL]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/categories`,
        { name },
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // ✅ secure
        }
      );
      setCategories((prev) => [...prev, res.data.data]); // add new category
      setName("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // ✅ secure
      });
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="add-item-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <ul className="item-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              {cat.name}
              <button
                onClick={() => handleDelete(cat._id)}
                className="delete-btn"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddCategory;
