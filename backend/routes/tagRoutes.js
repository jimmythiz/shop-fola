import express from "express";
import {
  getAllTags,
  getTag,
  addTag,
  updateTag,
  deleteTag
} from "../controllers/tagController.js";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/:id", getTag);
tagRouter.post("/",isAuthenticated, isAdmin, addTag);
tagRouter.put("/:id",isAuthenticated, isAdmin, updateTag);
tagRouter.delete("/:id",isAuthenticated, isAdmin, deleteTag);

export default tagRouter;
