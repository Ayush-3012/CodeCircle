// import prisma from "@/lib/prism";
// import fs from "fs";
// import cloudinary from "@/lib/cloudinary";
// import formidable from "formidable";
// import { verifyToken } from "@/utils/token-manager";
// import { NextRequest, NextResponse } from "next/server";
// import { Readable } from "stream";
// import { IncomingHttpHeaders } from "http";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function parseForm(
//   req: NextRequest
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
//   const contentType = req.headers.get("content-type");
//   const contentLength = req.headers.get("content-length");

//   if (!contentType) throw new Error("Missing content-type header");

//   const nodeReadable = Readable.fromWeb(req.body as any);

//   const fakeReq: any = nodeReadable;
//   fakeReq.headers = {
//     "content-type": contentType,
//     "content-length": contentLength || undefined,
//   } satisfies IncomingHttpHeaders;

//   const form = formidable({
//     uploadDir: "./public",
//     keepExtensions: true,
//     multiples: false,
//     filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
//   });

//   return new Promise((resolve, reject) => {
//     form.parse(fakeReq, (err, fields, files) => {
//       if (err) return reject(err);

//       resolve({ fields, files });
//     });
//   });
// }

// export async function POST(req: NextRequest) {
//   const session = await verifyToken();
//   if (!session || !session?.userId)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { fields, files } = await parseForm(req);

//   const content = fields.content?.[0] || "";
//   const file = files.media?.[0];

//   let mediaUrl = null;
//   let mediaType = null;

//   if (file) {
//     const uploaded = await cloudinary.uploader.upload(file.filepath, {
//       resource_type: "auto",
//     });

//     fs.unlinkSync(file.filepath);

//     mediaUrl = uploaded.secure_url;
//     mediaType = uploaded.resource_type;
//   }

//   const newPost = await prisma.post.create({
//     data: {
//       content,
//       mediaUrl,
//       mediaType,
//       authorId: session.userId,
//     },
//   });

//   return NextResponse.json(
//     { message: "Post created successfully", newPost },
//     { status: 201 }
//   );
// }

import prisma from "@/lib/prism";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/utils/token-manager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await verifyToken();
  if (!session || !session?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const content = formData.get("content")?.toString() || "";
  const file = formData.get("media") as File | null;

  let mediaUrl: string | null = null;
  let mediaType: string | null = null;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
        } else if (result) {
          mediaUrl = result.secure_url;
          mediaType = result.resource_type;
        }
      }
    );

    stream.end(buffer);

    const uploaded = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    mediaUrl = uploaded.secure_url;
    mediaType = uploaded.resource_type;
  }

  const newPost = await prisma.post.create({
    data: {
      content,
      mediaUrl,
      mediaType,
      authorId: session.userId,
    },
  });

  return NextResponse.json(
    { message: "Post created successfully", newPost },
    { status: 201 }
  );
}
