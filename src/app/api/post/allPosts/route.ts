import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token-manager";
import { getAllPosts } from "@/lib/backend/services/postServices/getAllPosts";

export async function GET() {
  try {
    const session = await verifyToken();
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const allPosts = (await getAllPosts()) || [];

    return NextResponse.json({ allPosts }, { status: 200 });
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", error },
      { status: 500 }
    );
  }
}
