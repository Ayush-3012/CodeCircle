import { verifyToken } from "@/utils/token-manager";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const success = await verifyToken();
    if (!success)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    (await cookies()).set(process.env.COOKIE_NAME!, "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.redirect("http://localhost:3000/");
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed", error },
      { status: 500 }
    );
  }
}
