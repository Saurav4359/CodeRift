import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const HashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
// use argon2 next time for hashing password

export const ComparePassword = async (
  password: string,
  HashPassword: string,
) => {
  return await bcrypt.compare(password, HashPassword);
};

export const GenerateToken = async (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "15m" });
};

export const VerifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
};


 