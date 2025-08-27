"use client";

import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  };
  currentUserId: string;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string, newContent: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  currentUserId,
  onDelete,
  onEdit,
}) => {
  const isOwn = message.senderId === currentUserId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleEditSubmit = () => {
    if (editedContent.trim() && editedContent !== message.content) {
      onEdit(message.id, editedContent);
    }
    setIsEditing(false);
  };

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  return (
    <motion.div
      className={`mb-2 flex max-sm:mb-1 ${isOwn ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 30, scale: 0.90 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: 0.4, ease: "easeOut", type: "spring" }}
    >
      <div
        className={`px-4 py-2 max-sm:rounded-xl rounded-2xl max-sm:px-2 max-sm:py-1 max-w-xs relative shadow-md text-primary text-base break-words
          ${
            isOwn
              ? "bg-gradient-to-r from-green-600 to-emerald-700  rounded-br-none max-sm:rounded-br-none"
              : "bg-gradient-to-r from-fuchsia-700 to-purple-800   rounded-bl-none max-sm:rounded-bl-none"
          }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-2 max-sm:gap-1">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="p-2 rounded-lg  max-sm:p-1 bg-nav text-primary focus:outline-none"
            />
            <div className="flex gap-3 max-sm:gap-1.5 text-sm justify-end">
              <button
                onClick={handleEditSubmit}
                className="text-primary cursor-pointer hover:text-blue-400"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-primary hover:text-red-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-base max-sm:text-sm">{message.content}</p>
            <div className="flex justify-between items-center mt-1 text-[11px] opacity-70">
              <span>{formatTimestamp(message.createdAt)}</span>
              {isOwn && (
                <div className="ml-2 flex items-center justify-center">
                  <button
                    className="hover:scale-110 cursor-pointer transition"
                    onClick={() => setIsEditing(true)}
                    title="Edit"
                  >
                    <MdEdit className="text-xl max-sm:text-lg text-primary font-extrabold" />
                  </button>
                  <button
                    className="hover:scale-110 transition cursor-pointer"
                    onClick={() =>
                      confirm(
                        "Are you sure you want to delete this message?"
                      ) && onDelete(message.id)
                    }
                    title="Delete"
                  >
                    <MdDeleteOutline className="text-xl max-sm:text-lg text-primary font-extrabold" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
