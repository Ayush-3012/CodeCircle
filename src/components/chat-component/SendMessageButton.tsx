// "use client";

// import { createOrGetConversation } from "../../lib/client/services/chatService";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const SendMessageButton = ({ targetUserId }: { targetUserId: string }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       const conversation = await createOrGetConversation(targetUserId);
//       if (conversation?.id) {
//         router.push(`/chat/${conversation.id}`);
//       }
//     } catch (error) {
//       console.error("Could not start chat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       disabled={loading}
//       className="bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-emerald-500 transition"
//     >
//       {loading ? "Starting..." : "Send Message"}
//     </button>
//   );
// };

// export default SendMessageButton;
