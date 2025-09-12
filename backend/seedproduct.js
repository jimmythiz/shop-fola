import mongoose from "mongoose";
import dotenv from "dotenv";
import slugify from "slugify";

import Category from "./schema/categoryModel.js";
import Tag from "./schema/tagsSchema.js";
import Product from "./schema/ProductsSchema.js";
import Cart from "./schema/cartSchema.js";
import Order from "./schema/orderSchema.js";

dotenv.config();
const DB_URI = process.env.DB_URI;

// Seed data
const categories = [
  "Phones", "Computers", "SmartWatches", "Cameras", "Headphones",
  "Gaming", "Clothing", "Electronics", "Household", "Shoes",
  "Beauty", "Perfume", "Women", "Men", "Children", "Baby",
  "Groceries", "Others"
];

const tags = [
  "Best Seller", "New", "Trending", "Male", "Female", "Children"
];

// Dummy products
const products = [
  {
    name: "iPhone 15",
    description: "Latest Apple smartphone",
    price: 1200,
    categories: ["Phones"],
    tags: ["Best Seller", "New"],
    size: ["Medium"],
    color: "Black",
    quantity: 10,
    status: "Available",
    rating: 4.5,
    images: ["https://example.com/images/iphone15.jpg"]
  },
  {
    name: "MacBook Pro 16\"",
    description: "Powerful laptop for professionals",
    price: 2500,
    categories: ["Computers"],
    tags: ["Trending"],
    size: ["Large"],
    color: "Silver",
    quantity: 5,
    status: "Available",
    rating: 4.8,
    images: ["https://example.com/images/macbookpro.jpg"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    console.log("🗑️ Existing collections cleared");

    // Seed categories with slugs
    const categoryDocs = await Category.insertMany(
      categories.map(name => ({
        name,
        slug: slugify(name, { lower: true })
      }))
    );

    // Seed tags with slugs
    const tagDocs = await Tag.insertMany(
      tags.map(name => ({
        name,
        slug: slugify(name, { lower: true })
      }))
    );

    console.log("✅ Categories and Tags seeded");

    // Map category/tag names to _id
    const categoryMap = {};
    categoryDocs.forEach(cat => categoryMap[cat.name] = cat._id);
    const tagMap = {};
    tagDocs.forEach(tag => tagMap[tag.name] = tag._id);

    // Seed products with category/tag IDs and slugs
    const productDocs = await Product.insertMany(
      products.map(p => ({
        ...p,
        slug: slugify(p.name, { lower: true }),
        categories: p.categories.map(cat => categoryMap[cat]),
        tags: p.tags.map(tag => tagMap[tag])
      }))
    );

    console.log("✅ Products seeded");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();

