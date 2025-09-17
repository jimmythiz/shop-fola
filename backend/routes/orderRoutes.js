import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus, getOrderById  } from "../controllers/orderController.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/", isAuthenticated, createOrder); //create an order
orderRouter.get("/", isAuthenticated, getUserOrders); // Get all your orders
orderRouter.get("/:orderId", isAuthenticated, getOrderById); // Get one of your orders

// Admin routes
orderRouter.get("/admin/orders", isAuthenticated, isAdmin, getAllOrders); // Admin can see all orders
orderRouter.put("/admin/orders/:orderId", isAuthenticated, isAdmin, updateOrderStatus); // Admin can update one order ststus
orderRouter.get("/admin/orders/:orderId", isAuthenticated,isAdmin ,getOrderById); // Admin can get one of many orders

export default orderRouter;
