import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      default: () => `ORD-${Date.now()}`, // human-friendly order number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        subtotal: { type: Number }, // auto-calculated
      },
    ],
    totalQuantity: { type: Number }, // auto-calculated
    totalPrice: { type: Number }, // auto-calculated
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Bank Transfer", "Cash on Delivery"],
      default: "Credit Card",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentDetails: {
      transactionId: { type: String },
      provider: { type: String }, // e.g. "Stripe", "PayPal"
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Processing",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

// 🔧 Auto-calc subtotal, totalQuantity, totalPrice before save
orderSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;
  });

  this.totalQuantity = this.items.reduce((sum, i) => sum + i.quantity, 0);
  this.totalPrice = this.items.reduce((sum, i) => sum + i.subtotal, 0);

  next();
});

// 📌 Indexes for performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
