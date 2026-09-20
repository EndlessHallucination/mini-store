import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: {
      type: Number,
      required: true,
      validate: { validator: Number.isInteger, message: "Quantity must be a whole number" },
      min: 1
    },
    // Price at order time: later product price changes must not affect past orders.
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      validate: { validator: (items) => items.length > 0, message: "Order needs at least one item" }
    },
    total: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
