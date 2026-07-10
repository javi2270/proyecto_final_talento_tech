import jwt from "jsonwebtoken";

export const generateToken = (userData) => {
  const payload = {
    id: userData.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "12h",
  });
};
