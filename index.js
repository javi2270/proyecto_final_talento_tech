import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

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
