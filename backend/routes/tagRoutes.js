import express from "express";
import {
  getAllTags,
  getTag,
  addTag,
  updateTag,
  deleteTag
} from "../controllers/tagController.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/:id", getTag);
tagRouter.post("/", addTag);
tagRouter.put("/:id", updateTag);
tagRouter.delete("/:id", deleteTag);

export default tagRouter;
