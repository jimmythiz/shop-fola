import express from "express";
import {
  getAllCarts,
  getCart,
  editCart,
  updateCart,
  deleteCart
} from "../controllers/cartController.js";

const cartRouter = express.Router();


// ✅ Admin: Get all carts
router.get("/", getAllCarts);

// ✅ User: Get a single cart
router.get("/:userId", getCart);

// ✅ User: Add item(s) or update quantities
router.post("/:userId", editCart);

// ✅ User: Replace cart items completely
router.put("/:userId", updateCart);

// ✅ User: Delete cart
router.delete("/:userId", deleteCart);

export default cartRouter;
