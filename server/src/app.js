import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import productsRoutes from "./routes/productsRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes);

app.use(errorHandler);

export default app;
