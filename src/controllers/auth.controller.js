import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body ?? {};

  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const jwtSecret = process.env.JWT_SECRET ?? "change_this_secret";

  if (!username || !password) {
    return res.status(400).json({ message: "Credenciales incompletas" });
  }

  try {
    if (username !== expectedUsername || password !== expectedPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign({ username }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    });

    return res.json({ token });
  } catch (error) {
    const statusCode = error.statusCode || 401;
    return res.status(statusCode).json({ message: error.message });
  }
};
