import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/services/authSerivces/getCurrentUser";
import { verifyToken } from "@/utils/token-manager";

export async function GET() {
  try {
    const session = await verifyToken();
    if (!session || !session?.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getCurrentUser();
    return NextResponse.json({ message: "LoggedIn", user }, { status: 200 });
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
