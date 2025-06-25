import { NextResponse } from "next/server";
import prisma from "@/lib/prism";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || !user.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log(user);
    // const foundUser = await prisma.user.findUnique({
    //   where: { id: await user.userId },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //   },
    // });

    // if (!foundUser) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    // return NextResponse.json({ foundUser }, { status: 200 });
    return NextResponse.json({ message: "found" }, { status: 200 });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
