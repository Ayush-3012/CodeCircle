import { createOrGetConversation } from "@/lib/backend/services/chatServices/createOrGetConversation";
import { getUserConversations } from "@/lib/backend/services/chatServices/getUserConversations";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { targetUserId } = await req.json();

    if (!targetUserId || targetUserId === session.userId)
      return NextResponse.json(
        { message: "Invalid target user" },
        { status: 400 }
      );

    const convo = await createOrGetConversation(session.userId, targetUserId);
    return NextResponse.json(convo, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const list = await getUserConversations(session.userId);
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
