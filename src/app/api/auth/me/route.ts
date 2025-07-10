import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/services/authSerivces/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });

    return NextResponse.json(
      { message: "LoggedIn", userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
