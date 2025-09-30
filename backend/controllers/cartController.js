import Cart from "../schema/cartSchema.js";
import Product from "../schema/ProductsSchema.js";

// Helper to recalc totals
const recalcCart = async (cart) => {
  if (cart.items && cart.items.length > 0) {
    for (let item of cart.items) {
      const product = await Product.findById(item.productId).select("price");
      if (product) {
        item.price = product.price;
        item.subtotal = item.quantity * product.price;
      } else {
        item.price = 0;
        item.subtotal = 0;
      }
    }
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
  } else {
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
  }
};

// ✅ Admin: Get all carts
export const getAllCarts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const carts = await Cart.find().skip(skip).limit(limit)
      .populate("userId", "username email")
      .populate("items.productId", "name price");
         const total = await Cart.countDocuments();
    res.status(200).json({ message: "Success",
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      carts,});
  } catch (error) {
    res.status(500).json({ message: "Error fetching carts", error: error.message });
  }
};

// ✅ User: Get their own cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate("items.productId", "name price");

    if (!cart) {
      // Create empty cart for user if not exists
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json({message : "Success",  cart});
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// ✅ User: Add item(s) or update quantities
export const editCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price: product.price, subtotal: product.price * quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        // Update existing item
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].subtotal = cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        // Add new item
        cart.items.push({ productId, quantity, price: product.price, subtotal: product.price * quantity });
      }
    }

    await recalcCart(cart);
    await cart.save();

    res.status(200).json({message : "Success",  cart});
  } catch (error) {
    res.status(500).json({ message: "Error editing cart", error: error.message });
  }
};

// ✅ User: Replace entire cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const newItems = [];
    for (const i of items) {
      const product = await Product.findById(i.productId);
      if (!product) continue;
      newItems.push({
        productId: i.productId,
        quantity: i.quantity,
        price: product.price,
        subtotal: product.price * i.quantity,
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        userId,
        items: newItems,
        totalQuantity: newItems.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: newItems.reduce((acc, item) => acc + item.subtotal, 0),
      },
      { new: true, upsert: true }
    ).populate("items.productId", "name price");

    res.status(200).json({message : "Success",  cart});
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

// ✅ User: Delete their cart
export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error: error.message });
  }
};
