"use client";

import React, { useState } from "react";

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
    hours = hours ? hours : 12;

    return `${hours}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      hours >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <div
      className={`mb-1 flex ${
        isOwn ? "justify-end text-green-500" : "justify-start text-blue-500"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl max-w-xs relative shadow-sm">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="p-1 rounded ring text-slate-50"
            />
            <div className="flex gap-2 text-sm justify-end">
              <button
                onClick={handleEditSubmit}
                className="cursor-pointer hover:scale-110 text-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="cursor-pointer hover:scale-110 text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{message.content}</p>
            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
              <span className="text-gray-400">
                {formatTimestamp(new Date(message.createdAt))}
              </span>
              {isOwn && (
                <div className="ml-2 space-x-2">
                  <button
                    className="cursor-pointer hover:scale-110"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️
                  </button>
                  <button
                    className="cursor-pointer hover:scale-110"
                    onClick={() => onDelete(message.id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
