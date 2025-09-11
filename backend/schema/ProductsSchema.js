import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: [{
    type: String,
    required: true,
    enum: ["Phones", "Computers", "SmartWatches", "Cameras", "Headphones", "Gaming", "Clothing", "Electronics", "Household", "Shoes", "Beauty", "Perfume", "Women", "Men", "Children", "Baby", "Groceries", "Others"],
  }],
  tag_ids: [{
    type: String,
    enum: ["Best Seller", "New", "Trending", "Male", "Female", "Children"],
  }],
  size: [{ type: String, enum: ["Small", "Medium", "Large", "Extra Large"] }],
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: [1, "Must add at least 1 item"] },
  status: { type: String, required: true, enum: ["Available", "Sold Out"], default: "Available" },
  rating: { type: Number, min: [1, "Rating must be >= 1"], max: [5, "Rating cannot be > 5"], default: 1 },
  images: [{ type: String }],
}, { timestamps: true });

const ProductSchema = mongoose.model("Product", productSchema);
export default ProductSchema;
