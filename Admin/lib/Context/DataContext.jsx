// lib/Context/DataContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchData = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        axios.get(`${API_URL}/api/categories`),
        axios.get(`${API_URL}/api/tags`),
      ]);

      // adjust depending on your API shape
      setCategories(Array.isArray(catRes.data) ? catRes.data : catRes.data.data || []);
      setTags(Array.isArray(tagRes.data) ? tagRes.data : tagRes.data.data || []);
    } catch (error) {
      console.error("Error fetching categories/tags:", error);
      setCategories([]);
      setTags([]);
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
