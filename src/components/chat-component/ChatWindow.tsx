"use client";

import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import socket from "@/lib/socket";
import { sendMessage } from "@/services/chatService";

const ChatWindow = ({ conversationId, initial, currentUserId }: any) => {
  const [messages, setMessages] = useState(initial);

  useEffect(() => {
    if (!socket || !conversationId) return;
    if (conversationId) socket.emit("join", conversationId);

    const listenMessage = (newMsg: any) => {
    setMessages((prev) => [...prev, newMsg]);
    };

    socket.on("message", listenMessage);
  }, [conversationId]);

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    hours = hours ? hours : 12;

    return `${hours}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      hours >= 12 ? "PM" : "AM"
    }`;
  };

  const handleSend = async (content: string) => {
    const newMessage = await sendMessage(conversationId, content);

    if (!newMessage || !socket || !conversationId) return;

    socket.emit("message", {
      conversationId,
      senderId: currentUserId,
      content: newMessage.content,
    });

    setMessages((prev) => [...prev, newMessage]);
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <div className=" p-4 space-y-2 overflow-y-auto h-[600px]">
          {messages?.map((item: any) => (
            <div
              key={item.id}
              className={`mb-1 flex ${
                item.senderId === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-0.5 max-md:px-2 max-sm:px-1 flex flex-col rounded-md max-sm:rounded-sm ${
                  item.senderId === currentUserId
                    ? "bg-slate-600 text-blue-400"
                    : "bg-slate-700 text-green-300"
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
