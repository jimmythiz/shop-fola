import Product from "../schema/ProductsSchema.js"
import slugify from "slugify"
import cloudinary from "../config/cloudinary.js";

// Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category_id", "name slug")  // only fetch certain fields
      .populate("tag_ids", "name slug");

    res.status(200).json({
      status: "Success",
      data: products
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      data: error.message
    });
  }
};


// Get single Products
export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id)
      .populate("category_id", "name slug")
      .populate("tag_ids", "name slug");

    if (!product) {
      return res.status(404).json({
        status: "Error",
        data: "Product Not Found"
      });
    }

    res.status(200).json({
      status: "Success",
      data: product
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      data: error.message
    });
  }
};


// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category_id,
      tag_ids,
      size,
      color,
      quantity,
      status,
      rating,
      
    } = req.body;
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );

      const uploadResults = await Promise.all(uploadPromises);
      images = uploadResults.map((result) => result.secure_url); // save URLs only
    }

    const product = new Product({
      name,
      slug : slugify(name),
      description,
      price,
      category_id: Array.isArray(category_id) ? category_id : [category_id],
      tag_ids: Array.isArray(tag_ids) ? tag_ids : [tag_ids],
      size: Array.isArray(size) ? size : [size],
      color,
      quantity,
      status,
      rating,
      images, // Cloudinary URLs
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Update Product
export const updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    let updateData = {...req.body};
    if (updateData.name){
      updateData.slug = slugify(updateData.name)
    }

    // If new images uploaded, replace old ones
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};
// Delete Products
export const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "Error",
        data: "Product Not Found"
      });
    }

    res.status(200).json({
      status: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      data: error.message
    });
  }
};
