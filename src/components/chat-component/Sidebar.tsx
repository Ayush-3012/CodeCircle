"use client";
import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const imageContent = (other: any) => {
    return (
      <>
        <Image
          src={other?.image || defaultUserImage}
          alt={other?.name}
          height={40}
          width={40}
          className="h-10 w-10 rounded-full max-sm:w-8 max-sm:h-8 object-cover border border-gray-700"
        />
        <p className="font-medium truncate flex items-center gap-2">
          {onlineUsers.includes(other?.id) && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
          )}
        </p>
      </>
    );
  };

  return (
    <aside className="w-72 max-md:w-56 max-sm:w-16 border-r border-gray-200 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white h-screen overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="p-5 font-bold max-md:p-3 max-sm:p-2 text-xl border-b border-gray-700 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 max-sm:text-lg">
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
              className={`flex items-center max-sm:flex-col max-sm:gap-0.5 w-full justify-between max-sm:justify-center p-3  max-sm:p-2 gap-2 transition-all duration-200
                ${
                  active
                    ? "bg-indigo-600/20 border-l-4 border-indigo-500 shadow-md"
                    : "hover:bg-gray-800/60"
                }
              `}
            >
              {/* User Avatar */}
              <button
                className="relative max-sm:hidden hover:underline cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/profile/${other?.id}`);
                }}
              >
                {imageContent(other)}
              </button>

              <div className="relative max-sm:block hidden">
                {imageContent(other)}
              </div>

              <div className="flex-1 text-justify min-w-0">
                <button
                  className="font-medium max-sm:hidden max-sm:text-xs hover:underline cursor-pointer truncate"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/profile/${other?.id}`);
                  }}
                >
                  {other?.name}
                </button>
                <p className="font-medium hidden max-sm:block max-sm:text-xs truncate">
                  {other?.name}
                </p>
                <p className="text-sm max-sm:hidden text-gray-400 truncate italic pr-1">
                  {last?.content ?? "No messages yet"}
                </p>
              </div>
              {/* </button> */}

              {/* Time */}
              {last && (
                <span className="text-xs max-sm:hidden text-gray-500 whitespace-nowrap ml-2">
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
