import { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css"; // shared styling

const AddCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/categories", { name });
      setCategories([...categories, res.data.data]); // add new one
      setName(""); // reset input
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Optional delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
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
        <button type="submit" className="submit-btn">Add</button>
      </form>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <ul className="item-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              {cat.name}
              <button onClick={() => handleDelete(cat._id)} className="delete-btn">x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddCategory;
