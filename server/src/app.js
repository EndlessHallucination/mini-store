import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.use(errorHandler);

export default app;
