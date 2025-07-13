//lib/socketServer.ts

import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";

let io: Server | null = null;

export const initSocket = (server: HTTPServer) => {
  if (io) return io;

  io = new Server(server, {
    path: "/api/socket/io",
    cors: { origin: "*" },
  });

  io.on("connection", (socket: any) => {
    console.log("🔌 New WS connection:", socket.id);

    /* join‑room */
    socket.on("join", (conversationId: string) => {
      socket.join(conversationId);
    });

    /* disconnect */
    socket.on("disconnect", () => {
      console.log("❌", socket.id, "disconnected");
    });
  });

  return io;
};
