// app/api/socket/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { initSocket } from "@/lib/socketServer";

export async function GET(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!globalThis.__io) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    globalThis.__io = initSocket((req as any).socket?.server);
    console.log("🟢 Socket.IO server started");
  }

  return new NextResponse("socket server ready", { status: 200 });
}

export const dynamic = "force-dynamic"; // disable static optimization
