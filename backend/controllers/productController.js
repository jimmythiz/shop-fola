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
if (req.files && req.files.images && req.files.images.length > 0) {
  const uploadPromises = req.files.images.map((file) =>
    cloudinary.uploader.upload(file.path, { folder: "ecommerce_products" })
  );

  const uploadResults = await Promise.all(uploadPromises);
  images = uploadResults.map((result) => result.secure_url);
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
    const { id } = req.params;
    const { body } = req;
    const files = req.files; // ✅ Correct way to access Multer's files object

    // Helper function to parse arrays
    const parseArray = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      // Handle comma-separated strings
      if (typeof field === 'string') {
        return field.split(',').map(s => s.trim()).filter(s => s);
      }
      return [field];
    };

    // Prepare update data from the request body
    const updateData = {
      ...body,
      // Parse array fields correctly
      size: parseArray(body['size[]'] || body.size),
      color: parseArray(body['color[]'] || body.color),
      category_id: parseArray(body['category_id[]'] || body.category_id),
      tag_ids: parseArray(body['tag_ids[]'] || body.tag_ids),
      // Ensure numeric fields are correctly typed
      price: body.price ? parseFloat(body.price) : undefined,
      quantity: body.quantity ? parseInt(body.quantity) : undefined,
      rating: body.rating ? parseFloat(body.rating) : undefined,
    };
    
    // Generate slug if name is provided
    if (updateData.name) {
      updateData.slug = slugify(updateData.name);
    }
    
    // Get current product to find images to delete
    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    
    // Determine images to delete
    const existingImages = parseArray(body['existingImages[]'] || body.existingImages);
    const imagesToDelete = currentProduct.images.filter(img => !existingImages.includes(img));
    
    // Delete removed images from Cloudinary
    if (imagesToDelete.length > 0) {
      const deletePromises = imagesToDelete.map(async (imageUrl) => {
        try {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`ecommerce_products/${publicId}`);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      });
      await Promise.all(deletePromises);
    }
    
    // Get new image URLs from Multer's upload result
    const newImageUrls = (files?.images || []).map(file => file.path);

    let uploadedNewImages = [];
if (files?.images?.length > 0) {
  const uploadPromises = files.images.map((file) =>
    cloudinary.uploader.upload(file.path, { folder: "ecommerce_products" })
  );
  const uploadResults = await Promise.all(uploadPromises);
  uploadedNewImages = uploadResults.map(r => r.secure_url);
}

// Combine with existing images
updateData.images = [...existingImages, ...uploadedNewImages];

    
    // Remove fields with empty arrays to prevent errors
    if (updateData.size.length === 0) delete updateData.size;
    if (updateData.color.length === 0) delete updateData.color;
    if (updateData.category_id.length === 0) delete updateData.category_id;
    if (updateData.tag_ids.length === 0) delete updateData.tag_ids;

    // Remove undefined/empty values to avoid overwriting valid data
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === '') {
        delete updateData[key];
      }
    });

    console.log('Update data:', updateData); // Debug log

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ 
      message: "Product updated successfully", 
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
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
