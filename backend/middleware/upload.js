// upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure storage
const storage = new CloudinaryStorage({
 cloudinary,
 params: {
folder: "ecommerce_products",
allowed_formats: ["jpg", "jpeg", "png", "webp"],
 transformation: [{ quality: "auto", fetch_format: "auto" }],
 },
});

const upload = multer({
 storage,
 limits: {
 fileSize: 5 * 1024 * 1024, // 5MB per file
 files: 10 // Maximum 10 files
 }
});

// ✅ Corrected: Export `uploadProductImages` to handle a mix of new files and other fields.
export const uploadProductImages = upload.fields([
  { name: 'images', maxCount: 10 } // For new images
]);

// You can still keep the old export if needed for other routes
export default upload;