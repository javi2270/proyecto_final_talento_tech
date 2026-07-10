import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";
import productsRouter from "./src/routes/products.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRouter);
app.use("/api/products", productsRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

// Middleware 500
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Error interno del servidor",
  });
});

// Puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
