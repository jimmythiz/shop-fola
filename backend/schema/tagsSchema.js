import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
}, { timestamps: true });

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
