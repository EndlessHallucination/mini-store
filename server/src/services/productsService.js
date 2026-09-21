import mongoose from "mongoose";
import Product from "../models/product.js";
import { createHttpError } from "../utils.js";

const PRODUCT_FIELDS = "name price description";

export async function createProduct({ name, price, description }) {
  try {
    const product = await Product.create({ name, price, description });
    return { _id: product._id, name: product.name, price: product.price, description: product.description };
  } catch (error) {
    // Invalid input is the client's fault (400), not a server error (500).
    // The messages come from the model rules, e.g. "Name is required, Price must be positive".
    if (error.name === "ValidationError") {
      throw createHttpError(
        400,
        Object.values(error.errors)
          .map((fieldError) => fieldError.message)
          .join(", ")
      );
    }
    throw error;
  }
}

export function listProducts() {
  return Product.find().select(PRODUCT_FIELDS).lean();
}

export async function deleteProduct(id) {
  if (!mongoose.isValidObjectId(id)) throw createHttpError(400);

  const deletedProduct = await Product.findByIdAndDelete(id).select("_id");
  if (!deletedProduct) throw createHttpError(404);
}
