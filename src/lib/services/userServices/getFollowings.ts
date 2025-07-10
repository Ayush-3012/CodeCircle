import prisma from "@/lib/prism";

export async function getFollowings(userId: string) {
  return await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
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
