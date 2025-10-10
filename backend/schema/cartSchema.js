import mongoose from "mongoose";
import Product from "../schema/ProductsSchema.js"; 

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedColor: {
          type: String, 
          required: false,
        },
        selectedSize: {
          type: String, 
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          default: 1,
        },
        price: {
          type: Number,
          default: 0, 
        },
        subtotal: {
          type: Number,
          default: 0, 
        },
      },
    ],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Ordered", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Helper function to recalc cart
async function recalcCart(cart) {
  if (cart.items && cart.items.length > 0) {
    for (let item of cart.items) {
      // Fetch latest product price
      const product = await Product.findById(item.productId).select("price");
      if (product) {
        item.price = product.price;
        item.subtotal = item.quantity * product.price;
      } else {
        item.price = 0;
        item.subtotal = 0;
      }
    }

    cart.totalQuantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
  } else {
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
  }
}

// Before saving a document
cartSchema.pre("save", async function (next) {
  await recalcCart(this);
  next();
});

// Before updating via findOneAndUpdate / findByIdAndUpdate
cartSchema.pre("findOneAndUpdate", async function (next) {
  let update = this.getUpdate();

  // If items are being modified, recalc totals
  if (update.items || update.$set?.items || update.$push?.items || update.$pull?.items) {
    const cart = await this.model.findOne(this.getQuery());
    if (cart) {
      // Apply updates temporarily
      let updatedCart = { ...cart.toObject() };

      if (update.$set?.items) updatedCart.items = update.$set.items;
      else if (update.items) updatedCart.items = update.items;
      else if (update.$push?.items) updatedCart.items = [...updatedCart.items, update.$push.items];
      else if (update.$pull?.items) updatedCart.items = updatedCart.items.filter(
        (i) => i.productId.toString() !== update.$pull.items.productId.toString()
      );

      // Recalculate totals
      await recalcCart(updatedCart);

      // Force update totals
      update.totalQuantity = updatedCart.totalQuantity;
      update.totalPrice = updatedCart.totalPrice;

      // Ensure update reflects recalculated items if fully replaced
      if (update.items || update.$set?.items) {
        update.items = updatedCart.items;
      }

      this.setUpdate(update);
    }
  }

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
