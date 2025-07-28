import prisma from "@/lib/prism";

export async function getUserConversations(userId: string | undefined) {
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: { userId },
      },
    },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
        include: {
          sender: { select: { id: true, name: true, image: true } },
        },
      },
      participants: {
        select: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });

  return conversations;
}
