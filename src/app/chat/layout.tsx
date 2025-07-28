// app/chat/layout.tsx  (server component)
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
    <div className="flex h-full">
      <Sidebar initial={conversations} currentUserId={session?.userId} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
