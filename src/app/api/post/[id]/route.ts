import { deletePost } from "@/lib/backend/services/postServices/deletePost";
import { getPostById } from "@/lib/backend/services/postServices/getPostById";
import { updatePost } from "@/lib/backend/services/postServices/updatePost";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const foundPost = await getPostById(id);

    if (!foundPost)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    return NextResponse.json({ foundPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifyToken();
  if (!session || !session.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();

  const { id } = await params;
  const content = formData.get("content")?.toString() || "";
  const file = formData.get("media") as File | null;

  const updatedPost = await updatePost({
    id,
    content,
    file,
    userId: session.userId,
  });

  if (!updatedPost)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  return NextResponse.json(
    { message: "Post updated", updatedPost },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await verifyToken();
  if (!session || !session?.userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const result = await deletePost(id, session?.userId);

  if (result.notFound)
    return NextResponse.json({ message: "Post not found" }, { status: 404 });

  if (result.forbidden)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
