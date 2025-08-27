// app/chat/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/components/chat-component/Sidebar";
import { getUserConversations } from "@/lib/backend/services/chatServices/getUserConversations";
import { verifyToken } from "@/utils/token-manager";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await verifyToken();
  const conversations = await getUserConversations(session?.userId);

  return (
    <div className="flex h-screen bg-app text-primary relative">
      {/* Sidebar - permanent on md+, overlay on mobile */}
      <div className="flex border-r border-gray-700">
        <Sidebar initial={conversations} currentUserId={session?.userId} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
