import express from "express";
import { checkout } from "../controllers/checkout.js";
import { getAllOrders, getUserOrders } from "../controllers/orders.js";

const orderRoute = express.Router();

// Cart → Order
orderRoute.post("/checkout/:userId", checkout);

// Admin: see all orders
orderRoute.get("/orders", getAllOrders);

// User: see their orders
orderRoute.get("/orders/:userId", getUserOrders);

export default orderRoute;
