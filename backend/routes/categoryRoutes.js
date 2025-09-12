import express from "express";
import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", addCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
