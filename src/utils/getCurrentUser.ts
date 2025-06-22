import { verifyToken } from "./token-manager";

export async function getCurrentUser() {
  const session = await verifyToken();
  if (!session?.userId) return null;

  return session;
}
