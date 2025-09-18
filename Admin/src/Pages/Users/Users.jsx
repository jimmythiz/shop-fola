import { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import blob from "../../../src/assets/blob.svg";
import { useAuth } from "../../../lib/Context/AuthContext";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { accessToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUsers(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [API_URL, accessToken]);

  return (
    <div className="users-container">
      <h3>Our Customers</h3>

      {/* Search */}
      <div className="users-search">
        <input type="text" placeholder="Search User" />
        <CiSearch />
      </div>

      {/* Table Header */}
      <div className="users-header">
        <p>Customer Name</p>
        <p>Customer Username</p>
        <p>Customer ID</p>
        <p>Action</p>
      </div>

      {/* Users List */}
      <div className="users-grid">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div className="users-grid-list" key={user._id}>
              <div>
                <p>{user.firstname + " " +user.lastname}</p>
              </div>
              <p>{user.username}</p>
              <p>{user._id}</p>
              <button>View Orders</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
