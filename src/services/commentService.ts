import axios from "@/lib/axios";

export const getCommentsByPost = async (postId: string) => {
  const res = await axios.get(`/comment/post/${postId}`);
  return res.data;
};

export const addCommentToPost = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const res = await axios.post(`/comment/create`, { postId, content });
  return res.data;
};

export const editComment = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const res = await axios.put(`/comment/${id}`, { content });
  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await axios.delete(`/comment/${id}`);
  return res.data;
};
