import prisma from "@/lib/prism";

export async function deleteMessage(messageId: string, userId: string) {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message || message.senderId !== userId) {
    throw new Error("Unauthorized or message not found");
  }

  await prisma.message.delete({
    where: { id: messageId },
  });

  return { message: "Deleted successfully" };
}
