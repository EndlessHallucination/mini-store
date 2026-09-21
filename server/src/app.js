import cors from "cors";
import express from "express";
import { getCorsOptions } from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

export function createApp() {
  const app = express();

  app.use(cors(getCorsOptions()));
  app.use(express.json());

  app.use("/api/products", productsRoutes);
  app.use("/api/orders", ordersRoutes);

  app.use(errorHandler);

  return app;
}
