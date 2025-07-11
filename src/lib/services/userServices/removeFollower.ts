import prisma from "@/lib/prism";

export async function removeFollower(
  userId: string,
  id: string,
  followerId: string
) {
  if (userId !== id) return { forbidden: true };

  await prisma.follow.deleteMany({
    where: {
      followerId,
      followingId: id,
    },
  });

  return { success: true };
}
