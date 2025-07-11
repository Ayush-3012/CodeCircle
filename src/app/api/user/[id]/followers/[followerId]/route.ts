import { removeFollower } from "@/lib/services/userServices/removeFollower";
import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; followerId: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id, followerId } = await params;

    await removeFollower(session.userId, id, followerId);

    return NextResponse.json({ message: "Follower removed" });
  } catch (err) {
    console.error("[REMOVE_FOLLOWER]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
