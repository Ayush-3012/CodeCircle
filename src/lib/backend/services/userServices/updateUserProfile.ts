import prisma from "@/lib/prism";
import cloudinary from "@/lib/cloudinary";

type UpdateUserProfileArgs = {
  name: string;
  imageFile?: File | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
  portfolioUrl?: string | null;
};

export async function updateUserProfile(
  userId: string,
  {
    name,
    imageFile,
    bio,
    githubUrl,
    linkedInUrl,
    portfolioUrl,
  }: UpdateUserProfileArgs
) {
  let imageUrl: string | null = null;
  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploaded = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "users" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    imageUrl = uploaded.secure_url;
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      image: imageUrl ?? undefined, // ✅ agar nayi image nahi hai to purani wali rahegi
      bio: bio || null,
      githubUrl: githubUrl || null,
      linkedInUrl: linkedInUrl || null,
      portfolioUrl: portfolioUrl || null,
    },
  });
  return updatedUser;
}
