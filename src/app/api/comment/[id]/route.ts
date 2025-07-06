import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { content } = await req.json();

    const foundComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!foundComment)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    if (foundComment.authorId !== session.userId)
      return NextResponse.json(
        { message: "You are not allowed to edit this comment" },
        { status: 403 }
      );

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const foundComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!foundComment)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    if (foundComment.authorId !== session.userId)
      return NextResponse.json(
        { message: "You are not allowed to edit this comment" },
        { status: 403 }
      );

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
