import { Router } from "express";
import { createOrder } from "../services/ordersService.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const order = await createOrder(req.body ?? {});
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
