import { Router } from "express";
import { createProduct, deleteProduct, listProducts } from "../services/productsService.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const product = await createProduct(req.body ?? {});
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await listProducts());
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
