import prisma from "@/lib/prism";

export async function deletePost(id: string, userId: string) {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) return { notFound: true };

  if (post.authorId !== userId) return { forbidden: true };

  await prisma.comment.deleteMany({
    where: { postId: id },
  });
  await prisma.post.delete({ where: { id } });
  return { success: true };
}
