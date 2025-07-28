import prisma from "@/lib/prism";

export async function updateMessage(
  messageId: string,
  userId: string,
  newContent: string
) {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message || message.senderId !== userId) {
    throw new Error("Unauthorized or message not found");
  }

  const updated = await prisma.message.update({
    where: { id: messageId },
    data: { content: newContent.trim() },
  });

  return updated;
}
