import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export const createToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = async (): Promise<{ userId: string } | null> => {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return null;

    const success = jwt.verify(token, JWT_SECRET) as { userId: string };
    return success;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
