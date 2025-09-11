import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: [1, "Quantity cannot be less than 1"], 
        default: 1 
      },
      price: { 
        type: Number, 
        required: true 
      },
      subtotal: { 
        type: Number, 
        required: true 
      }
    }
  ],
  totalQuantity: { 
    type: Number, 
    default: 0 
  },
  totalPrice: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ["Active", "Ordered", "Cancelled"], 
    default: "Active" 
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
