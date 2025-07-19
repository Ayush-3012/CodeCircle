import axios from "@/lib/axios";

export const createOrGetConversation = async (targetUserId: string) => {
  try {
    const res = await axios.post("/chat/conversations", {
      targetUserId,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to create or get conversation", error);
    throw error;
  }
};

export const sendMessage = async (conversationId: string, content: string) => {
  try {
    const res = await axios.post(
      `/chat/conversations/${conversationId}/messages`,
      {
        content,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateMessage = async (
  conversationId: string,
  messageId: string,
  newContent: string
) => {
  try {
    const res = await axios.put(
      `/chat/conversations/${conversationId}/messages/${messageId}`,
      {
        newContent,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteMessage = async (
  conversationId: string,
  messageId: string
) => {
  try {
    const res = await axios.delete(
      `/chat/conversations/${conversationId}/messages/${messageId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
