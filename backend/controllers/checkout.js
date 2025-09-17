import Cart from "../schema/cartSchema.js";
import Order from "../schema/orderSchema.js";

export const checkout = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });

    // 3. Create a new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalPrice,
      status: "Pending" // you can later update to "Shipped", "Delivered", etc.
    });

    await newOrder.save();

    // 4. Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: "Error during checkout", error: error.message });
  }
};
