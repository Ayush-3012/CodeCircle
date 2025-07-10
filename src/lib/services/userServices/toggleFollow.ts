import prisma from "@/lib/prism";

export async function toggleFollow(
  currentUserId: string,
  targetUserId: string
) {
  if (currentUserId === targetUserId) return { selfFollow: true };

  const existingFollow = await prisma.follow.findMany({
    where: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  if (existingFollow.length > 0) {
    await prisma.follow.deleteMany({
      where: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });
    return { followed: false };
  } else {
    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });
    return { followed: true };
  }
}
