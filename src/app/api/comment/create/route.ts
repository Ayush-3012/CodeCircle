import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";
import { createComment } from "@/lib/services/commentServices/createComment";

export async function POST(req: Request) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { postId, content } = await req.json();
    const comment = await createComment(postId, content, session?.userId);

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 501 });
  }
}
