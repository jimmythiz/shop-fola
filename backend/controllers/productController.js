import Product from "../schema/ProductsSchema.js"
import slugify from "slugify"

// Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categories", "name slug")  // only fetch certain fields
      .populate("tags", "name slug");

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
      .populate("categories", "name slug")
      .populate("tags", "name slug");

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

    // Cloudinary gives you the URL inside req.files
    const images = req.files ? req.files.map(file => file.path) : [];

    const product = new Product({
      name,
      description,
      price,
      categories: Array.isArray(category_id) ? category_id : [category_id],
      tags: Array.isArray(tag_ids) ? tag_ids : [tag_ids],
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
    const updateData = req.body;

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
