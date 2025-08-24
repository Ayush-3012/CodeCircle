import prisma from "@/lib/prism";
import cloudinary from "@/lib/cloudinary";

type UpdatePostArgs = {
  id: string;
  content: string;
  file: File | null;
  userId: string;
};

export async function updatePost({ id, content, file, userId }: UpdatePostArgs) {
  let mediaUrl: string | null = null;
  let mediaType: string | null = null;

  // File upload
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    mediaUrl = uploaded.secure_url;
    mediaType = uploaded.resource_type;
  }

  // Find post
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Unauthorized");

  // Update
  return await prisma.post.update({
    where: { id },
    data: {
      content,
      mediaUrl: mediaUrl ?? post.mediaUrl,
      mediaType: mediaType ?? post.mediaType,
    },
  });
}
