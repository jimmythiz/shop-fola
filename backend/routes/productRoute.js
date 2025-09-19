import express from "express";
import {getAllProducts,getProduct,createProduct,updateProducts,deleteProducts}  from "../controllers/productController.js"
import { isAdmin,isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import {uploadMultiple} from "../config/cloudinary.js";

const productRouter = express.Router();

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getProduct)

productRouter.post("/",isAuthenticated, isAdmin,upload.array("images", 5),uploadMultiple, createProduct)

productRouter.put("/:id",isAuthenticated, isAdmin,upload.array("images", 5),uploadMultiple, updateProducts)

productRouter.delete("/:id",isAuthenticated,isAdmin, deleteProducts)


export default productRouter;