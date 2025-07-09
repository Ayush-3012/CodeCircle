import { verifyToken } from "@/utils/token-manager";
import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

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

    if (currentUserId === targetUserId) {
      return NextResponse.json(
        { message: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    const existingFollow = await prisma.follow.findMany({
      where: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    if (existingFollow.length > 0) {
      // unfollow
      await prisma.follow.delete({
        where: { id: targetUserId },
      });

      return NextResponse.json({ message: "Unfollowed" }, { status: 200 });
    } else {
      // follow
      await prisma.follow.create({
        data: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      });
      return NextResponse.json({ message: "Followed" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
