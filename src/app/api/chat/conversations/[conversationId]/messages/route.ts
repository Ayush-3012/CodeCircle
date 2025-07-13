import { getMessages } from "@/lib/services/chatServices/getMessages";
import { sendMessage } from "@/lib/services/chatServices/sendMessage";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });

    const cursor = _req.nextUrl.searchParams.get("cursor") ?? undefined;
    const { conversationId } = await params;

    const msgs = await getMessages(conversationId, cursor);
    return NextResponse.json(msgs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });

    const { content } = await req.json();
    const { conversationId } = await params;

    if (!content || content.trim() === "")
      return NextResponse.json({ error: "Empty message" }, { status: 400 });

    const message = await sendMessage(
      conversationId,
      session.userId,
      content.trim()
    );

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
