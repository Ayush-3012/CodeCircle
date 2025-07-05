import { NextResponse } from "next/server";
import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";

export async function GET() {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    return NextResponse.json({ message: "LoggedIn", userId: user.id }, { status: 200 });
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
