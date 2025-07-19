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
    // console.log("🔌 New WS connection:", socket.id);

    /* join‑room */
    socket.on("join", (conversationId: string) => {
      // console.log("joined the conversation id ", conversationId);
      socket.join(conversationId);
    });

    socket.on("message", ({ conversationId, senderId, content }: any) => {
      // console.log("📥 Received on server payload:", payload);
      const newMessage = { senderId, content, createdAt: new Date() };
      // console.log("📤 Broadcasting message with:", senderId, content);
      socket.to(conversationId).emit("message", newMessage);
      // io.to(conversationId).emit("message", { senderId, content });
    });

    socket.on("messageUpdated", ({ conversationId, updatedMessage }: any) => {
      socket.to(conversationId).emit("messageUpdated", updatedMessage);
    });

    socket.on("messageDeleted", ({ conversationId, messageId }: any) => {
      socket.to(conversationId).emit("messageDeleted", messageId);
    });

    /* disconnect */
    socket.on("disconnect", () => {
      // console.log("❌", socket.id, "disconnected");
    });
  });

  return io;
};
