/* eslint-disable prefer-const */
//src/lib/socketServer.ts

import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";

let io: Server | null = null;

const onlineUsers = new Map<string, string>();

export const initSocket = (server: HTTPServer) => {
  if (io) return io;
  io = new Server(server, {
    path: "/api/socket/io",
    cors: {
      origin: ["http://localhost:3000", "https://codecircle-iozo.onrender.com"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: any) => {
    console.log("⚡ User connected", socket.id);

    socket.on("userOnline", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      if (io) io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      for (let [userId, sId] of onlineUsers) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
        }
      }
      if (io) io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("join", (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on("message", ({ conversationId, senderId, content }: any) => {
      const newMessage = {
        conversationId,
        senderId,
        content,
        createdAt: new Date(),
      };
      if (io) io.to(conversationId).emit("message", newMessage);
    });

    socket.on("messageUpdated", ({ conversationId, updatedMessage }: any) => {
      socket.to(conversationId).emit("messageUpdated", updatedMessage);
    });

    socket.on("messageDeleted", ({ conversationId, messageId }: any) => {
      socket.to(conversationId).emit("messageDeleted", messageId);
    });
  });

  return io;
};
