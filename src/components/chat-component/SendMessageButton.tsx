"use client";

import { createOrGetConversation } from "../../lib/client/services/chatService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SendMessageButton = ({ targetUserId }: { targetUserId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const conversation = await createOrGetConversation(targetUserId);
      if (conversation?.id) {
        router.push(`/chat/${conversation.id}`);
      }
    } catch (error) {
      console.error("Could not start chat", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="cursor-pointer max-sm:px-3 max-sm:py-1.5 hover-gradient px-4 py-2 rounded-md text-primary   font-semibold max-sm:text-sm shadow-[0_0_5px] shadow-black"
    >
      {loading ? "Starting..." : "Send Message"}
    </button>
  );
};

export default SendMessageButton;
