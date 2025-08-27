// chat/[id]/page.tsx

import ChatWindow from "@/components/chat-component/ChatWindow";
import { getConversation } from "@/lib/backend/services/chatServices/getConversation";
import { getMessages } from "@/lib/backend/services/chatServices/getMessages";
import { verifyToken } from "@/utils/token-manager";
import { redirect } from "next/navigation";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const messages = await getMessages(id);
  const session = await verifyToken();
  if (!session) redirect("/login");

  const conversation = await getConversation(id);

  const otherUser = conversation?.participants
    .map((p) => p.user)
    .find((u) => u.id !== session.userId);

  return (
    <>
      {messages && (
        <ChatWindow
          conversationId={id}
          initial={messages.reverse()}
          currentUserId={session?.userId}
          otherUser={otherUser}
        />
      )}
    </>
  );
}
