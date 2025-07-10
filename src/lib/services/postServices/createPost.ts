import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prism";

type CreatePostProps = {
  content: string;
  file: File | null;
  userId: string;
};

export async function createPost({ content, file, userId }: CreatePostProps) {
  let mediaUrl: string | null = null;
  let mediaType: string | null = null;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
        } else if (result) {
          mediaUrl = result.secure_url;
          mediaType = result.resource_type;
        }
      }
    );

    stream.end(buffer);

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

  const newPost = await prisma.post.create({
    data: {
      content,
      mediaUrl,
      mediaType,
      authorId: userId,
    },
  });

  return newPost;
}
