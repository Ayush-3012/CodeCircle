import { NextResponse } from "next/server";
import prisma from "@/lib/prism";

export async function GET() {
  try {
    const allPosts =
      (await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      })) || [];
    return NextResponse.json({ allPosts }, { status: 200 });
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", error },
      { status: 500 }
    );
  }
}
