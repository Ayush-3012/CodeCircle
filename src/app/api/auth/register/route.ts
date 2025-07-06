import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prism";

export async function POST(req: Request) {
  try {
    const {
      name,
      username,
      email,
      password,
      image,
      bio,
      githubUrl,
      linkedInUrl,
      portfolioUrl,
    } = await req.json();

    if (!name || !email || !password || !username) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase();
    const lowerUsername = username.toLowerCase();

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });
    if (existingUserByEmail)
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: lowerUsername },
    });
    if (existingUserByUsername)
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        username: lowerUsername,
        email: lowerEmail,
        password: hashedPassword,
        image: image || "",
        bio: bio || null,
        githubUrl: githubUrl || null,
        linkedInUrl: linkedInUrl || null,
        portfolioUrl: portfolioUrl || null,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
