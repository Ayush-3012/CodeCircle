"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newMessage.trim()) return;
          onSend(newMessage.trim());
          setNewMessage("");
        }}
        className="flex gap-2 p-2 border-t"
      >
        <input
          type="text"
          required
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 bg-slate-800 rounded-sm text-blue-300 font-semibold focus:ring ring-white w-full focus:outline-none"
        />

        <button
          type="submit"
          className={`bg-slate-800 p-1 text-blue-400 rounded-sm hover:-translate-y-1 hover:bg-slate-950 duration-200 transition-all ease-in-out px-4 text-3xl max-lg:text-2xl max-md:text-xl`}
        >
          <IoSend />
        </button>
      </form>
    </>
  );
};

export default MessageInput;
