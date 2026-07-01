import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./src/routes/products.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productsRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

// Puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
