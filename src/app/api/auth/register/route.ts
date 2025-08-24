import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prism";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const bio = formData.get("bio") as string | null;
    const githubUrl = formData.get("githubUrl") as string | null;
    const linkedInUrl = formData.get("linkedInUrl") as string | null;
    const portfolioUrl = formData.get("portfolioUrl") as string | null;

    let imageFile: File | null = null;
    for (const [key, value] of formData.entries()) {
      if (key === "image") {
        imageFile = value as File;
      }
    }

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

    // // 🖼️ Upload image to Cloudinary (if provided)
    let imageUrl: string | null = null;
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "users" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      imageUrl = uploaded.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username: lowerUsername,
        email: lowerEmail,
        password: hashedPassword,
        image: imageUrl || "", // 🟢 Cloudinary ka URL save
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
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
