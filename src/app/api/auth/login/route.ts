import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prism";
import { createToken } from "@/utils/token-manager";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser)
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const token = createToken(foundUser.id.toString());
    (await cookies()).set(process.env.COOKIE_NAME!, token, {
      httpOnly: true,
      path: "/",
      // secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      secure: false,
      sameSite: "lax",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return NextResponse.json({ message: "User Logged In" }, { status: 200 });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
