import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";
import { updateComment } from "@/lib/backend/services/commentServices/updateComment";
import { deleteComment } from "@/lib/backend/services/commentServices/deleteComment";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { content } = await req.json();

    const result = await updateComment(id, content, session?.userId);

    if (result.notFound)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    if (result.forbidden)
      return NextResponse.json(
        { message: "Not allowed to edit this comment" },
        { status: 403 }
      );

    return NextResponse.json(
      {
        message: "Comment Updated Successfully",
        updatedComment: result.updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const result = await deleteComment(id, session.userId);

    if (result.notFound)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );
    if (result.forbidden)
      return NextResponse.json({ message: "Not allowed" }, { status: 403 });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
