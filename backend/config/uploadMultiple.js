import asyncHandler from 'express-async-handler'
import fs from "fs";
import cloudinary from "./cloudinary.js";

const uploadMultiple = asyncHandler(async(req,res,next)=>{
    try{
        const images = req.files;
        const imageURL = [];
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image.path,{
                resource_type:'auto'
            })
            imageURL.push(result.secure_url)
            fs.unlinkSync(image.path);
        }
        req.images = imageURL
        next()
    }catch(error){
        console.error(error.message)
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
})
export default uploadMultiple;