import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true},
    username: { type: String, required: true,unique:true },
    email : { type: String, required: true,unique:true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default:"User"
    },
    cart : [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
    }]

}, { timestamps: true });

const User = mongoose.model("Users", userSchema);
export default User;
    