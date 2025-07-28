import ChatWindow from "@/components/chat-component/ChatWindow";
import { getMessages } from "@/lib/backend/services/chatServices/getMessages";
import { verifyToken } from "@/utils/token-manager";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const messages = await getMessages(id);
  const session = await verifyToken();
  return (
    <>
      {messages && (
        <ChatWindow
          conversationId={id}
          initial={messages.reverse()}
          currentUserId={session?.userId}
        />
      )}
    </>
  );
}
