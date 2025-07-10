import prisma from "@/lib/prism";

export async function deleteComment(commentId: string, userId: string) {
  const foundComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!foundComment) return { notFound: true };

  if (foundComment.authorId !== userId) return { forbidden: true };

  await prisma.comment.delete({
    where: { id: commentId },
  });

  return { success: true };
}
