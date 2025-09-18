// routes/dashboard.js
import express from "express";
import Product from "../schema/ProductsSchema.js";
import Order from "../schema/orderSchema.js";
import User from "../schema/UserSchema.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({ stock: { $gt: 0 } });
    const outOfStock = await Product.countDocuments({ stock: 0 });

    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: "Processing" });
    const completedOrders = await Order.countDocuments({ orderStatus: "Delivered" });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const monthlyRevenue = await Order.aggregate([
      { $match: { 
          paymentStatus: "Completed",
          createdAt: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) 
          }
        } 
      },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalCustomers = await User.countDocuments();

    res.json({
      totalProducts,
      availableProducts,
      outOfStock,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      totalCustomers,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
});

export default router;
