import express from "express";
import upload from "../middleware/upload.js";
import {getAllProducts,getProduct,createProduct,updateProducts,deleteProducts}  from "../controllers/productController.js"
const productRouter = express.Router();

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getProduct)

productRouter.post("/",upload.array("images", 5),createProduct)

productRouter.put("/:id",upload.array("images", 5),updateProducts)

productRouter.delete("/:id",deleteProducts)


export default productRouter;