import express from "express";
import upload from "../middleware/upload.js";
import {getAllProducts,getProduct,createProduct,updateProducts,deleteProducts}  from "../controllers/productController.js"
import { isAdmin,isAuthenticated } from "../middleware/authMiddleware.js";
const productRouter = express.Router();

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getProduct)

productRouter.post("/",upload.array("images", 5),isAuthenticated, isAdmin, createProduct)

productRouter.put("/:id",upload.array("images", 5),isAuthenticated, isAdmin, updateProducts)

productRouter.delete("/:id",isAuthenticated,isAdmin, deleteProducts)


export default productRouter;