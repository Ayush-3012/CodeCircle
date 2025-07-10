import prisma from "@/lib/prism";

export async function getCommentsByPostId(postId: string) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
