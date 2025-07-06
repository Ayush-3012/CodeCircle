import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifyToken();
  if (!session || !session.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return NextResponse.json({ posts });
}
