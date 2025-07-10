// SERVER SERIVCE FUNCTION TO GET CURRENT USER

import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";

export async function getCurrentUser() {
  const session = await verifyToken();
  if (!session || !session.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return user;
}
