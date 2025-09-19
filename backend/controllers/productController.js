import Product from "../schema/ProductsSchema.js"
import slugify from "slugify"
import mongoose from "mongoose";


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

    // ✅ Use images already uploaded by middleware
    const images = req.images || [];

    const product = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      category_id: Array.isArray(category_id) ? category_id : [category_id],
      tag_ids: Array.isArray(tag_ids) ? tag_ids : [tag_ids],
      size: Array.isArray(size) ? size : [size],
      color,
      quantity,
      status,
      rating,
      images,
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
    const { id } = req.params;
    const { body } = req;

    const parseArray = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === "string") {
        return field.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [field];
    };

    const parseObjectIdArray = (field) => {
      return parseArray(field).filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
    };

    // Build updateData
    const updateData = {
      ...body,
      size: parseArray(body["size[]"] || body.size),
      color: parseArray(body["color[]"] || body.color),
      category_id: parseObjectIdArray(body["category_id[]"] || body.category_id),
      tag_ids: parseObjectIdArray(body["tag_ids[]"] || body.tag_ids),
      price: body.price ? parseFloat(body.price) : undefined,
      quantity: body.quantity ? parseInt(body.quantity) : undefined,
      rating: body.rating ? parseFloat(body.rating) : undefined,
    };

    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true });
    }

    // Find product
    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Handle images
    const existingImages = parseArray(
      body["existingImages[]"] || body.existingImages
    );
    const newImageUrls = req.images || [];
    updateData.images = [...existingImages, ...newImageUrls];

    // Cleanup
    ["size", "color", "category_id", "tag_ids"].forEach((field) => {
      if (Array.isArray(updateData[field]) && updateData[field].length === 0) {
        delete updateData[field];
      }
    });

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined || updateData[key] === "") {
        delete updateData[key];
      }
    });

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
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
