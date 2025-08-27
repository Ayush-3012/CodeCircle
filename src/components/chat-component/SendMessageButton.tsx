"use client";

import Loader from "@/partials/Loader";
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

  if(loading) return <Loader />

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="cursor-pointer"
    >
      {loading ? "Starting..." : "Send Message"}
    </button>
  );
};

export default SendMessageButton;
