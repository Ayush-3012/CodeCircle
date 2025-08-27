"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        onSend(newMessage.trim());
        setNewMessage("");
      }}
      className="flex gap-2 p-3 max-sm:gap-1 max-md:p-2 max-sm:p-1.5 border-t border-slate-700 bg-slate-900"
    >
      <input
        type="text"
        required
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2.5 max-sm:p-1.5 bg-slate-800 max-sm:rounded-sm rounded-md text-blue-300 font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-900
                   transition-all duration-200 placeholder-slate-500"
      />

      <button
        type="submit"
        className="bg-slate-800 text-primary rounded-md 
                   hover:bg-slate-950 hover:scale-110 hover:-rotate-3
                    transition-all duration-200 ease-in-out px-3 hover:text-emerald-400 cursor-pointer flex items-center justify-center"
      >
        <IoSend className="text-2xl" />
      </button>
    </form>
  );
};

export default MessageInput;
