import Category from "./schema/categoryModel.js";
import Tag from "./schema/tagsSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI;

// Original enums
const categories = [
  "Phones", "Computers", "SmartWatches", "Cameras", "Headphones",
  "Gaming", "Clothing", "Electronics", "Household", "Shoes",
  "Beauty", "Perfume", "Women", "Men", "Children", "Baby",
  "Groceries", "Others"
];

const tags = [
  "Best Seller", "New", "Trending", "Male", "Female", "Children"
];

// Helper to create URL-friendly slugs
const slugify = (text) =>
  text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

mongoose.connect(DB_URI)
  .then(async () => {
    console.log("MongoDB Connected ✅");

    // Clear existing data
    await Category.deleteMany({});
    await Tag.deleteMany({});

    // Insert categories with slugs
    const categoryDocs = categories.map(name => ({
      name,
      slug: slugify(name)
    }));
    await Category.insertMany(categoryDocs);
    console.log("Categories seeded successfully ✅");

    // Insert tags with slugs
    const tagDocs = tags.map(name => ({
      name,
      slug: slugify(name)
    }));
    await Tag.insertMany(tagDocs);
    console.log("Tags seeded successfully ✅");

    process.exit();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
