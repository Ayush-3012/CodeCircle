import { NextResponse } from "next/server";
import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";

export async function GET() {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const foundUser = await prisma.user.findUnique({
      where: { id: await session.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ foundUser }, { status: 200 });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
