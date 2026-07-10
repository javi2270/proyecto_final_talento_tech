import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET ?? "change_this_secret";

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
