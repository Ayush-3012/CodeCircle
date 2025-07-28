import prisma from "@/lib/prism";

export async function createComment(
  postId: string,
  content: string,
  userId: string
) {
  return await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: userId,
    },
  });

}
