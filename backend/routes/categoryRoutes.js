import express from "express";
import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/",isAuthenticated, isAdmin, addCategory);
categoryRouter.put("/:id",isAuthenticated, isAdmin, updateCategory);
categoryRouter.delete("/:id",isAuthenticated, isAdmin, deleteCategory);

export default categoryRouter;
