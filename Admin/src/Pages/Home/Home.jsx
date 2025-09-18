import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/dashboard/stats`, {
          withCredentials: true, // send cookies if using JWT/refresh tokens
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        });
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err.response?.data || err.message);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className='dashboard-container'>
      <h3>Dashboard</h3>
      <div className='dashboard-main'>
        <div className="dashboard-card"><p className='card-header'>Total Products</p><p>{stats.totalProducts}</p></div>
        <div className="dashboard-card"><p className='card-header'>Available Products</p><p>{stats.availableProducts}</p></div>
        <div className="dashboard-card"><p className='card-header'>Out Of Stock</p><p>{stats.outOfStock}</p></div>
        <div className="dashboard-card"><p className='card-header'>Total Orders</p><p>{stats.totalOrders}</p></div>
        <div className="dashboard-card"><p className='card-header'>Pending Orders</p><p>{stats.pendingOrders}</p></div>
        <div className="dashboard-card"><p className='card-header'>Completed Orders</p><p>{stats.completedOrders}</p></div>
        <div className="dashboard-card"><p className='card-header'>Total Revenue</p><p>₦{stats.totalRevenue.toLocaleString()}</p></div>
        <div className="dashboard-card"><p className='card-header'>Revenue (This Month)</p><p>₦{stats.monthlyRevenue.toLocaleString()}</p></div>
        <div className="dashboard-card"><p className='card-header'>Registered Customers</p><p>{stats.totalCustomers}</p></div>
      </div>
    </div>
  );
};

export default Home;
