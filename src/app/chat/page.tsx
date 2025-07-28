// app/chat/page.tsx
import { getUserConversations } from "@/lib/backend/services/chatServices/getUserConversations";
import { verifyToken } from "@/utils/token-manager";
import { redirect } from "next/navigation";

export default async function ChatRoot() {
  const session = await verifyToken();
  if (!session) redirect("/login");

  const convos = await getUserConversations(session?.userId);

  if (convos?.length) {
    redirect(`/chat/${convos[0].id}`);
  }

  return (
    <div className="flex h-full items-center justify-center text-gray-500">
      <div className="flex flex-1 rounded-lg justify-center items-center text-4xl py-10 font-serif text-blue-400 bg-gray-600">
        No Active Conversation
      </div>
    </div>
  );
}
