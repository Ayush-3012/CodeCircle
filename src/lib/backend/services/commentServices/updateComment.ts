import prisma from "@/lib/prism";

export async function updateComment(
  commentId: string,
  content: string,
  userId: string
) {
  const foundComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!foundComment) return { notFound: true };

  if (foundComment.authorId !== userId) return { forbidden: true };

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
    },
  });

  return { updatedComment };
}
