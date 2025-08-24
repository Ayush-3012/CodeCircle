"use client";
import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Sidebar({
  initial,
  currentUserId,
}: {
  initial: any[];
  currentUserId: string | undefined;
}) {
  const pathname = usePathname();
  const [conversations, setConversations] = useState(initial);
  const { onlineUsers } = useAuth();

  useEffect(() => {
    if (!socket) return;

    const updateConv = (newMsg: any) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === newMsg.conversationId
            ? { ...conv, messages: [...conv.messages, newMsg] }
            : conv
        )
      );
    };

    socket.on("message", updateConv);
    socket.on("localMessage", updateConv);

    return () => {
      socket.off("message", updateConv);
      socket.off("localMessage", updateConv);
    };
  }, []);

  return (
    <aside className="w-72 border-r border-gray-700 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white h-screen overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="p-4 font-bold text-xl border-b border-gray-700 bg-gradient-to-r from-indigo-500/20 to-pink-500/20">
        Chats
      </div>

      {/* Conversation list */}
      <div className="divide-y divide-gray-800">
        {conversations.map((c) => {
          const other = c.participants
            .map((p: any) => p.user)
            .find((u: any) => u.id !== currentUserId);

          const last = c.messages.at(-1);
          const active = pathname === `/chat/${c.id}`;

          return (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200
                ${
                  active
                    ? "bg-indigo-600/20 border-l-4 border-indigo-500 shadow-md"
                    : "hover:bg-gray-800/60"
                }
              `}
            >
              {/* User Avatar */}
              <div className="relative">
                <Image
                  src={other?.image || defaultUserImage}
                  alt={other?.name}
                  height={40}
                  width={40}
                  className="h-10 w-10 rounded-full object-cover border border-gray-700"
                />
                <p className="font-medium truncate flex items-center gap-2">
                  {onlineUsers.includes(other?.id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                  )}
                </p>
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{other?.name}</p>
                <p className="text-sm text-gray-400 truncate italic">
                  {last?.content ?? "No messages yet"}
                </p>
              </div>

              {/* Time */}
              {last && (
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {new Date(last.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
