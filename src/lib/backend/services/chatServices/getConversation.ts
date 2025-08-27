import prisma from "@/lib/prism";

export async function getConversation(conversationId: string) {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
}
