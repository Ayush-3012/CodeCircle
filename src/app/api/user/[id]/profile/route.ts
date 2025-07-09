import { NextResponse } from "next/server";
import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const foundUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        githubUrl: true,
        linkedInUrl: true,
        portfolioUrl: true,
      },
    });

    if (!foundUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ foundUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
