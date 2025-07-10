import prisma from "@/lib/prism";

type UpdateUserProfileArgs = {
  name: string;
  image?: string;
  bio?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
};

export async function updateUserProfile(
  userId: string,
  {
    name,
    image,
    bio,
    githubUrl,
    linkedInUrl,
    portfolioUrl,
  }: UpdateUserProfileArgs
) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      image: image || "",
      bio: bio || null,
      githubUrl: githubUrl || null,
      linkedInUrl: linkedInUrl || null,
      portfolioUrl: portfolioUrl || null,
    },
  });

  return updatedUser;
}
