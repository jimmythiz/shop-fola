import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true }, // SEO-friendly URL
  description: { type: String, required: true },
  price: { type: Number, required: true },
  
   category_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],

   tag_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }],

  size: [{ type: String }], // <-- array of strings
  color: [{ type: String }], 


  quantity: { type: Number, default: 0 },
  

  rating: { type: Number, default: 0, min: 0, max: 5 },

  status: { type: String, enum: ["Available", "Sold Out"], default: "Available" },

   images: [{ type: String }], 
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
