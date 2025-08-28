// app/chat/page.tsx
export const dynamic = "force-dynamic"; 
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
    <div className="flex h-full min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 bg-app">
      <div className="flex flex-col w-full max-w-lg rounded-xl shadow-lg justify-center items-center text-center p-6 sm:p-10 font-serif text-blue-400 bg-gray-700">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          No Active Conversation
        </h2>
        <p className="text-sm sm:text-base text-gray-300">
          Start a new conversation to see it here.
        </p>
      </div>
    </div>
  );
}
