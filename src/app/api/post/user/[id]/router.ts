import prisma from "@/lib/prism";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const posts = await prisma.post.findMany({
    where: { authorId: params.id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return NextResponse.json({ posts });
}
