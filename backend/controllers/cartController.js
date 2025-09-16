import Cart from "../models/cart.js"; 
import User from "../models/user.js";

// ✅ Get all carts (admin only)
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("user", "username email");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching carts", error: error.message });
  }
};

// ✅ Get a single user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// ✅ Add item(s) to cart (or edit quantities)
export const editCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create one
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      // If cart exists, update or add product
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // update quantity
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error editing cart", error: error.message });
  }
};

// ✅ Update cart (replace items completely)
export const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body; // full items array

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true, upsert: true } // create if not exists
    ).populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

// ✅ Delete cart (clear it completely)
export const deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error: error.message });
  }
};
