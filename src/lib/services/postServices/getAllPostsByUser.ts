import prisma from "@/lib/prism";

export async function getAllPostsByUser(id: string) {
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return posts;
}
