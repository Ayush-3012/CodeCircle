"use client";

import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { useSocket } from "@/app/hooks/useSocket";
import { sendMessage } from "@/services/chatService";
import { isUserLoggedIn } from "@/services/authService";

const ChatWindow = ({ conversationId, initial }: any) => {
  const [messages, setMessages] = useState(initial);
  const [currentUser, setCurrentUser] = useState(null);
  const socket = useSocket(conversationId);

  useEffect(() => {
    const fetchData = async () => {
      if (!socket) return;
      const handler = (msg: any) => setMessages((m: any) => [...m, msg]);
      socket.on("message", handler);
      const res = await isUserLoggedIn();
      setCurrentUser(res.user.id);
      return () => {
        socket.off("message", handler);
      };
    };

    fetchData();
  }, [socket]);

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    hours = hours ? hours : 12;

    return `${hours}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      hours >= 12 ? "PM" : "AM"
    }`;
  };

  const handleSend = async (content: string) => {
    await sendMessage(conversationId, content);
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-slate-900 p-4 space-y-2 flex-1 overflow-y-auto">
          {messages?.map((item: any) => (
            <div
              key={item.id}
              className={`mb-1 flex ${
                item.senderId === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-0.5 max-md:px-2 max-sm:px-1 flex flex-col rounded-md max-sm:rounded-sm ${
                  item.senderId === currentUser
                    ? "bg-slate-600 text-blue-400"
                    : "bg-slate-700 text-blue-300"
                }`}
              >
                <p className="self-start flex text-lg max-lg:text-sm max-md:text-xs flex-wrap">
                  {item.content}
                </p>
                <span className="text-xs text-slate-200 self-end">
                  {formatTimestamp(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </>
  );
};

export default ChatWindow;
