import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prism";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Login successful", token, foundUser },
      { status: 200 }
    );
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
