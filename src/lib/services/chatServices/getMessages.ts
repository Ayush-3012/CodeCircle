import prisma from "@/lib/prism";

export async function getMessages(
  conversationId: string,
  cursor?: string,
  limit = 30
) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
  });
}
