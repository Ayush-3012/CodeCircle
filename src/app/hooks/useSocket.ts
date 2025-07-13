
// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (conversationId?: string) => {
  const sockRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!sockRef.current) {
      sockRef.current = io({ path: "/api/socket" });
    }
    const sock = sockRef.current;

    if (conversationId) sock.emit("join", conversationId);
    return () => {
      if (conversationId) sock.emit("leave", conversationId);
    };
  }, [conversationId]);

  return sockRef.current;
};
