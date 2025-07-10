import prisma from "@/lib/prism";

export async function likeOrUnlikePost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) return { notFound: true };

  const alreadyLiked = post.likes.includes(userId);

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      likes: alreadyLiked
        ? { set: post.likes.filter((id) => id !== userId) }
        : { set: [...post.likes, userId] },
    },
  });

  return {
    message: alreadyLiked ? "Unliked" : "Liked",
    updatedPost,
  };
}
