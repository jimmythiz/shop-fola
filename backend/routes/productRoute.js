import express from "express";
import {getAllProducts,getProduct,addProduct,updateProducts,deleteProducts}  from "../controllers/productController.js"
const productRouter = express.Router();

productRouter.get("/",getAllProducts)

productRouter.get("/:id",getProduct)

productRouter.post("/",addProduct)

productRouter.put("/:id",updateProducts)

productRouter.delete("/:id",deleteProducts)


export default productRouter;