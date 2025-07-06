// GET ALL COMMNENTS BY POST ID

import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { postId } = await params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
