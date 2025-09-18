import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../lib/Context/AuthContext"; // ✅ import auth context
import "./Tags.css";

const AddTag = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const { accessToken } = useAuth(); // ✅ get token
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch existing tags (no token needed if it's public)
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/tags`);
        setTags(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, [API_URL]);

  // Submit new tag
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/tags`,
        { name },
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // ✅ send token
        }
      );
      setTags((prev) => [...prev, res.data]); // assuming backend returns created tag
      setName("");
    } catch (err) {
      console.error("Error adding tag:", err);
    }
  };

  // Delete tag
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tags/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // ✅ send token
      });
      setTags((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting tag:", err);
    }
  };

  return (
    <div className="add-item-container">
      <h3>Add Tag</h3>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          type="text"
          placeholder="Tag Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>

      {tags.length === 0 ? (
        <p>No tags available</p>
      ) : (
        <ul className="item-list">
          {tags.map((tag) => (
            <li key={tag._id}>
              {tag.name}
              <button
                onClick={() => handleDelete(tag._id)}
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

export default AddTag;
