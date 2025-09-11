import ProductSchema from "../schema/ProductsSchema.js"

// Get all Products
export const getAllProducts = async (req,res)=>{
    try{
        const products = await ProductSchema.find()
        res.status(200).json({
            "status": "Success",
            data : products
        })
    }catch(error){
        res.status(400).json({
            "status": "Error",
            data : error.message
        })
    }
}

// Get single Products
export const getProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        const product = await ProductSchema.findById(id)
        if (!product){
            return res.status(404).json({"status" : "Error", data : "Product Not With that Does Not Exist"})
        }
        res.status(200).json({
             "status": "Success",
            data : product
        })
    }catch(error){
        res.status(400).json({
            "status": "Error",
            data : error.message
        })
    }
}

// Add Product
export const addProduct = async (req,res)=>{
    try{
        const newProduct = new ProductSchema({
            name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        tag_ids: req.body.tag_ids,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity,
        status: req.body.status,
        rating: req.body.rating,
        images: req.body.images,
        })
        await newProduct.save();
        res.status(201).json({
            "status": "Successfully added new Product",
            data : newProduct
        })
        
    }catch(error){
        res.status(400).json({
            "status": "Error",
            data : error.message
        })
    }
}

// Update Product
export const updateProducts = async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body
        const product = await ProductSchema.findByIdAndUpdate(id,updatedData, {new:true})
        if (!product){
            return res.status(404).json({"status" : "Error", data : "Product Not With that Does Not Exist"})
        }
        res.status(200).json({
             "status": "Product Updated Successfully",
            data : product
        })
    }catch(error){
        res.status(400).json({
            "status": "Error",
            data : error
        })
    }
}

// Delete Products
export const deleteProducts = async (req,res)=>{
    try{
        const id = req.params.id;
        const product = await ProductSchema.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({"status" : "Error", data : "Product Not With that Does Not Exist"})
        }
        res.status(200).json({
             "status": "Product Deleted Successfully",
        })
    }catch(error){
        res.status(400).json({
            "status": "Error",
            data : error
        })
    }
}
