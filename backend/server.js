import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser'

dotenv.config();
// Routes
import cartRouter from "./routes/cartRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import orderRoute from "./routes/orderRoutes.js"
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoutes.js";
import tagRouter from "./routes/tagRoutes.js";
import authRouter from "./routes/authRouter.js";
import dashboardRouter from "./routes/dashboard.js";



const app = express();
app.use(express.json());
app.use(cors({
  origin: `${process.env.FRONTEND}`, 
  credentials: true,               
}));
app.use(cookieParser());

app.use("/api/auth", authRouter);  
app.use('/api/carts', cartRouter )
app.use("/api/categories", categoryRouter);
app.use('/api/orders', orderRoute)
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/tags", tagRouter);
app.use("/api/dashboard", dashboardRouter);


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

