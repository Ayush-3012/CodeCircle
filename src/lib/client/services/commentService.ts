import axios from "@/lib/axios";

export const getCommentsByPost = async (postId: string) => {
  const res = await axios.get(`/comment/post/${postId}`);
  return res;
};

export const addCommentToPost = async (postId: string, content: string) => {
  const res = await axios.post(`/comment/create`, { postId, content });
  return res;
};

export const updateComment = async (commentId: string, content: string) => {
  const res = await axios.put(`/comment/${commentId}`, { content });
  return res;
};

export const deleteComment = async (id: string) => {
  const res = await axios.delete(`/comment/${id}`);
  return res;
};
