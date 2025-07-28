import prisma from "@/lib/prism";

export async function createOrGetConversation(
  userAId: string,
  userBId: string
) {
  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: userAId } } },
        { participants: { some: { userId: userBId } } },
      ],
    },
    include: {
      participants: true,
    },
  });

  if (existing) return existing;

  return prisma.conversation.create({
    data: {
      participants: {
        createMany: {
          data: [{ userId: userAId }, { userId: userBId }],
        },
      },
    },
    include: {
      participants: true,
    },
  });
}
