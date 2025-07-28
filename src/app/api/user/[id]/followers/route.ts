import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";
import { getFollowers } from "@/lib/backend/services/userServices/getFollowers";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const followers = await getFollowers(id);

    return NextResponse.json({ followers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
