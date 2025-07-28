import prisma from "@/lib/prism";
// import { initSocket } from "@/lib/socketServer";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
) {
  const message = await prisma.$transaction(async (tx) => {
    const msg = await tx.message.create({
      data: { conversationId, senderId, content },
      include: { sender: true },
    });
    await tx.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });
    return msg;
  });

  /* ----- emit real‑time event ----- */
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const io = globalThis.__io;
    io?.to(conversationId).emit("message", message);
  } catch (e) {
    console.warn("Socket emit failed:", e);
  }

  return message;
}
