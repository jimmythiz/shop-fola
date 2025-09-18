import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/Context/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/admin/login`,
      { email, password },
      { withCredentials: true }
    );

    login(data.accessToken, data.user); // save to context

    if (data.user.role !== "Admin") {
      setError("Admins only.");
      return;
    }

    navigate("/");
    setLoading(false)
  } catch (err) {
    setError(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
