"use client";

import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { socket } from "@/lib/socket";
import {
  deleteMessage,
  sendMessage,
  updateMessage,
} from "../../lib/client/services/chatService";
import MessageBubble from "./MessageBubble";
import Link from "next/link";
import Image from "next/image";
import { defaultUserImage } from "@/utils/defautUserImage";

const ChatWindow = ({
  conversationId,
  initial,
  currentUserId,
  otherUser,
}: any) => {
  const [messages, setMessages] = useState(initial);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket || !conversationId) return;

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (conversationId) socket.emit("join", conversationId);

    const listenMessage = (newMsg: any) => {
      if (newMsg.senderId === currentUserId) return;
      setMessages((prev: any) => [...prev, newMsg]);
    };

    const listenEdit = (updatedMsg: any) => {
      setMessages((prev: any) =>
        prev.map((msg: any) =>
          msg.id === updatedMsg.id
            ? { ...msg, content: updatedMsg.content }
            : msg
        )
      );
    };

    const listenDelete = (deletedMsgId: string) => {
      setMessages((prev: any) =>
        prev.filter((msg: any) => msg.id !== deletedMsgId)
      );
    };

    socket.on("message", listenMessage);
    socket.on("messageUpdated", listenEdit);
    socket.on("messageDeleted", listenDelete);

    return () => {
      if (socket) {
        socket.off("message", listenMessage);
        socket.off("messageUpdated", listenEdit);
        socket.off("messageDeleted", listenDelete);
      }
    };
  }, [conversationId, currentUserId]);

  const handleSend = async (content: string) => {
    const newMessage = await sendMessage(conversationId, content);
    if (!newMessage || !socket || !conversationId) return;

    socket.emit("message", {
      conversationId,
      senderId: currentUserId,
      content: newMessage.content,
    });

    socket.emit("localMessage", { ...newMessage, conversationId });

    setMessages((prev: any) => [...prev, newMessage]);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(conversationId, messageId);
    setMessages((prev: any) => prev.filter((m: any) => m.id !== messageId));
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    const updatedMessage: any = await updateMessage(
      conversationId,
      messageId,
      newContent
    );
    setMessages((prev: any) =>
      prev.map((msg: any) =>
        msg.id === messageId ? { ...msg, content: updatedMessage.content } : msg
      )
    );
  };

  return (
    <div
      className="flex flex-col h-full bg-gradient-to-tr from-gray-600 via-slate-800 to-zinc-900 text-primary 
      w-full mx-auto max-md:pb-14 shadow-[0_0_5px] shadow-white"
    >
      {/* Header */}
      <Link
        href={`/profile/${otherUser?.id}`}
        className="flex items-center gap-3 sm:gap-4 w-full 
        bg-gradient-to-tr from-indigo-500/40 to-pink-500/20 
        p-2 sm:p-3 border-b border-white sticky top-0 z-50"
      >
        <Image
          src={otherUser?.image || defaultUserImage}
          alt={otherUser?.name}
          width={40}
          height={40}
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-emerald-500"
        />
        <div className="min-w-0">
          <p className="font-medium text-white truncate">{otherUser?.name}</p>
          <p className="text-xs sm:text-sm text-gray-300 italic truncate">
            @{otherUser?.username}
          </p>
        </div>
      </Link>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-4 space-y-3 
        scroll-smooth max-h-[calc(100vh-120px)]"
      >
        {messages?.map((msg: any) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            currentUserId={currentUserId}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input area */}
      <div className="border-t max-md:mb-3 border-gray-100">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatWindow;
