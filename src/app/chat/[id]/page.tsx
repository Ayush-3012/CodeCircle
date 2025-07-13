import ChatWindow from "@/components/chat-component/ChatWindow";
import { getMessages } from "@/lib/services/chatServices/getMessages";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const messages = await getMessages(id);
  return (
    <>
      <ChatWindow conversationId={id} initial={messages.reverse()} />
    </>
  );
}
