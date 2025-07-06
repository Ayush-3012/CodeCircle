import { NextResponse } from "next/server";
import prisma from "@/lib/prism";
import { verifyToken } from "@/utils/token-manager";

export async function PUT(req: Request) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, image, bio, githubUrl, linkedInUrl, portfolioUrl } =
      await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        name,
        image: image || "",
        bio: bio || null,
        githubUrl: githubUrl || null,
        linkedInUrl: linkedInUrl || null,
        portfolioUrl: portfolioUrl || null,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
