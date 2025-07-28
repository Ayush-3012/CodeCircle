import { likeOrUnlikePost } from "@/lib/backend/services/postServices/likeOrUnlikePost";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const result = await likeOrUnlikePost(id, session.userId);

    if (result.notFound)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
