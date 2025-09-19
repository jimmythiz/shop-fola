import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../lib/Context/AuthContext";
import "./ViewOrder.css";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/admin/orders/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        setOrder(res.data.data);
        setStatus(res.data.data.orderStatus);
        setPaymentStatus(res.data.data.paymentStatus);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id && accessToken) fetchOrder();
  }, [id, accessToken, API_URL]);

  // Save update
  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axios.put(
        `${API_URL}/api/orders/admin/orders/${id}`,
        { orderStatus: status, paymentStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      toast.success("Order updated successfully ✅");
      navigate("/orders"); 
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order ❌");
    } finally {
      setSaving(false);
    }
  };
  console.log(order)

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="order-details">
      <button onClick={() => navigate(-1)} className="go-back">← Back</button>

      <h2>Order {order.orderNumber}</h2>

      {/* Status Update */}
      <section className="order-section">
        <h3>Status</h3>
        <label>
          Order Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </label>

        <label>
          Payment Status:
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </label>

        <button onClick={handleUpdate} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </section>

      {/* Customer */}
      <section className="order-section">
        <h3>Customer</h3>
        <p>{order.user?.firstname} {order.user?.lastname}</p>
        <p>Email: {order.user?.email}</p>
      </section>

      {/* Shipping */}
      <section className="order-section">
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress.street}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.postalCode}
        </p>
        <p>{order.shippingAddress.country}</p>
      </section>

      {/* Items */}
      <section className="order-section">
        <h3>Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>{item.product?.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Totals */}
      <section className="order-section totals">
        <h3>Summary</h3>
        <p><strong>Total Quantity:</strong> {order.totalQuantity}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
      </section>

      {/* Notes */}
      {order.notes && (
        <section className="order-section">
          <h3>Notes</h3>
          <p>{order.notes}</p>
        </section>
      )}
    </div>
  );
};

export default OrderDetails;
