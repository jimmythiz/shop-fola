import "./Orders.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../lib/Context/AuthContext"; // if you’re using auth context

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  const { accessToken } = useAuth(); // ⬅️ get token for auth
  const API_URL = import.meta.env.VITE_API_URL;

  // Status → Color mapping
  const statusColors = {
    Processing: "#f0ad4e",
    "Ready For Pickup": "#5bc0de",
    "Shipped Out": "#0275d8",
    Delivered: "#5cb85c",
    Cancelled: "#d9534f",
    "Not Paid": "#6c757d",
  };

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/admin/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        setOrders(res.data.data); // assuming backend returns array of orders
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (accessToken) {
      fetchOrders();
    }
  }, [accessToken, API_URL]);

  // Filter + Search logic
  const filteredOrders = orders.filter((order) => {
    const matchStatus =
      !filterStatus || order.orderStatus === filterStatus;
    const matchSearch =
      !search ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="orders-container">
      <h3>Order Lists</h3>

      {/* Search */}
      <div className="orders-search">
        <input
          type="text"
          placeholder="Search By Tracking Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch />
      </div>

      {/* Filter */}
      <label>
        Filter By Status :
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Not Paid">Not Paid</option>
          <option value="Processing">Processing</option>
          <option value="Ready For Pickup">Ready For Pickup</option>
          <option value="Shipped Out">Shipped Out</option>
          <option value="Delivered">Delivered</option>
        </select>
      </label>

      {/* Header */}
      <div className="orders-header">
        <p>Tracking Number</p>
        <p>Customer</p>
        <p>Order Details</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      {/* Orders List */}
      <div className="orders-grid">
        {filteredOrders.map((order, index) => {
          const color = statusColors[order.orderStatus] || "#999";
          return (
            <div key={index} className="orders-grid-list">
              <p>{order.orderNumber}</p>
              <p>{order.user?.firstname + " "+ order.user?.lastname}</p>

              <ul>
                {order.items.slice(0, 2).map((item, i) => (
                  <li key={i}>
                    {item.product?.name} × {item.quantity}
                  </li>
                ))}
                {order.items.length > 2 && (
                  <span>
                    ...and {order.items.length - 2} more
                  </span>
                )}
              </ul>

              <div className="status">
                <div
                  className="status-dot"
                  style={{ backgroundColor: color }}
                ></div>
                <p>{order.orderStatus}</p>
              </div>

              <button>View</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
