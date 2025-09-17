import express from "express";
import {
  getAllCarts,
  getCart,
  editCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// ADMIN: Get all carts
cartRouter.get("/all-carts", getAllCarts);

// USER ROUTES: use JWT, no userId param
cartRouter.get("/my-cart", isAuthenticated, getCart);
cartRouter.post("/my-cart", isAuthenticated, editCart);
cartRouter.put("/my-cart", isAuthenticated, updateCart);
cartRouter.delete("/my-cart", isAuthenticated, deleteCart);

export default cartRouter;
