import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products", productRouter)
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 8001
connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
        console.log(`App listening on port ${PORT}`)
    })
    })
    .catch((error)=>{
        console.error("Failed To Connect To Database",error)
        process.exit(1)
    })

