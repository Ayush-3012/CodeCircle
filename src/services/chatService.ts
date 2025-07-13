import axios from "@/lib/axios";

export const sendMessage = async (conversationId: string, content: string) => {
  try {
    const res = await axios.post(`/chat/conversations/${conversationId}/messages`, {
      content,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
