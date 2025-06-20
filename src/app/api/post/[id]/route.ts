import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
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
