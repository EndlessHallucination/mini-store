import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { createHttpError } from "../utils.js";

// Validates the raw items and merges duplicates in one pass.
// Example: [{productId: "a", quantity: 1}, {productId: "a", quantity: 2}] -> Map { "a" => 3 }
function combineItems(items) {
  if (!Array.isArray(items) || items.length === 0) throw createHttpError(400, "Items must be a non-empty array");

  const quantities = new Map();
  for (const item of items) {
    const productId = item?.productId;
    const quantity = item?.quantity;

    if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid product ID");
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createHttpError(400, "Quantity must be a positive whole number");
    }

    quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
  }
  return quantities;
}

export async function createOrder({ items }) {
  const quantities = combineItems(items);

  const products = await Product.find({ _id: { $in: [...quantities.keys()] } })
    .select("price")
    .lean();
  if (products.length !== quantities.size) throw createHttpError(404, "One or more products do not exist");

  // Prices come from the DB only; total is in cents to avoid floating point drift.
  let totalCents = 0;
  const orderItems = products.map((product) => {
    const quantity = quantities.get(product._id.toString());
    totalCents += Math.round(product.price * 100) * quantity;
    return { product: product._id, quantity, price: product.price };
  });

  try {
    const order = await Order.create({ items: orderItems, total: totalCents / 100 });
    return { _id: order._id, items: orderItems, total: order.total, createdAt: order.createdAt };
  } catch (error) {
    if (error.name === "ValidationError") throw createHttpError(400);
    throw error;
  }
}
