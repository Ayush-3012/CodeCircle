import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const post = await prisma.post.findUnique({
      where: { id: await params.id },
    });
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    const alreadyLiked = post.likes.includes(session.userId);
    const updatedPost = await prisma.post.update({
      where: { id: await params.id },
      data: {
        likes: alreadyLiked
          ? { set: post.likes.filter((id) => id !== session.userId) }
          : { set: [...post.likes, session.userId] },
      },
    });

    return NextResponse.json({
      message: alreadyLiked ? "Unliked" : "Liked",
      updatedPost,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
