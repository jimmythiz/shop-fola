import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";
import { 
  createOrder, 
  getAllOrders, 
  getUserOrders, 
  updateOrderStatus, 
  getOrderById  
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// -------------------- Admin routes --------------------
orderRouter.get("/admin/orders", isAuthenticated, isAdmin, getAllOrders);
orderRouter.put("/admin/orders/:orderId", isAuthenticated, isAdmin, updateOrderStatus);
orderRouter.get("/admin/orders/:orderId", isAuthenticated, isAdmin, getOrderById);

// -------------------- User routes --------------------
orderRouter.post("/", isAuthenticated, createOrder);         // Create order
orderRouter.get("/", isAuthenticated, getUserOrders);        // Get your orders
orderRouter.get("/:orderId", isAuthenticated, getOrderById); // Get one of your orders

export default orderRouter;
