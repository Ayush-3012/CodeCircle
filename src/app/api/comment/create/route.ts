import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { postId, content } = await req.json();
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: session.userId,
      },
    });
    return NextResponse.json({ comment });
  } catch (error) {
    return NextResponse.json({ error }, { status: 501 });
  }
}
