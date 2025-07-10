import prisma from "@/lib/prism";

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      githubUrl: true,
      linkedInUrl: true,
      portfolioUrl: true,
    },
  });

  return user;
}
