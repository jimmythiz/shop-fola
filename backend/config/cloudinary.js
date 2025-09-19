// cloudinaryUpload.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMultiple = async (req, res, next) => {
  try {
    const images = req.files;
    const urls = [];

    for (const image of images) {
      console.log("Uploading:", image.path);
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });
      urls.push(result.secure_url);
      fs.unlinkSync(image.path); // remove from /uploads
    }

    req.images = urls; // pass to next middleware
    next();
  } catch (error) {
    console.error("Cloudinary error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};
