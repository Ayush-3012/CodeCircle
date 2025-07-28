import { deleteMessage } from "@/lib/backend/services/chatServices/deleteMessage";
import { updateMessage } from "@/lib/backend/services/chatServices/updateMessage";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { messageId } = await params;
    const { newContent } = await req.json();

    if (!newContent || newContent.trim() === "")
      return NextResponse.json({ error: "Empty content" }, { status: 400 });

    const updatedMessage = await updateMessage(
      messageId,
      session.userId,
      newContent
    );

    return NextResponse.json(updatedMessage, { status: 200 });
  } catch (error) {
    console.error("Edit error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { messageId } = await params;

    const result = await deleteMessage(messageId, session.userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Edit error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
