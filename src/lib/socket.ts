// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

const URL =
  process.env.NODE_ENV === "production"
    ? "https://codecircle-iozo.onrender.com"
    : "http://localhost:5000";

if (typeof window !== "undefined") {
  socket = io(URL, {
    path: "/api/socket/io",
    withCredentials: true,
    transports: ["websocket"],
  });
}

export { socket };
