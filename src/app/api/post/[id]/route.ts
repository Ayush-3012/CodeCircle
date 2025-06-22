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
