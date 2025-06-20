import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const success = await verifyToken();
    if (!success)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { content } = await req.json();
    if (!content)
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );

    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: success.userId,
      },
    });

    return NextResponse.json(
      { message: "Post created successfully", newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
