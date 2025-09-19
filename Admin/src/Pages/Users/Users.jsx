import { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../../lib/Context/AuthContext";
import "./Users.css";
import { Link } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  // Debounced fetch
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${API_URL}/api/users?search=${encodeURIComponent(search)}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setUsers(res.data.data || res.data || []);
        } catch (err) {
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 600); // 600ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [search, API_URL, accessToken]);

  // ✅ Use local filter on top of server response (optional double filter)
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user._id?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="users-container">
      <h3>Our Customers</h3>

      {/* Search */}
      <div className="users-search">
        <input
          type="text"
          placeholder="Search User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch />
      </div>

      {/* Table Header */}
      <div className="users-header">
        <p>Customer Name</p>
        <p>Customer Username</p>
        <p>Action</p>
      </div>

      {/* Users List */}
      <div className="users-grid">
        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div className="users-grid-list" key={user._id}>
              <div>
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
              <p>{user.username}</p>
              <Link to={`/users/${user._id}`}>User Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
