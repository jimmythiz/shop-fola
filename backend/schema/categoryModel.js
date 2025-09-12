import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: { 
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String
  },
  parent: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },
  image: { 
    type: String
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
