import { createPost } from "@/lib/services/postServices/createPost";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await verifyToken();
  if (!session || !session?.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();

  const content = formData.get("content")?.toString() || "";
  const file = formData.get("media") as File | null;

  const newPost = await createPost({ content, file, userId: session?.userId });

  return NextResponse.json(
    { message: "Post created successfully", newPost },
    { status: 201 }
  );
}
