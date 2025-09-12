import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true }, // SEO-friendly URL
  description: { type: String, required: true },
  price: { type: Number, required: true },
  
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],

  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }],

  variants: [{
    size: { type: String, enum: ["Small", "Medium", "Large", "Extra Large"] },
    color: String,
    quantity: { type: Number, min: 0 }
  }],

  brand: String,
  
  images: [{ type: String }],

  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },

  status: { type: String, enum: ["Available", "Sold Out"], default: "Available" },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
