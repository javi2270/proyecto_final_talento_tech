import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// prefijo:  /api/products

router.use(auth);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/create", createProduct);

router.delete("/:id", deleteProduct);

export default router;
