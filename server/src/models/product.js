import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  price: {
    type: Number,
    required: [true, "Price is required"],
    cast: "Price must be a number",
    // `min: 0` would still allow 0, so check "greater than 0" ourselves.
    validate: { validator: (value) => value > 0, message: "Price must be positive" }
  },
  description: { type: String, trim: true }
});

export default mongoose.model("Product", productSchema);
