import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token-manager";
import { updateUserProfile } from "@/lib/backend/services/userServices/updateUserProfile";

export async function PUT(req: Request) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string | null;
    const githubUrl = formData.get("githubUrl") as string | null;
    const linkedInUrl = formData.get("linkedInUrl") as string | null;
    const portfolioUrl = formData.get("portfolioUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    const updatedUser = await updateUserProfile(session.userId, {
      name,
      bio,
      githubUrl,
      linkedInUrl,
      portfolioUrl,
      imageFile,
    });

    return NextResponse.json(
      { message: "Profile updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
