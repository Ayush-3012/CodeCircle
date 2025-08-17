"use client";

import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import socket from "@/lib/socket";
import {
  deleteMessage,
  sendMessage,
  updateMessage,
} from "../../lib/client/services/chatService";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ conversationId, initial, currentUserId }: any) => {
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
      setMessages((prev: string) => [...prev, newMsg]);
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
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedMsgId));
    };

    socket.on("message", listenMessage);
    socket.on("messageUpdated", listenEdit);
    socket.on("messageDeleted", listenDelete);

    return () => {
      socket.off("message", listenMessage);
      socket.off("messageUpdated", listenEdit);
      socket.off("messageDeleted", listenDelete);
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

    socket.emit("localMessage", {
      ...newMessage,
      conversationId,
    });

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(conversationId, messageId);
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
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
    <>
      <div className="flex flex-col h-full">
        <div className=" p-4 space-y-2 overflow-y-auto h-[600px]">
          {messages?.map((msg: any) => (
            <MessageBubble
              key={msg.createdAt}
              message={msg}
              currentUserId={currentUserId}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
            />
          ))}
          <div ref={scrollRef} />
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </>
  );
};

export default ChatWindow;
