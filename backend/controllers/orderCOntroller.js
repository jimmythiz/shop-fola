import Order from "../models/order.js";

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// User: get their own orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};
