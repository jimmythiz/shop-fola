import { useState, useEffect } from "react";
import axios from "axios";
import "./Tags.css"; // shared styling

const AddTag = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);

  // Fetch existing tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/tags");
        setTags(res.data.data || res.data || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, []);

  // Submit new tag
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/tags", { name });
      setTags(Array.isArray(res.data.data) ? res.data.data : []);
      setName("");
    } catch (err) {
      console.error("Error adding tag:", err);
    }
  };

  // Delete tag
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tags/${id}`);
      setTags(tags.filter((t) => t._id !== id));
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
        <button type="submit" className="submit-btn">Add</button>
      </form>

      {tags.length === 0 ? (
        <p>No tags available</p>
      ) : (
        <ul className="item-list">
          {tags.map((tag) => (
            <li key={tag._id}>
              {tag.name}
              <button onClick={() => handleDelete(tag._id)} className="delete-btn">x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddTag;
