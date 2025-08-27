// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

if (typeof window !== "undefined") {
  socket = io("http://localhost:5000", {
    path: "/api/socket/io",
    withCredentials: true,
    transports: ["websocket"],
  });
}

export { socket };
