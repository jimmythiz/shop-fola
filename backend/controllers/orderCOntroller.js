import Order from "../schema/orderSchema.js";
import Cart from "../schema/cartSchema.js";

// Helper to validate statuses
const validOrderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
const validPaymentStatuses = ["Pending", "Completed", "Failed", "Refunded"];

// ---------------------- CREATE ORDER ----------------------
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const { shippingAddress, paymentMethod, notes, paymentDetails } = req.body;
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        message: "Shipping address and payment method are required",
      });
    }

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      notes,
      paymentDetails,
    });

    await newOrder.save();

    // Clear cart
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// ---------------------- GET ALL ORDERS (ADMIN ONLY) ----------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({message : "All Orders" ,data : orders});
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// ---------------------- GET USER ORDERS ----------------------
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your orders", error: error.message });
  }
};

// ---------------------- GET ORDER BY ID ----------------------
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("user", "username email")
      .populate("items.product", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Restrict access: Users can only see their own orders
    if (req.user.role !== "Admin" && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    res.status(200).json({message : "Your Order", data : order});
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// ---------------------- UPDATE ORDER STATUS (ADMIN ONLY) ----------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    // Validate input
    if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }
    if (!orderStatus && !paymentStatus) {
      return res.status(400).json({ message: "Provide orderStatus or paymentStatus to update" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus, paymentStatus },
      { new: true }
    )
      .populate("user", "username email")
      .populate("items.product", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};
