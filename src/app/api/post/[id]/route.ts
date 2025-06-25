import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prism";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const foundPost = await prisma.post.findUnique({
      where: { id: await params.id },
      include: {
        author: {
          select: { id: true, name: true, username: true, image: true },
        },
      },
    });

    if (!foundPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ foundPost }, { status: 200 });
  } catch (error) {
    console.error("GET SINGLE POST ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || !user.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();

  const content = formData.get("content")?.toString() || "";
  const file = formData.get("media") as File | null;

  let mediaUrl: string | null = null;
  let mediaType: string | null = null;

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

  const post = await prisma.post.findUnique({ where: { id: await params.id } });
  if (!post || post.authorId !== user.userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const updatedPost = await prisma.post.update({
    where: { id: await params.id },
    data: {
      content,
      mediaUrl: mediaUrl || post.mediaUrl,
      mediaType: mediaType || post.mediaType,
    },
  });

  return NextResponse.json(
    { message: "Post updated", updatedPost },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();

  if (!user || !user.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id: await params.id } });
  if (!post)
    return NextResponse.json({ message: "Post not found" }, { status: 404 });

  if (post.authorId !== user.userId)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await prisma.post.delete({ where: { id: params.id } });

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
