import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const DataContext = createContext();

// Provider Component
export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categories"),
          axios.get("http://127.0.0.1:8000/api/tags"),
        ]);

        setCategories(Array.isArray(catRes.data.data) ? catRes.data.data : []);
        setTags(Array.isArray(tagRes.data.data) ? tagRes.data.data : []);
      } catch (err) {
        console.error("Error fetching categories/tags:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories, tags, loading }}>
      {children}
    </DataContext.Provider>
  );
};
