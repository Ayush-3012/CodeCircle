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
      className="flex gap-2 p-3 border-t border-slate-700 bg-slate-900"
    >
      <input
        type="text"
        required
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2.5 bg-slate-800 rounded-md text-blue-300 font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-900
                   transition-all duration-200 placeholder-slate-500"
      />

      <button
        type="submit"
        className="bg-slate-800 p-2 text-blue-400 rounded-md 
                   hover:bg-slate-950 hover:scale-110 hover:rotate-3
                    transition-all duration-200 ease-in-out
                   px-4 text-3xl max-lg:text-2xl max-md:text-xl cursor-pointer flex items-center justify-center"
      >
        <IoSend />
      </button>
    </form>
  );
};

export default MessageInput;
