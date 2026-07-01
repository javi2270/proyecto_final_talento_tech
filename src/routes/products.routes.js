import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/products.controller.js";

const router = Router();

// prefijo:  /api/products

router.get("/", getAllProducts);

router.get("/:id", getProductById);









export default router;
