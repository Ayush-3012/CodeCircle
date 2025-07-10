import prisma from "@/lib/prism";

export async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, username: true, image: true },
      },
    },
  });
}
