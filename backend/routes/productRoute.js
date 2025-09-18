import express from "express";
import {getAllProducts,getProduct,createProduct,updateProducts,deleteProducts}  from "../controllers/productController.js"
import { isAdmin,isAuthenticated } from "../middleware/authMiddleware.js";
import { uploadProductImages } from "../middleware/upload.js";
const productRouter = express.Router();

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getProduct)

productRouter.post("/",uploadProductImages,isAuthenticated, isAdmin, createProduct)

productRouter.put("/:id", uploadProductImages,isAuthenticated, isAdmin, updateProducts)

productRouter.delete("/:id",isAuthenticated,isAdmin, deleteProducts)


export default productRouter;