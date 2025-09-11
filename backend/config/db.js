import mongoose from 'mongoose';

const connectDB = async () =>{
    const DB_URI = process.env.DB_URI
    try{
        await mongoose.connect(DB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log("Successfully Connected to Darabase")

    }catch(error){
        console.error("Failed To Connect To DB",error)
        process.exit(1)
    }

}
export default connectDB;