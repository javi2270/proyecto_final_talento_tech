import { generateToken } from "../utils/generateToken.js";

const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123",
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "Credenciales incompletas" });
  }

  try {
    if (email !== default_user.email || password !== default_user.password) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = generateToken(default_user);

    return res.json({ token });
  } catch (error) {
    const statusCode = error.statusCode || error.status || 500;
    return res
      .status(statusCode)
      .json({ message: error.message || "Error interno del servidor" });
  }
};
