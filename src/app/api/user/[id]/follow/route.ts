import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";
import { toggleFollow } from "@/lib/services/userServices/toggleFollow";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const currentUserId = session?.userId;
    const { id: targetUserId } = await params;

    const result = await toggleFollow(currentUserId, targetUserId);

    if (result.selfFollow) {
      return NextResponse.json(
        { message: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: result.followed ? "Followed" : "Unfollowed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
