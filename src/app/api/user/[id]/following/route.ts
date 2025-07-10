import { verifyToken } from "@/utils/token-manager";
import { NextResponse } from "next/server";
import { getFollowings } from "@/lib/services/userServices/getFollowings";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyToken();
    if (!session || !session.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const following = await getFollowings(id);

    return NextResponse.json({ following });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
