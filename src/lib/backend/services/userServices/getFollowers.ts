import prisma from "@/lib/prism";

export async function getFollowers(userId: string) {
  return await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });
}
