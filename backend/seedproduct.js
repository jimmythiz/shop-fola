import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductSchema from "./schema/ProductsSchema.js";

dotenv.config();

// Dummy products
const products = [
  {
    name: "iPhone 15",
    description: "Latest Apple smartphone",
    price: 1200,
    category_id: "Phones",
    tag_ids: ["Best Seller", "New"],
    size: "Medium",
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
    category_id: "Computers",
    tag_ids: ["Trending"],
    size: "Large",
    color: "Silver",
    quantity: 5,
    status: "Available",
    rating: 4.8,
    images: ["https://example.com/images/macbookpro.jpg"]
  },
  {
    name: "Samsung Galaxy Watch",
    description: "Smartwatch with fitness tracking",
    price: 300,
    category_id: "SmartWatches",
    tag_ids: ["New"],
    size: "Small",
    color: "Black",
    quantity: 20,
    status: "Available",
    rating: 4.3,
    images: ["https://example.com/images/galaxywatch.jpg"]
  },
  {
    name: "Sony WH-1000XM5",
    description: "Noise cancelling headphones",
    price: 350,
    category_id: "Headphones",
    tag_ids: ["Best Seller", "Trending"],
    size: "Medium",
    color: "Black",
    quantity: 15,
    status: "Available",
    rating: 4.7,
    images: ["https://example.com/images/sonyheadphones.jpg"]
  },
  {
    name: "Canon EOS R6",
    description: "Mirrorless camera with high performance",
    price: 2500,
    category_id: "Cameras",
    tag_ids: ["New"],
    size: "Large",
    color: "Black",
    quantity: 8,
    status: "Available",
    rating: 4.9,
    images: ["https://example.com/images/canoneosr6.jpg"]
  }
];

// Connect to MongoDB and insert
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Clear existing products (optional)
    await ProductSchema.deleteMany({});
    console.log("🗑️ Existing products cleared");

    // Insert dummy products
    await ProductSchema.insertMany(products);
    console.log("✅ Dummy products inserted");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedDB();
