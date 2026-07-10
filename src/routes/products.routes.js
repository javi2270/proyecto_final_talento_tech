import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// prefijo:  /api/products

router.use(authenticateToken);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/create", createProduct);

router.delete("/:id", deleteProduct);

export default router;
