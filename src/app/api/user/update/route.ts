import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token-manager";
import { updateUserProfile } from "@/lib/services/userServices/updateUserProfile";

export async function PUT(req: Request) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    const updatedUser = await updateUserProfile(session?.userId, data);

    return NextResponse.json(
      { message: "Profile updated successfully", updatedUser },
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
