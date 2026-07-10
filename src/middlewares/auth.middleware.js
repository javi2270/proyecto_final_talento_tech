import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Formato de token invalido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalido o expirado" });
  }
};
