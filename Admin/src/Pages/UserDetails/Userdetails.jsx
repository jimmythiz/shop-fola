import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../lib/Context/AuthContext";
import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, API_URL, accessToken]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="user-details-container">
      <Link to="/admin/users" className="back-link">← Back to Users</Link>

      <div className="user-card">
        <img src={user.profilePic} alt="Profile" className="user-avatar" />
        <h2>{user.firstname} {user.lastname}</h2>
        <p className="username">@{user.username}</p>
        <p className="role">{user.role}</p>
      </div>

      <div className="user-info">
        <h3>Contact Info</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "✅ Yes" : "❌ No"}</p>

        <h3>Address</h3>
        {user.address ? (
          <p>
            {user.address.street}, {user.address.city}, {user.address.state}, {user.address.country}, {user.address.postalCode}
          </p>
        ) : (
          <p>No address provided</p>
        )}

        {user.bio && (
          <>
            <h3>Bio</h3>
            <p>{user.bio}</p>
          </>
        )}

        <h3>Account Metadata</h3>
        <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserDetails;
